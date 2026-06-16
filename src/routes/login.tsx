import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Smart Resume Analyzer" }] }),
  component: Login,
});

function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !pw) { toast.error("Please fill in all fields"); return; }
    setBusy(true);
    await login(email, pw);
    toast.success("Welcome back!");
    nav({ to: "/dashboard" });
  }

  return (
    <div className="bg-gradient-subtle grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8"><Logo /></div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-1 text-sm">Sign in to continue analyzing your resume.</p>
          <Card className="mt-6 p-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pw">Password</Label>
                  <a href="#" className="text-primary text-xs hover:underline">Forgot password?</a>
                </div>
                <Input id="pw" type="password" autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox id="remember" /> Remember me
              </label>
              <Button type="submit" className="w-full" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</Button>
            </form>
          </Card>
          <p className="text-muted-foreground mt-6 text-sm">
            New here? <Link to="/signup" className="text-primary font-medium hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
      <div className="bg-gradient-hero hidden items-center justify-center p-12 lg:flex">
        <div className="text-primary-foreground max-w-md">
          <h2 className="text-3xl font-bold tracking-tight">Resume intelligence, ready when you are.</h2>
          <p className="mt-3 opacity-90">Instant ATS scores, JD matching, and AI recommendations tailored to your career.</p>
        </div>
      </div>
    </div>
  );
}
