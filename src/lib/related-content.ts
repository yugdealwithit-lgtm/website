// Internal-linking engine — computes related blog posts and relevant
// projects algorithmically from live data (Supabase `blogs` + the static
// `PROJECTS` catalogue) instead of hardcoding which post links to which.
//
// Used by: blog.$slug.tsx (related articles + recommended projects),
// index.tsx (featured insights), projects.$id.tsx ("Learn More" reading).
import { supabase } from "@/integrations/supabase/client";
import { PROJECTS, type Project } from "@/lib/projects";

/** Lightweight blog fields for relatedness scoring / card rendering — no
 *  full `content` needed here, keeping these queries cheap. */
export interface BlogSummary {
  slug: string;
  title: string;
  category: string | null;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  read_time: string | null;
}

/** All published posts, newest first. Shared by every route that needs to
 *  compute related/featured content so the query + shape lives in one place. */
export async function fetchBlogSummaries(): Promise<BlogSummary[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("slug,title,category,excerpt,cover_image_url,published_at,read_time")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error || !data) return [];
  return data as BlogSummary[];
}

const STOPWORDS = new Set([
  "dholera", "sir", "the", "a", "an", "in", "is", "of", "for", "to", "and", "how",
  "what", "why", "best", "your", "you", "are", "on", "at", "with", "this", "that",
  "smart", "city", "2026", "guide", "guides", "explained", "buyer", "update", "updates",
]);

/** Lowercased, stopword-filtered, crudely singularized word tokens — good
 *  enough to score topical overlap between two short pieces of text without
 *  a real NLP dependency. */
function tokenize(s: string): string[] {
  return (s.toLowerCase().match(/[a-z]+/g) ?? [])
    .map((w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w))
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

/** Scores every candidate post against `current` by shared category tokens
 *  (strong signal, category text is short and topic-labelled) plus shared
 *  title tokens (weak signal), tie-broken by recency. Falls back to "most
 *  recent other posts" if nothing scores above zero, so the section is
 *  never empty even for an outlier post. */
export function relatedPosts(current: BlogSummary, all: BlogSummary[], max = 3): BlogSummary[] {
  const currentTitleTokens = new Set(tokenize(current.title));
  const currentCatTokens = new Set(tokenize(current.category ?? ""));

  const scored = all
    .filter((p) => p.slug !== current.slug)
    .map((post) => {
      const catOverlap = tokenize(post.category ?? "").filter((t) => currentCatTokens.has(t)).length;
      const titleOverlap = tokenize(post.title).filter((t) => currentTitleTokens.has(t)).length;
      return { post, score: catOverlap * 2 + titleOverlap };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.published_at ?? 0).getTime() - new Date(a.post.published_at ?? 0).getTime();
    });

  const withSignal = scored.filter((s) => s.score > 0);
  const pool = withSignal.length >= 2 ? withSignal : scored;
  return pool.slice(0, max).map((s) => s.post);
}

/** Keywords a piece of text would need to contain for a literal,
 *  high-confidence match to a specific project. */
function projectKeywords(p: Project): string[] {
  const loc = p.loc.split(",")[0]?.trim().toLowerCase() ?? "";
  return [p.name.toLowerCase(), p.id.toLowerCase(), loc].filter((w) => w.length > 3);
}

/** Deterministic pick of `n` items from `pool`, seeded by `seedText` — keeps
 *  fallback recommendations varying across posts/projects instead of always
 *  surfacing the same pair, with no manual per-post assignment. */
function seededPick<T>(pool: T[], n: number, seedText: string): T[] {
  if (pool.length === 0) return [];
  const seed = [...seedText].reduce((sum, c) => sum + c.charCodeAt(0), 0);
  const start = seed % pool.length;
  const out: T[] = [];
  for (let i = 0; i < Math.min(n, pool.length); i++) out.push(pool[(start + i) % pool.length]);
  return out;
}

/** Which project(s) a blog post should recommend. Prefers a literal
 *  name/location mention in the post; falls back to currently-available
 *  inventory (never a sold-out project), rotated by the post's own slug so
 *  different posts surface different projects instead of the same pair. */
export function projectsForPost(
  post: { slug: string; title: string; content?: string; category?: string | null },
  allProjects: Project[] = Object.values(PROJECTS),
  max = 2,
): Project[] {
  const haystack = `${post.title} ${post.content ?? ""} ${post.category ?? ""}`.toLowerCase();
  const matched = allProjects.filter((p) => projectKeywords(p).some((k) => haystack.includes(k)));
  if (matched.length > 0) return matched.slice(0, max);

  const available = allProjects.filter((p) => p.status !== "Sold Out");
  return seededPick(available, max, post.slug);
}

/** Which blog posts a project's "Learn More" section should link to.
 *  Mirrors `projectsForPost`: prefers posts that literally name/locate the
 *  project, falls back to the categories most useful at decision time
 *  (buying process, pricing, investment), rotated per project. */
export function postsForProject(project: Project, posts: BlogSummary[], max = 4): BlogSummary[] {
  const keywords = projectKeywords(project);
  const matched = posts.filter((p) =>
    keywords.some((k) => `${p.title} ${p.excerpt ?? ""} ${p.category ?? ""}`.toLowerCase().includes(k)),
  );
  if (matched.length >= 2) return matched.slice(0, max);

  const decisionStageWords = ["buying", "pricing", "market", "invest"];
  const ranked = [...posts].sort((a, b) => {
    const aHit = decisionStageWords.some((w) => (a.category ?? "").toLowerCase().includes(w)) ? 1 : 0;
    const bHit = decisionStageWords.some((w) => (b.category ?? "").toLowerCase().includes(w)) ? 1 : 0;
    if (aHit !== bHit) return bHit - aHit;
    return new Date(b.published_at ?? 0).getTime() - new Date(a.published_at ?? 0).getTime();
  });
  return seededPick(ranked, max, project.id);
}
