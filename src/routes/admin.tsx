import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { checkIsAdmin } from "@/lib/admin-guard";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — DealWithIt" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Blog = {
  id: string; title: string; slug: string; status: string;
  published_at: string | null; updated_at: string; category: string | null;
};

function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [email, setEmail] = useState("");

  const load = async () => {
    const { user, isAdmin } = await checkIsAdmin();
    if (!user) { navigate({ to: "/login", replace: true }); return; }
    if (!isAdmin) { setDenied(true); setLoading(false); return; }
    setEmail(user.email ?? "");
    const { data } = await supabase.from("blogs").select("id,title,slug,status,published_at,updated_at,category").order("updated_at", { ascending: false });
    setBlogs(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) { alert(error.message); return; }
    setBlogs((b) => b.filter((x) => x.id !== id));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  };

  if (loading) return <div style={ctrPage}>Loading…</div>;
  if (denied) return (
    <div style={ctrPage}>
      <div style={{ maxWidth: 480, textAlign: "center" }}>
        <h1 style={{ fontSize: 24, marginBottom: 12 }}>Access denied</h1>
        <p style={{ color: "#888", marginBottom: 20 }}>Your account is not an admin. Ask an existing admin to promote you.</p>
        <button onClick={handleSignOut} style={btnGhost}>Sign out</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f5f0e0", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ borderBottom: "1px solid #2a2a2a", padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <Link to="/" style={{ color: "#c9a84c", fontSize: 11, letterSpacing: 2, textDecoration: "none" }}>DEALWITHIT</Link>
          <span style={{ color: "#555", margin: "0 12px" }}>/</span>
          <span style={{ fontSize: 12, letterSpacing: 2 }}>ADMIN</span>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#888" }}>{email}</span>
          <button onClick={handleSignOut} style={btnGhost}>Sign out</button>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 300 }}>Blog posts <span style={{ color: "#555", fontSize: 14 }}>({blogs.length})</span></h1>
          <Link to="/admin/edit/$id" params={{ id: "new" }} style={btnGold}>+ New post</Link>
        </div>

        {blogs.length === 0 ? (
          <div style={{ background: "#141414", border: "1px solid #2a2a2a", padding: 48, textAlign: "center", color: "#888" }}>
            No posts yet. Click <strong style={{ color: "#c9a84c" }}>+ New post</strong> to write your first one.
          </div>
        ) : (
          <div style={{ background: "#141414", border: "1px solid #2a2a2a" }}>
            {blogs.map((b) => (
              <div key={b.id} style={{ display: "flex", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #2a2a2a", gap: 16 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.title || "(untitled)"}</div>
                  <div style={{ fontSize: 11, color: "#666", display: "flex", gap: 12 }}>
                    <span>/{b.slug}</span>
                    {b.category && <span>{b.category}</span>}
                    <span>Updated {new Date(b.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <span style={{
                  fontSize: 10, letterSpacing: 1.5, padding: "4px 10px",
                  background: b.status === "published" ? "#1a3c2a" : "#2a2618",
                  color: b.status === "published" ? "#8acf8a" : "#d4a52d",
                  border: `1px solid ${b.status === "published" ? "#2d5a3d" : "#5a4a18"}`,
                }}>{b.status.toUpperCase()}</span>
                <Link to="/admin/edit/$id" params={{ id: b.id }} style={btnGhost}>Edit</Link>
                {b.status === "published" && (
                  <Link to="/blog/$slug" params={{ slug: b.slug }} target="_blank" style={btnGhost}>View</Link>
                )}
                <button onClick={() => handleDelete(b.id)} style={{ ...btnGhost, color: "#e8786a", borderColor: "#3a1818" }}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const ctrPage: React.CSSProperties = { minHeight: "100vh", background: "#0a0a0a", color: "#f5f0e0", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif" };
const btnGhost: React.CSSProperties = { background: "transparent", border: "1px solid #2a2a2a", color: "#f5f0e0", padding: "7px 14px", fontSize: 12, cursor: "pointer", textDecoration: "none", display: "inline-block" };
const btnGold: React.CSSProperties = { background: "#c9a84c", color: "#0a0a0a", padding: "10px 18px", fontSize: 12, fontWeight: 500, cursor: "pointer", textDecoration: "none", letterSpacing: 1, border: "none" };