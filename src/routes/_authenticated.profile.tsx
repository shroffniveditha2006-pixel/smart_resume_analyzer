import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Mail, Shield, Sparkles, User as UserIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserAPI } from "@/services/api";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "Profile — Smart Resume Analyzer" }] }),
  component: Profile,
});

function Profile() {
  const { data: user } = useQuery({ queryKey: ["profile"], queryFn: UserAPI.profile });
  const { data: stats } = useQuery({ queryKey: ["dashboard"], queryFn: UserAPI.stats });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your details and view your resume statistics.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-card p-6 lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="bg-gradient-hero text-primary-foreground grid h-20 w-20 place-items-center rounded-full text-2xl font-semibold">
              {user?.name?.[0] ?? "U"}
            </div>
            <h2 className="mt-3 text-lg font-semibold">{user?.name ?? "—"}</h2>
            <p className="text-muted-foreground text-sm">{user?.email ?? "—"}</p>
            <Badge className="mt-3">{user?.plan ?? "Free"} plan</Badge>
            <p className="text-muted-foreground mt-3 text-xs">Member since {user ? new Date(user.joinedAt).toLocaleDateString() : "—"}</p>
          </div>
        </Card>

        <Card className="shadow-card p-6 lg:col-span-2">
          <h3 className="font-semibold">Account details</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="n">Full name</Label>
              <Input id="n" defaultValue={user?.name ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="e">Email</Label>
              <Input id="e" type="email" defaultValue={user?.email ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="t">Target role</Label>
              <Input id="t" placeholder="Senior Frontend Engineer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loc">Location</Label>
              <Input id="loc" placeholder="Remote · EU" />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save changes</Button>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { icon: Sparkles, label: "Avg. ATS score", value: stats?.atsScore ?? "—" },
          { icon: UserIcon, label: "Resumes analyzed", value: stats?.totalAnalyzed ?? "—" },
          { icon: Mail, label: "Best job match", value: stats ? `${stats.jobMatch}%` : "—" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="shadow-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{s.label}</p>
                  <p className="mt-1 text-2xl font-bold">{s.value}</p>
                </div>
                <Icon className="text-primary h-6 w-6" />
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-card p-6">
        <h3 className="flex items-center gap-2 font-semibold"><Shield className="h-4 w-4" /> Security</h3>
        <p className="text-muted-foreground mt-1 text-sm">Update your password and protect your account.</p>
        <div className="mt-4 flex gap-2">
          <Button variant="outline">Change password</Button>
          <Button variant="outline">Enable 2FA</Button>
        </div>
      </Card>
    </div>
  );
}
