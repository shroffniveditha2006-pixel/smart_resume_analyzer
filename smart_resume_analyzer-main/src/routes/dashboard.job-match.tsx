import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, MapPin, TrendingUp, Target } from "lucide-react";
import {
  RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { JOB_MATCHES } from "@/constants/dummy";

export const Route = createFileRoute("/dashboard/job-match")({ component: JobMatchPage });

function JobMatchPage() {
  const top = JOB_MATCHES[0];
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Job Match</h1>
        <p className="text-sm text-muted-foreground">Roles ranked by how well your resume matches.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle>Top Match</CardTitle></CardHeader>
          <CardContent>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: "match", value: top.matchPercentage, fill: "var(--color-chart-1)" }]} startAngle={90} endAngle={-270}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar background dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="-mt-32 text-center">
              <div className="font-display text-3xl font-bold">{top.matchPercentage}%</div>
              <div className="text-xs text-muted-foreground">Match</div>
            </div>
            <div className="mt-20 text-center">
              <p className="font-semibold">{top.role}</p>
              <p className="text-sm text-muted-foreground">{top.company}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Skill Gap Analysis</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Frontend (React, TS)", you: 92, required: 90 },
              { name: "Backend (Node, APIs)", you: 78, required: 85 },
              { name: "DevOps (Docker, K8s)", you: 45, required: 70 },
              { name: "System Design", you: 65, required: 80 },
              { name: "Testing & QA", you: 80, required: 75 },
            ].map((s) => (
              <div key={s.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{s.name}</span>
                  <span className={s.you >= s.required ? "text-success" : "text-destructive"}>
                    {s.you}% / {s.required}%
                  </span>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                  <div className="absolute inset-y-0 left-0 bg-gradient-primary" style={{ width: `${s.you}%` }} />
                  <div className="absolute top-0 h-full w-0.5 bg-foreground" style={{ left: `${s.required}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Recommended Roles</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {JOB_MATCHES.map((j) => (
            <Card key={j.id} className="border-border/60 transition-all hover:-translate-y-0.5 hover:shadow-elegant">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{j.role}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Briefcase className="h-3 w-3" /> {j.company} <MapPin className="ml-1 h-3 w-3" /> Remote
                    </p>
                  </div>
                  <Badge className={j.matchPercentage >= 85 ? "bg-success/15 text-success hover:bg-success/15" : "bg-primary/15 text-primary hover:bg-primary/15"}>
                    {j.matchPercentage}%
                  </Badge>
                </div>
                <Progress value={j.matchPercentage} className="my-4" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Missing</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {j.missingRequirements.map((r) => (
                      <Badge key={r} variant="outline" className="text-xs">{r}</Badge>
                    ))}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full">View role</Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Learning Roadmap</CardTitle></CardHeader>
        <CardContent>
          <ol className="relative space-y-6 border-l border-border pl-6">
            {[
              { t: "Week 1–2", title: "Master GraphQL fundamentals", desc: "Schemas, resolvers, Apollo Client. Build a small project." },
              { t: "Week 3–4", title: "Containers & orchestration", desc: "Docker basics, then Kubernetes deployments and services." },
              { t: "Week 5–6", title: "Infrastructure as code", desc: "Terraform modules, AWS/GCP provisioning, CI/CD pipelines." },
              { t: "Week 7+", title: "System design interviews", desc: "Practice 2–3 design problems per week with mock interviews." },
            ].map((r, i) => (
              <li key={i}>
                <span className="absolute -left-2 grid h-4 w-4 place-items-center rounded-full bg-gradient-primary" />
                <div className="text-xs font-medium text-muted-foreground">{r.t}</div>
                <div className="mt-0.5 font-semibold">{r.title}</div>
                <div className="text-sm text-muted-foreground">{r.desc}</div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
