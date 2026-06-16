import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Lightbulb, Target, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { JobAPI } from "@/services/api";
import type { JobMatchResult } from "@/types";

export const Route = createFileRoute("/_authenticated/job-match")({
  head: () => ({ meta: [{ title: "Job Match — Smart Resume Analyzer" }] }),
  component: JobMatch,
});

function JobMatch() {
  const [jd, setJd] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<JobMatchResult | null>(null);

  async function run() {
    if (jd.trim().length < 50) { toast.error("Paste a longer job description (50+ chars)"); return; }
    setBusy(true);
    try {
      const r = await JobAPI.match(jd);
      setResult(r);
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job description match</h1>
        <p className="text-muted-foreground mt-1">Paste a JD to see how your resume aligns.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card p-6">
          <h3 className="font-semibold">Job description</h3>
          <Textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the full job description here…"
            className="mt-3 min-h-[280px] resize-y"
          />
          <Button onClick={run} disabled={busy} className="bg-gradient-hero text-primary-foreground shadow-elegant mt-4">
            <Target className="mr-1 h-4 w-4" /> {busy ? "Matching…" : "Run match"}
          </Button>
        </Card>

        <Card className="shadow-card p-6">
          {!result ? (
            <div className="text-muted-foreground grid h-full place-items-center text-center text-sm">
              <div>
                <Target className="mx-auto h-10 w-10 opacity-40" />
                <p className="mt-3">Results will appear here.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Match percentage</p>
                  <p className="text-4xl font-bold">{result.matchPercentage}%</p>
                </div>
                <div className="relative h-24 w-24">
                  <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                    <circle cx="60" cy="60" r="52" stroke="var(--color-muted)" strokeWidth="10" fill="none" />
                    <circle cx="60" cy="60" r="52" stroke="var(--color-primary)" strokeWidth="10" fill="none"
                      strokeLinecap="round" strokeDasharray={2 * Math.PI * 52}
                      strokeDashoffset={2 * Math.PI * 52 * (1 - result.matchPercentage / 100)} />
                  </svg>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="flex items-center gap-2 text-sm font-semibold"><CheckCircle2 className="text-success h-4 w-4" /> Matching skills</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.matchingSkills.map((s) => <Badge key={s} className="bg-success/15 text-success-foreground border-success/30" variant="outline">{s}</Badge>)}
                </div>
              </div>
              <div className="mt-5">
                <h4 className="flex items-center gap-2 text-sm font-semibold"><TriangleAlert className="text-warning h-4 w-4" /> Missing skills</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.missingSkills.map((s) => <Badge key={s} className="bg-warning/15 border-warning/30" variant="outline">{s}</Badge>)}
                </div>
              </div>
              <div className="mt-5">
                <h4 className="flex items-center gap-2 text-sm font-semibold"><Lightbulb className="text-primary h-4 w-4" /> Suggestions</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  {result.suggestions.map((s) => <li key={s} className="text-muted-foreground">• {s}</li>)}
                </ul>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
