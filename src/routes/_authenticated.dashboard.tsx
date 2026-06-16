import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, FileSearch, Gauge, Target, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserAPI } from "@/services/api";
import { chartScoreTrend, chartSkillCoverage } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Smart Resume Analyzer" }] }),
  component: Dashboard,
});

function StatCard({ icon: Icon, label, value, suffix, trend }: { icon: any; label: string; value: number | string; suffix?: string; trend?: string }) {
  return (
    <Card className="shadow-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm">{label}</p>
          <p className="mt-1.5 text-3xl font-bold">{value}{suffix && <span className="text-muted-foreground ml-1 text-lg font-medium">{suffix}</span>}</p>
          {trend && <p className="text-success mt-1 flex items-center gap-1 text-xs font-medium"><TrendingUp className="h-3 w-3" />{trend}</p>}
        </div>
        <div className="bg-accent text-accent-foreground grid h-10 w-10 place-items-center rounded-lg">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

function Dashboard() {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({ queryKey: ["dashboard"], queryFn: UserAPI.stats });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-muted-foreground text-sm">Welcome back</p>
          <h1 className="text-3xl font-bold tracking-tight">Hi, {user?.name?.split(" ")[0] ?? "there"} 👋</h1>
          <p className="text-muted-foreground mt-1">Here's how your resume is performing today.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline"><Link to="/job-match"><Target className="mr-1 h-4 w-4" /> New job match</Link></Button>
          <Button asChild><Link to="/upload"><FileSearch className="mr-1 h-4 w-4" /> Analyze new resume</Link></Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={Gauge} label="ATS Score" value={isLoading ? "…" : data!.atsScore} suffix="/100" trend="+6 vs last week" />
        <StatCard icon={Target} label="Best Job Match" value={isLoading ? "…" : `${data!.jobMatch}%`} trend="+3% vs last week" />
        <StatCard icon={FileSearch} label="Resumes Analyzed" value={isLoading ? "…" : data!.totalAnalyzed} trend="2 this week" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Score evolution</h3>
              <p className="text-muted-foreground text-xs">ATS score & job match across versions</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartScoreTrend} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="ats" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="match" stroke="var(--color-chart-3)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="shadow-card p-6">
          <h3 className="font-semibold">Skill coverage</h3>
          <p className="text-muted-foreground text-xs">Strength by category</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartSkillCoverage} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="shadow-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Recent activity</h3>
            <p className="text-muted-foreground text-xs">Your last actions across the workspace</p>
          </div>
          <Button asChild variant="ghost" size="sm"><Link to="/history">View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Link></Button>
        </div>
        <ul className="divide-y">
          {(data?.recentActivity ?? []).map((a) => (
            <li key={a.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium">{a.title}</p>
                <p className="text-muted-foreground text-xs">{a.meta}</p>
              </div>
              <span className="text-muted-foreground text-xs">{a.date}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
