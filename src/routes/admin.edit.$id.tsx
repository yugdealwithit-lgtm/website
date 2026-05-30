import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { checkIsAdmin, slugify } from "@/lib/admin-guard";

export const Route = createFileRoute("/admin/edit/$id")({
  head: () => ({
    meta: [{ title: "Edit post — DealWithIt" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: EditPage,
});

type FormState = {
  title: string; slug: string; excerpt: string; content: string;
  cover_image_url: string; category: string; read_time: string;
  meta_title: string; meta_description: string;
  status: "draft" | "published";
};

const EMPTY: FormState = {
  title: "", slug: "", excerpt: "", content: "",
  cover_image_url: "", category: "", read_time: "",
  meta_title: "", meta_description: "", status: "draft",
};

function EditPage() {
  const { id } = useParams({ from: "/admin/edit/$id" });
  const navigate = useNavigate();
  const isNew = id === "new";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [denied, setDenied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    (async () => {
      const { user, isAdmin } = await checkIsAdmin();
      if (!user) { navigate({ to: "/login", replace: true }); return; }
      if (!isAdmin) { setDenied(true); setLoading(false); return; }
      if (!isNew) {
        const { data, error } = await supabase.from("blogs").select("*").eq("id", id).single();
        if (error || !data) { setError("Post not found"); setLoading(false); return; }
        setForm({
          title: data.title ?? "", slug: data.slug ?? "", excerpt: data.excerpt ?? "",
          content: data.content ?? "", cover_image_url: data.cover_image_url ?? "",
          category: data.category ?? "", read_time: data.read_time ?? "",
          meta_title: data.meta_title ?? "", meta_description: data.meta_description ?? "",
          status: (data.status as any) ?? "draft",
        });
        setSlugTouched(true);
      }
      setLoading(false);
    })();
  }, [id]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));
  const onTitle = (v: string) => {
    set("title", v);
    if (!slugTouched) set("slug", slugify(v));
  };

  const handleUpload = async (file: File) => {
    setError(null);
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error: upErr } = await supabase.storage.from("blog-images").upload(path, file, { contentType: file.type });
    if (upErr) { setError(upErr.message); return; }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    set("cover_image_url", data.publicUrl);
  };

  const handleSave = async (publish: boolean) => {
    setError(null);
    if (!form.title.trim()) { setError("Title is required"); return; }
    if (!form.slug.trim()) { setError("Slug is required"); return; }
    setSaving(true);
    const { data: userData } = await supabase.auth.getUser();
    const status = publish ? "published" : form.status;
    const payload: any = {
      title: form.title.trim(),
      slug: slugify(form.slug),
      excerpt: form.excerpt.trim() || null,
      content: form.content,
      cover_image_url: form.cover_image_url || null,
      category: form.category.trim() || null,
      read_time: form.read_time.trim() || null,
      meta_title: form.meta_title.trim() || null,
      meta_description: form.meta_description.trim() || null,
      status,
      published_at: status === "published" ? (isNew ? new Date().toISOString() : undefined) : null,
    };
    if (payload.published_at === undefined) delete payload.published_at;

    if (isNew) {
      payload.author_id = userData.user?.id;
      const { data, error } = await supabase.from("blogs").insert(payload).select("id").single();
      setSaving(false);
      if (error) { setError(error.message); return; }
      navigate({ to: "/admin/edit/$id", params: { id: data.id }, replace: true });
    } else {
      const { error } = await supabase.from("blogs").update(payload).eq("id", id);
      setSaving(false);
      if (error) { setError(error.message); return; }
      setForm((f) => ({ ...f, status: status as any }));
    }
  };

  if (loading) return <div style={ctrPage}>Loading…</div>;
  if (denied) return <div style={ctrPage}>Access denied.</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f5f0e0", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ borderBottom: "1px solid #2a2a2a", padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/admin" style={{ color: "#888", fontSize: 12, textDecoration: "none" }}>← Back to posts</Link>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => handleSave(false)} disabled={saving} style={btnGhost}>
            {saving ? "Saving…" : "Save draft"}
          </button>
          <button onClick={() => handleSave(true)} disabled={saving} style={btnGold}>
            {form.status === "published" ? "Update published" : "Publish"}
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 28px 80px", display: "flex", flexDirection: "column", gap: 18 }}>
        {error && <div style={{ padding: 12, background: "#3a1818", border: "1px solid #6a2828", color: "#e8786a", fontSize: 12 }}>{error}</div>}

        <Field label="Title">
          <input value={form.title} onChange={(e) => onTitle(e.target.value)} style={inp} placeholder="Your blog post title" />
        </Field>

        <Field label="URL slug" hint={`/blog/${form.slug || "your-slug"}`}>
          <input value={form.slug} onChange={(e) => { setSlugTouched(true); set("slug", e.target.value); }} style={inp} placeholder="my-post-slug" />
        </Field>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <Field label="Category"><input value={form.category} onChange={(e) => set("category", e.target.value)} style={inp} placeholder="e.g. Investment" /></Field>
          <Field label="Read time"><input value={form.read_time} onChange={(e) => set("read_time", e.target.value)} style={inp} placeholder="e.g. 5 min read" /></Field>
        </div>

        <Field label="Cover image">
          {form.cover_image_url && (
            <img src={form.cover_image_url} alt="cover" style={{ width: "100%", maxHeight: 240, objectFit: "cover", marginBottom: 10, border: "1px solid #2a2a2a" }} />
          )}
          <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
            style={{ ...inp, padding: 10 }} />
        </Field>

        <Field label="Excerpt" hint="Short summary shown on the blog list">
          <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} style={{ ...inp, minHeight: 80, fontFamily: "inherit" }} maxLength={300} />
        </Field>

        <Field label="Content" hint="Markdown / plain text. Use blank lines for paragraphs.">
          <textarea value={form.content} onChange={(e) => set("content", e.target.value)} style={{ ...inp, minHeight: 360, fontFamily: "ui-monospace, monospace", fontSize: 13, lineHeight: 1.7 }} />
        </Field>

        <div style={{ borderTop: "1px solid #2a2a2a", paddingTop: 18 }}>
          <h3 style={{ fontSize: 12, letterSpacing: 2, color: "#888", marginBottom: 14 }}>SEO</h3>
          <Field label="Meta title" hint={`${form.meta_title.length}/60 characters recommended`}>
            <input value={form.meta_title} onChange={(e) => set("meta_title", e.target.value)} style={inp} maxLength={70} placeholder={form.title} />
          </Field>
          <div style={{ height: 14 }} />
          <Field label="Meta description" hint={`${form.meta_description.length}/160 characters recommended`}>
            <textarea value={form.meta_description} onChange={(e) => set("meta_description", e.target.value)} style={{ ...inp, minHeight: 70, fontFamily: "inherit" }} maxLength={180} placeholder={form.excerpt} />
          </Field>
        </div>

        <div style={{ fontSize: 11, color: "#666" }}>
          Status: <strong style={{ color: form.status === "published" ? "#8acf8a" : "#d4a52d" }}>{form.status.toUpperCase()}</strong>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 11, letterSpacing: 1.5, color: "#888" }}>{label.toUpperCase()}</span>
        {hint && <span style={{ fontSize: 10, color: "#555" }}>{hint}</span>}
      </div>
      {children}
    </label>
  );
}

const inp: React.CSSProperties = { width: "100%", padding: "11px 12px", background: "#0a0a0a", border: "1px solid #2a2a2a", color: "#f5f0e0", fontSize: 13, boxSizing: "border-box" };
const ctrPage: React.CSSProperties = { minHeight: "100vh", background: "#0a0a0a", color: "#f5f0e0", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif" };
const btnGhost: React.CSSProperties = { background: "transparent", border: "1px solid #2a2a2a", color: "#f5f0e0", padding: "8px 16px", fontSize: 12, cursor: "pointer" };
const btnGold: React.CSSProperties = { background: "#c9a84c", color: "#0a0a0a", padding: "8px 18px", fontSize: 12, fontWeight: 500, cursor: "pointer", letterSpacing: 1, border: "none" };