import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Upload, FileText, X, Loader2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/upload")({ component: UploadPage });

function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [jd, setJd] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFile = (f: File | null) => {
    if (!f) return;
    if (!["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(f.type)) {
      toast.error("Please upload a PDF or DOCX file");
      return;
    }
    if (f.size > 10 * 1024 * 1024) { toast.error("File must be under 10MB"); return; }
    setFile(f);
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(id); return 100; }
        return p + 10;
      });
    }, 80);
    toast.success("Resume uploaded");
  };

  const analyze = async () => {
    if (!file) { toast.error("Upload a resume first"); return; }
    if (jd.trim().length < 50) { toast.error("Paste a job description (at least 50 characters)"); return; }
    setAnalyzing(true);
    // API-ready: resumeApi.upload(formData) -> resumeApi.analyze(id, jd)
    await new Promise((r) => setTimeout(r, 1500));
    setAnalyzing(false);
    toast.success("Analysis complete!");
    navigate({ to: "/dashboard/analysis" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Analyze your resume</h1>
        <p className="text-sm text-muted-foreground">Upload a resume and paste the job description to get your ATS score.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Resume File</CardTitle></CardHeader>
          <CardContent>
            <div
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files?.[0] ?? null); }}
              onClick={() => inputRef.current?.click()}
              className={cn(
                "relative cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all",
                drag ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-primary/60 hover:bg-accent/50",
              )}
            >
              <input ref={inputRef} type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => handleFile(e.target.files?.[0] ?? null)} />
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-elegant animate-float">
                <Upload className="h-6 w-6" />
              </div>
              <p className="font-medium">Drop your resume here</p>
              <p className="mt-1 text-sm text-muted-foreground">PDF or DOCX, up to 10MB</p>
              <Button type="button" variant="outline" className="mt-4">Browse files</Button>
            </div>

            {file && (
              <Card className="mt-4 border-border/60 animate-scale-in">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><FileText className="h-5 w-5" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium">{file.name}</p>
                      <button onClick={() => { setFile(null); setProgress(0); }} aria-label="Remove">
                        <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                    {progress < 100 ? (
                      <Progress value={progress} className="mt-2" />
                    ) : (
                      <p className="mt-1 text-xs font-medium text-success">Upload complete</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Job Description</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the full job description here. Include responsibilities, required skills, and qualifications for the most accurate analysis."
              className="min-h-[280px] resize-none"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{jd.length} characters</span>
              <span>Tip: longer JDs give better matches</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => { setFile(null); setJd(""); setProgress(0); toast.info("Cleared"); }}>
                Clear
              </Button>
              <Button onClick={analyze} disabled={analyzing} className="flex-1 bg-gradient-primary shadow-elegant">
                {analyzing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing…</> : <><Sparkles className="mr-2 h-4 w-4" /> Analyze Resume</>}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
