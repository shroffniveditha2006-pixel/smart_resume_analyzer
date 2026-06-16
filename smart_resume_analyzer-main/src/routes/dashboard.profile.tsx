import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, FileText, TrendingUp, Award } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/StatCard";

export const Route = createFileRoute("/dashboard/profile")({ component: ProfilePage });

function ProfilePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your account information.</p>
      </div>

      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-hero" />
        <CardContent className="-mt-12 pb-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
            <Avatar className="h-24 w-24 border-4 border-background shadow-elegant">
              <AvatarFallback className="bg-gradient-primary text-2xl text-primary-foreground">AS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold">Aman Sharma</h2>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> aman@example.com</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Bengaluru, India</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary">Pro Plan</Badge>
                <Badge className="bg-success/15 text-success hover:bg-success/15">Verified</Badge>
              </div>
            </div>
            <Button variant="outline">Change Photo</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Resumes Uploaded" value={24} delta="+4 this month" icon={FileText} />
        <StatCard title="Average ATS Score" value="82%" delta="+8% vs last month" icon={TrendingUp} />
        <StatCard title="Best Score" value="92%" delta="Stripe — Senior FE" icon={Award} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>First Name</Label><Input defaultValue="Aman" /></div>
              <div className="space-y-1.5"><Label>Last Name</Label><Input defaultValue="Sharma" /></div>
            </div>
            <div className="space-y-1.5"><Label>Email</Label><Input type="email" defaultValue="aman@example.com" /></div>
            <div className="space-y-1.5"><Label>Location</Label><Input defaultValue="Bengaluru, India" /></div>
            <div className="space-y-1.5"><Label>Bio</Label><Textarea rows={3} defaultValue="Full-stack engineer focused on React, TypeScript, and clean APIs." /></div>
            <Button onClick={() => toast.success("Profile updated")} className="bg-gradient-primary shadow-elegant">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Career Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5"><Label>Target Role</Label><Input defaultValue="Senior Full-Stack Engineer" /></div>
            <div className="space-y-1.5"><Label>Years of Experience</Label><Input type="number" defaultValue={5} /></div>
            <div className="space-y-1.5"><Label>Preferred Industries</Label><Input defaultValue="SaaS, Fintech, Developer Tools" /></div>
            <div className="space-y-1.5"><Label>Skills</Label><Textarea rows={3} defaultValue="React, TypeScript, Node.js, PostgreSQL, AWS, Docker" /></div>
            <Button onClick={() => toast.success("Preferences saved")} className="bg-gradient-primary shadow-elegant">Save Preferences</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
