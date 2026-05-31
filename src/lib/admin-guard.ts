import { supabase } from "@/integrations/supabase/client";

export async function checkIsAdmin(): Promise<{ user: any; isAdmin: boolean }> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { user: null, isAdmin: false };

  const { data: roles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userData.user.id);

  if (roles?.some((r) => r.role === "admin")) {
    return { user: userData.user, isAdmin: true };
  }

  // Fallback: if no roles exist at all, this is the first user — make them admin
  const { count } = await supabase
    .from("user_roles")
    .select("*", { count: "exact", head: true });

  if (count === 0) {
    await supabase.from("user_roles").insert({ user_id: userData.user.id, role: "admin" });
    return { user: userData.user, isAdmin: true };
  }

  return { user: userData.user, isAdmin: false };
}

export function slugify(s: string): string {
  return s.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}