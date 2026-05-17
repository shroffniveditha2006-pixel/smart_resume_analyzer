import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const navigate = useNavigate();

  const checks = useMemo(() => ({
    length: pwd.length >= 8,
    upper: /[A-Z]/.test(pwd),
    number: /\d/.test(pwd),
    match: pwd.length > 0 && pwd === pwd2,
  }), [pwd, pwd2]);

  const valid = Object.values(checks).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) { toast.error("Please satisfy all password requirements"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("Account created! Welcome to SmartResume.");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-gradient-hero lg:block">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, white 0, transparent 40%), radial-gradient(circle at 70% 70%, white 0, transparent 40%)" }} />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <Logo to="/" className="text-primary-foreground" />
          <div className="max-w-md">
            <Sparkles className="mb-4 h-8 w-8" />
            <h2 className="font-display text-3xl font-bold leading-tight">Start optimizing in seconds.</h2>
            <p className="mt-4 opacity-90">Free forever for your first 5 analyses. No credit card required.</p>
          </div>
          <p className="text-xs opacity-70">© {new Date().getFullYear()} SmartResume Analyzer</p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-gradient-subtle p-6">
        <Card className="w-full max-w-md border-border/60 p-8 shadow-card">
          <div className="lg:hidden mb-6"><Logo /></div>
          <h1 className="font-display text-2xl font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Get your first ATS analysis in seconds</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="name" required placeholder="Aman Sharma" className="pl-9" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" required placeholder="you@example.com" className="pl-9" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type={show ? "text" : "password"} value={pwd} onChange={(e) => setPwd(e.target.value)} required className="pl-9 pr-9" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cpassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="cpassword" type={show ? "text" : "password"} value={pwd2} onChange={(e) => setPwd2(e.target.value)} required className="pl-9" />
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-1.5 rounded-lg bg-muted/40 p-3 text-xs">
              {[
                { k: "length", l: "8+ characters" },
                { k: "upper", l: "Uppercase letter" },
                { k: "number", l: "A number" },
                { k: "match", l: "Passwords match" },
              ].map((c) => {
                const ok = checks[c.k as keyof typeof checks];
                return (
                  <li key={c.k} className={cn("flex items-center gap-1.5", ok ? "text-success" : "text-muted-foreground")}>
                    {ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />} {c.l}
                  </li>
                );
              })}
            </ul>

            <Button type="submit" disabled={loading} className="w-full bg-gradient-primary shadow-elegant hover:opacity-95">
              {loading ? "Creating account…" : <>Create account <ArrowRight className="ml-2 h-4 w-4" /></>}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs uppercase text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button variant="outline" className="w-full" type="button" onClick={() => toast.info("Google sign-in coming soon")}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z" /></svg>
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
