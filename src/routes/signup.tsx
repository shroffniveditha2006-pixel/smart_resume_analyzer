import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Smart Resume Analyzer" }] }),
  component: Signup,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name too short").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  pw: z.string().min(8, "Password must be 8+ characters").max(128),
  confirm: z.string(),
}).refine((d) => d.pw === d.confirm, { path: ["confirm"], message: "Passwords do not match" });

function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", pw: "", confirm: "" });
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) { toast.error(r.error.issues[0].message); return; }
    setBusy(true);
    await signup(form.name, form.email, form.pw);
    toast.success("Account created");
    nav({ to: "/dashboard" });
  }

  return (
    <div className="bg-gradient-subtle grid min-h-screen lg:grid-cols-2">
      <div className="bg-gradient-hero hidden items-center justify-center p-12 lg:flex">
        <div className="text-primary-foreground max-w-md">
          <h2 className="text-3xl font-bold tracking-tight">Start landing more interviews today.</h2>
          <p className="mt-3 opacity-90">Free to try. No credit card required.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8"><Logo /></div>
          <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
          <p className="text-muted-foreground mt-1 text-sm">It takes less than a minute.</p>
          <Card className="mt-6 p-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Alex Morgan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pw">Password</Label>
                  <Input id="pw" type="password" value={form.pw} onChange={(e) => setForm({ ...form, pw: e.target.value })} placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm</Label>
                  <Input id="confirm" type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} placeholder="••••••••" />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={busy}>{busy ? "Creating…" : "Create account"}</Button>
            </form>
          </Card>
          <p className="text-muted-foreground mt-6 text-sm">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
