import { supabase } from "@/integrations/supabase/client";

export async function checkIsAdmin(): Promise<{ user: any; isAdmin: boolean }> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { user: null, isAdmin: false };
  const { data: roles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userData.user.id);
  const isAdmin = !!roles?.some((r) => r.role === "admin");
  return { user: userData.user, isAdmin };
}

export function slugify(s: string): string {
  return s.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}