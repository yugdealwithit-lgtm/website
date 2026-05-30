import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — DealWithIt" },
      { name: "description", content: "Sign in to manage DealWithIt blog posts." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/admin", replace: true });
    });
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin", replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setInfo(null); setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setInfo("Check your email to confirm your account, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null); setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/admin` });
    if (result.error) { setError(result.error.message); setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f5f0e0", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 420, background: "#141414", border: "1px solid #2a2a2a", padding: 36 }}>
        <Link to="/" style={{ color: "#c9a84c", fontSize: 11, letterSpacing: 2, textDecoration: "none" }}>← DEALWITHIT</Link>
        <h1 style={{ fontSize: 26, fontWeight: 300, marginTop: 18, marginBottom: 8 }}>
          {mode === "signin" ? "Admin sign in" : "Create account"}
        </h1>
        <p style={{ fontSize: 12, color: "#888", marginBottom: 24, lineHeight: 1.6 }}>
          {mode === "signin" ? "Sign in to manage your blog posts." : "First account becomes admin. Others must be promoted by an existing admin."}
        </p>

        <button onClick={handleGoogle} disabled={loading}
          style={{ width: "100%", padding: "12px", background: "#fff", color: "#000", border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer", marginBottom: 16 }}>
          Continue with Google
        </button>
        <div style={{ textAlign: "center", color: "#555", fontSize: 11, margin: "16px 0", letterSpacing: 2 }}>OR</div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "11px 12px", background: "#0a0a0a", border: "1px solid #2a2a2a", color: "#f5f0e0", fontSize: 13 }} />
          <input type="password" required minLength={6} placeholder="Password (min 6)" value={password} onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "11px 12px", background: "#0a0a0a", border: "1px solid #2a2a2a", color: "#f5f0e0", fontSize: 13 }} />
          {error && <div style={{ color: "#e8786a", fontSize: 12 }}>{error}</div>}
          {info && <div style={{ color: "#8acf8a", fontSize: 12 }}>{info}</div>}
          <button type="submit" disabled={loading}
            style={{ padding: "12px", background: "#c9a84c", color: "#0a0a0a", border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer", letterSpacing: 1 }}>
            {loading ? "..." : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); setInfo(null); }}
          style={{ background: "none", border: "none", color: "#888", fontSize: 12, marginTop: 18, cursor: "pointer", width: "100%" }}>
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}