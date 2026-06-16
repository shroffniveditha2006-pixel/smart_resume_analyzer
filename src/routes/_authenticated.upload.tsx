import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, Upload as UploadIcon, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ResumeAPI } from "@/services/api";

export const Route = createFileRoute("/_authenticated/upload")({
  head: () => ({ meta: [{ title: "Upload Resume — Smart Resume Analyzer" }] }),
  component: UploadPage,
});

function UploadPage() {
  const nav = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const onDrop = useCallback((accepted: File[]) => {
    const f = accepted[0];
    if (!f) return;
    if (f.type !== "application/pdf") { toast.error("Please upload a PDF file"); return; }
    if (f.size > 10 * 1024 * 1024) { toast.error("File too large (max 10MB)"); return; }
    setFile(f);
    setProgress(0);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { "application/pdf": [".pdf"] }, multiple: false,
  });

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    try {
      await ResumeAPI.upload(file, setProgress);
      toast.success("Upload complete");
    } finally { setUploading(false); }
  }

  async function handleAnalyze() {
    setAnalyzing(true);
    try {
      await ResumeAPI.analyze();
      toast.success("Analysis ready");
      nav({ to: "/analysis" });
    } finally { setAnalyzing(false); }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload your resume</h1>
        <p className="text-muted-foreground mt-1">PDF only · Max 10MB · We never share your data.</p>
      </div>

      <Card className="shadow-card p-6">
        <div
          {...getRootProps()}
          className={`border-border hover:border-primary cursor-pointer rounded-lg border-2 border-dashed p-12 text-center transition-colors ${isDragActive ? "border-primary bg-accent/40" : ""}`}
        >
          <input {...getInputProps()} />
          <div className="bg-accent text-accent-foreground mx-auto grid h-14 w-14 place-items-center rounded-full">
            <UploadIcon className="h-6 w-6" />
          </div>
          <p className="mt-4 font-medium">{isDragActive ? "Drop the PDF here" : "Drag & drop your resume here"}</p>
          <p className="text-muted-foreground mt-1 text-sm">or click to browse files</p>
        </div>

        {file && (
          <div className="mt-6 space-y-4">
            <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
              <div className="bg-primary/10 text-primary grid h-10 w-10 place-items-center rounded-lg">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-muted-foreground text-xs">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => { setFile(null); setProgress(0); }}><X className="h-4 w-4" /></Button>
            </div>

            {(uploading || progress > 0) && (
              <div>
                <div className="text-muted-foreground mb-1.5 flex justify-between text-xs">
                  <span>{progress === 100 ? "Uploaded" : "Uploading…"}</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {progress < 100 ? (
                <Button onClick={handleUpload} disabled={uploading}>{uploading ? "Uploading…" : "Upload"}</Button>
              ) : (
                <Button onClick={handleAnalyze} disabled={analyzing} className="bg-gradient-hero text-primary-foreground shadow-elegant">
                  {analyzing ? "Analyzing…" : "Analyze resume"}
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>

      {file && progress === 100 && (
        <Card className="shadow-card p-6">
          <h3 className="font-semibold">Preview</h3>
          <p className="text-muted-foreground mt-1 text-sm">A lightweight preview of your resume's metadata.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
            <div><p className="text-muted-foreground text-xs">File</p><p className="font-medium truncate">{file.name}</p></div>
            <div><p className="text-muted-foreground text-xs">Size</p><p className="font-medium">{(file.size / 1024).toFixed(1)} KB</p></div>
            <div><p className="text-muted-foreground text-xs">Type</p><p className="font-medium">PDF</p></div>
          </div>
        </Card>
      )}
    </div>
  );
}
