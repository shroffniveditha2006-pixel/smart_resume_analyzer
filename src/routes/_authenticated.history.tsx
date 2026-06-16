import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { FileText, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResumeAPI } from "@/services/api";

export const Route = createFileRoute("/_authenticated/history")({
  head: () => ({ meta: [{ title: "Resume History — Smart Resume Analyzer" }] }),
  component: History,
});

function History() {
  const { data = [] } = useQuery({ queryKey: ["history"], queryFn: ResumeAPI.history });
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  const rows = useMemo(() => {
    return data
      .filter((r) => r.fileName.toLowerCase().includes(q.toLowerCase()))
      .filter((r) => filter === "all" ? true : filter === "high" ? r.atsScore >= 80 : filter === "mid" ? r.atsScore >= 60 && r.atsScore < 80 : r.atsScore < 60);
  }, [data, q, filter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resume history</h1>
        <p className="text-muted-foreground mt-1">All your previous analyses in one place.</p>
      </div>

      <Card className="shadow-card p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by file name…" className="pl-9" />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All scores</SelectItem>
              <SelectItem value="high">High (80+)</SelectItem>
              <SelectItem value="mid">Mid (60–79)</SelectItem>
              <SelectItem value="low">Low (under 60)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="shadow-card overflow-hidden p-0">
        <div className="text-muted-foreground bg-muted/40 grid grid-cols-12 gap-4 border-b px-6 py-3 text-xs font-medium tracking-wide uppercase">
          <div className="col-span-6">Resume</div>
          <div className="col-span-2">ATS</div>
          <div className="col-span-2">Match</div>
          <div className="col-span-2 text-right">Date</div>
        </div>
        <ul className="divide-y">
          {rows.map((r) => (
            <li key={r.id}>
              <Link to="/analysis" className="hover:bg-muted/40 grid grid-cols-12 items-center gap-4 px-6 py-4 transition-colors">
                <div className="col-span-6 flex items-center gap-3">
                  <div className="bg-primary/10 text-primary grid h-9 w-9 place-items-center rounded-lg"><FileText className="h-4 w-4" /></div>
                  <div>
                    <p className="text-sm font-medium">{r.fileName}</p>
                    <p className="text-muted-foreground text-xs">Analysis #{r.id}</p>
                  </div>
                </div>
                <div className="col-span-2"><Badge variant="secondary">{r.atsScore}/100</Badge></div>
                <div className="col-span-2"><Badge variant="outline">{r.jobMatch}%</Badge></div>
                <div className="text-muted-foreground col-span-2 text-right text-xs">{new Date(r.uploadedAt).toLocaleDateString()}</div>
              </Link>
            </li>
          ))}
          {rows.length === 0 && <li className="text-muted-foreground p-12 text-center text-sm">No analyses match your filters.</li>}
        </ul>
      </Card>
    </div>
  );
}
