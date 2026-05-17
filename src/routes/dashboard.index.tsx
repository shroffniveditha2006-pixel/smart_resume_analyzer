import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText, TrendingUp, Briefcase, Sparkles, ArrowUpRight,
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/StatCard";
import { ATS_SCORE_TREND, SKILL_MATCH, RESUME_QUALITY, RECENT_ANALYSES } from "@/constants/dummy";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Welcome back, Aman 👋</h1>
          <p className="text-sm text-muted-foreground">Here's how your resume performance is trending.</p>
        </div>
        <Button asChild className="bg-gradient-primary shadow-elegant"><Link to="/dashboard/upload"><Sparkles className="mr-2 h-4 w-4" />New Analysis</Link></Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Resumes Analyzed" value={24} delta="+4 this month" icon={FileText} />
        <StatCard title="Average ATS Score" value="82%" delta="+8% vs last month" icon={TrendingUp} />
        <StatCard title="Best Job Match" value="92%" delta="Stripe — Senior FE" icon={Briefcase} />
        <StatCard title="Improvement Rate" value="+24%" delta="Last 30 days" icon={Sparkles} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>ATS Score Trend</CardTitle>
            <Badge variant="secondary">Last 7 months</Badge>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ATS_SCORE_TREND}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="score" stroke="var(--color-chart-1)" strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Skill Match Breakdown</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={SKILL_MATCH} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {SKILL_MATCH.map((s, i) => <Cell key={i} fill={s.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Analyses</CardTitle>
            <Button asChild variant="ghost" size="sm"><Link to="/dashboard/history">View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Link></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {RECENT_ANALYSES.slice(0, 4).map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border border-border/60 p-3 transition-colors hover:bg-accent">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-gradient-primary text-primary-foreground"><FileText className="h-4 w-4" /></div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{r.fileName}</p>
                    <p className="truncate text-xs text-muted-foreground">{r.jobTitle} · {new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <Badge className={r.atsScore >= 80 ? "bg-success/15 text-success hover:bg-success/15" : r.atsScore >= 60 ? "bg-warning/15 text-warning-foreground hover:bg-warning/15" : "bg-destructive/15 text-destructive hover:bg-destructive/15"}>
                  {r.atsScore}%
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Resume Quality</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {RESUME_QUALITY.map((q) => (
              <div key={q.metric} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{q.metric}</span>
                  <span className="font-semibold">{q.score}%</span>
                </div>
                <Progress value={q.score} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Recommended Improvements</CardTitle></CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={RESUME_QUALITY}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="metric" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Bar dataKey="score" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
