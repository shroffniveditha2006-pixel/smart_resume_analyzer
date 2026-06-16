import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Lightbulb, Sparkles, TriangleAlert } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ResumeAPI } from "@/services/api";

export const Route = createFileRoute("/_authenticated/analysis")({
  head: () => ({ meta: [{ title: "Resume Analysis — Smart Resume Analyzer" }] }),
  component: AnalysisPage,
});

function AnalysisPage() {
  const { data, isLoading } = useQuery({ queryKey: ["analysis"], queryFn: ResumeAPI.analyze });

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-48 lg:col-span-1" />
          <Skeleton className="h-48 lg:col-span-2" />
        </div>
      </div>
    );
  }

  const scoreColor = data.atsScore >= 80 ? "var(--color-success)" : data.atsScore >= 60 ? "var(--color-warning)" : "var(--color-destructive)";

  return (
    <div className="space-y-8">
      <div>
        <p className="text-muted-foreground text-sm">{data.fileName}</p>
        <h1 className="text-3xl font-bold tracking-tight">Resume Analysis</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-card flex flex-col items-center p-6 text-center">
          <p className="text-muted-foreground text-sm">ATS Score</p>
          <div className="relative my-4 h-40 w-40">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r="52" stroke="var(--color-muted)" strokeWidth="10" fill="none" />
              <circle
                cx="60" cy="60" r="52" stroke={scoreColor} strokeWidth="10" fill="none"
                strokeLinecap="round" strokeDasharray={2 * Math.PI * 52}
                strokeDashoffset={2 * Math.PI * 52 * (1 - data.atsScore / 100)}
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <div>
                <p className="text-4xl font-bold">{data.atsScore}</p>
                <p className="text-muted-foreground text-xs">/ 100</p>
              </div>
            </div>
          </div>
          <p className="text-sm font-medium">
            {data.atsScore >= 80 ? "Excellent" : data.atsScore >= 60 ? "Good — room to improve" : "Needs work"}
          </p>
        </Card>

        <Card className="shadow-card p-6 lg:col-span-2">
          <h3 className="flex items-center gap-2 font-semibold"><Sparkles className="text-primary h-4 w-4" /> Skills detected</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.skillsDetected.map((s) => (
              <Badge key={s} variant="secondary" className="px-2.5 py-1 text-xs">{s}</Badge>
            ))}
          </div>
          <div className="my-6 h-px bg-border" />
          <h3 className="flex items-center gap-2 font-semibold"><TriangleAlert className="text-warning h-4 w-4" /> Missing skills</h3>
          <p className="text-muted-foreground mt-1 text-xs">Often expected for your target role</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {data.missingSkills.map((s) => (
              <Badge key={s} variant="outline" className="border-warning/40 text-warning-foreground bg-warning/10 px-2.5 py-1 text-xs">{s}</Badge>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-card p-6">
          <h3 className="flex items-center gap-2 font-semibold"><CheckCircle2 className="text-success h-4 w-4" /> Strengths</h3>
          <ul className="mt-4 space-y-3">
            {data.strengths.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm">
                <span className="bg-success/15 text-success mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="shadow-card p-6">
          <h3 className="flex items-center gap-2 font-semibold"><TriangleAlert className="text-warning h-4 w-4" /> Weaknesses</h3>
          <ul className="mt-4 space-y-3">
            {data.weaknesses.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm">
                <span className="bg-warning/15 text-warning mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs">!</span>
                {s}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="shadow-card p-6">
        <h3 className="flex items-center gap-2 font-semibold"><Lightbulb className="text-primary h-4 w-4" /> Recommendations</h3>
        <p className="text-muted-foreground mt-1 text-sm">AI-generated, ranked by impact</p>
        <ol className="mt-5 space-y-4">
          {data.recommendations.map((r, i) => (
            <li key={r} className="flex gap-3">
              <span className="bg-gradient-hero text-primary-foreground grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold">{i + 1}</span>
              <div className="flex-1">
                <p className="text-sm">{r}</p>
                <Progress value={[92, 78, 65, 55][i] ?? 50} className="mt-2 h-1.5" />
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
