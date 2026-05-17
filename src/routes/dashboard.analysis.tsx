import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, AlertCircle, Lightbulb, Sparkles, BookOpen, Award } from "lucide-react";
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScoreMeter } from "@/components/ScoreMeter";
import { SAMPLE_ANALYSIS, KEYWORD_MATCH, RESUME_QUALITY } from "@/constants/dummy";

export const Route = createFileRoute("/dashboard/analysis")({ component: AnalysisPage });

function AnalysisPage() {
  const a = SAMPLE_ANALYSIS;
  const sectionScores = [
    { name: "Skills", score: a.sectionScores.skills },
    { name: "Projects", score: a.sectionScores.projects },
    { name: "Experience", score: a.sectionScores.experience },
    { name: "Education", score: a.sectionScores.education },
    { name: "Formatting", score: a.sectionScores.formatting },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">ATS Analysis Results</h1>
          <p className="text-sm text-muted-foreground">{a.fileName} · {a.jobTitle}</p>
        </div>
        <Badge className="bg-success/15 text-success hover:bg-success/15">Excellent Match</Badge>
      </div>

      {/* Score + summary */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
            <ScoreMeter value={a.atsScore} label="ATS Score" />
            <p className="text-center text-sm text-muted-foreground">Your resume scores in the top 15% for this role.</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Section-wise Analysis</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {sectionScores.map((s) => (
              <div key={s.name} className="rounded-xl border border-border/60 p-4 text-center transition-all hover:shadow-elegant">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.name}</p>
                <p className="mt-2 font-display text-2xl font-bold">{s.score}<span className="text-sm text-muted-foreground">%</span></p>
                <Progress value={s.score} className="mt-2 h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Skills */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-success" /> Matched Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {a.matchedSkills.map((s) => (
                <Badge key={s} className="bg-success/15 text-success hover:bg-success/20">{s}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><AlertCircle className="h-5 w-5 text-destructive" /> Missing Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {a.missingSkills.map((s) => (
                <Badge key={s} variant="destructive" className="bg-destructive/15 text-destructive hover:bg-destructive/20">{s}</Badge>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Add these to your resume to boost your match score.</p>
          </CardContent>
        </Card>
      </div>

      {/* Suggestions + strengths */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-warning" /> Improvement Suggestions</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {a.suggestions.map((s, i) => (
              <div key={i} className="flex gap-3 rounded-lg border border-border/60 p-3">
                <div className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-warning/15 text-xs font-bold text-warning-foreground">{i + 1}</div>
                <p className="text-sm">{s}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-success" /> Resume Strengths</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {a.strengths.map((s, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border/60 p-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                <p className="text-sm">{s}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Improvement Roadmap */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> Improvement Roadmap</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-3 text-sm font-semibold">Skills to learn</h4>
              <div className="space-y-2">
                {[
                  { skill: "Kubernetes", weeks: 4 },
                  { skill: "GraphQL", weeks: 2 },
                  { skill: "Terraform", weeks: 3 },
                ].map((s) => (
                  <div key={s.skill} className="flex items-center justify-between rounded-lg border border-border/60 p-3">
                    <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /><span className="text-sm font-medium">{s.skill}</span></div>
                    <Badge variant="secondary">{s.weeks} weeks</Badge>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Project ideas</h4>
              <div className="space-y-2">
                {[
                  "Build a real-time chat with GraphQL subscriptions",
                  "Deploy a microservice cluster on Kubernetes",
                  "Provision your portfolio infra with Terraform",
                ].map((p) => (
                  <div key={p} className="rounded-lg border border-border/60 p-3 text-sm">{p}</div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Keyword Match Frequency</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={KEYWORD_MATCH} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis type="category" dataKey="keyword" stroke="var(--color-muted-foreground)" fontSize={12} width={80} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="count" fill="var(--color-chart-1)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Resume Quality Breakdown</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RESUME_QUALITY}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar dataKey="score" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.3} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
