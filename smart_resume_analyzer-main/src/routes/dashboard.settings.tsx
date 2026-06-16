import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/dashboard/settings")({ component: SettingsPage });

function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Settings</h1>
        <p className="text-sm text-muted-foreground">Customize your experience and security.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Choose how SmartResume looks to you.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {(["light", "dark"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`rounded-xl border-2 p-4 text-left transition-all ${theme === t ? "border-primary shadow-elegant" : "border-border hover:border-primary/50"}`}
            >
              <div className={`mb-3 h-16 rounded-lg ${t === "light" ? "bg-white border" : "bg-slate-900"}`} />
              <p className="font-medium capitalize">{t} mode</p>
              <p className="text-xs text-muted-foreground">{t === "light" ? "Bright and crisp" : "Easy on the eyes"}</p>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>What we email you about.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { id: "n1", title: "New analysis ready", desc: "When your resume analysis completes." },
            { id: "n2", title: "Weekly score summary", desc: "A weekly digest of your progress." },
            { id: "n3", title: "Job match alerts", desc: "When a strong job match is found." },
            { id: "n4", title: "Product updates", desc: "New features and improvements." },
          ].map((n, i) => (
            <div key={n.id}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.desc}</p>
                </div>
                <Switch defaultChecked={i < 2} onCheckedChange={() => toast.success("Preference saved")} />
              </div>
              {i < 3 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Account-level preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label>Default target role</Label><Input defaultValue="Senior Full-Stack Engineer" /></div>
          <div className="space-y-1.5"><Label>Time zone</Label><Input defaultValue="Asia/Kolkata" /></div>
          <Button onClick={() => toast.success("Account preferences saved")} className="bg-gradient-primary shadow-elegant">Save</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Keep your account safe.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label>Current password</Label><Input type="password" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5"><Label>New password</Label><Input type="password" /></div>
            <div className="space-y-1.5"><Label>Confirm new password</Label><Input type="password" /></div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium">Two-factor authentication</p>
              <p className="text-xs text-muted-foreground">Add an extra layer of security.</p>
            </div>
            <Switch onCheckedChange={(v) => toast.success(v ? "2FA enabled" : "2FA disabled")} />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => toast.success("Password updated")} className="bg-gradient-primary shadow-elegant">Update Password</Button>
            <Button variant="destructive" onClick={() => toast.error("Account deletion requires confirmation")}>Delete account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
