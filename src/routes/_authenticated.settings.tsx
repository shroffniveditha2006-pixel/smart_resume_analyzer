import { createFileRoute } from "@tanstack/react-router";
import { Bell, Globe, Moon, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/lib/theme-context";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings — Smart Resume Analyzer" }] }),
  component: Settings,
});

function Row({ icon: Icon, title, desc, control }: { icon: any; title: string; desc: string; control: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-start gap-3">
        <div className="bg-accent text-accent-foreground mt-0.5 grid h-9 w-9 place-items-center rounded-lg"><Icon className="h-4 w-4" /></div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-muted-foreground text-xs">{desc}</p>
        </div>
      </div>
      {control}
    </div>
  );
}

function Settings() {
  const { theme, toggle } = useTheme();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Customize your workspace and preferences.</p>
      </div>

      <Card className="shadow-card p-6">
        <h3 className="font-semibold">Appearance</h3>
        <div className="divide-y">
          <Row
            icon={Moon}
            title="Dark mode"
            desc="Switch between light and dark themes."
            control={<Switch checked={theme === "dark"} onCheckedChange={toggle} />}
          />
        </div>
      </Card>

      <Card className="shadow-card p-6">
        <h3 className="font-semibold">Notifications</h3>
        <div className="divide-y">
          <Row icon={Bell} title="Analysis complete" desc="Get notified when a resume analysis finishes." control={<Switch defaultChecked />} />
          <Row icon={Bell} title="Weekly summary" desc="Weekly email with your score trends." control={<Switch defaultChecked />} />
          <Row icon={Bell} title="Product updates" desc="New features and tips from our team." control={<Switch />} />
        </div>
      </Card>

      <Card className="shadow-card p-6">
        <h3 className="font-semibold">Account preferences</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Language</Label>
            <Select defaultValue="en">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Time zone</Label>
            <Select defaultValue="utc">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="et">Eastern (ET)</SelectItem>
                <SelectItem value="pt">Pacific (PT)</SelectItem>
                <SelectItem value="cet">Central Europe (CET)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="divide-y mt-2">
          <Row icon={Globe} title="Public profile" desc="Allow recruiters to view your anonymized stats." control={<Switch />} />
        </div>
      </Card>

      <Card className="shadow-card border-destructive/30 p-6">
        <h3 className="text-destructive font-semibold">Danger zone</h3>
        <p className="text-muted-foreground mt-1 text-sm">Permanently delete your account and all associated data.</p>
        <Button variant="destructive" className="mt-4"><Trash2 className="mr-1 h-4 w-4" /> Delete account</Button>
      </Card>
    </div>
  );
}
