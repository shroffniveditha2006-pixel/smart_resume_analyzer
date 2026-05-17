import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileText, Search, Eye, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { RECENT_ANALYSES } from "@/constants/dummy";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/history")({ component: HistoryPage });

function HistoryPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const rows = useMemo(() => {
    return RECENT_ANALYSES.filter((r) =>
      (r.fileName.toLowerCase().includes(q.toLowerCase()) || r.jobTitle.toLowerCase().includes(q.toLowerCase())) &&
      (filter === "all" || (filter === "high" ? r.atsScore >= 80 : filter === "mid" ? r.atsScore >= 60 && r.atsScore < 80 : r.atsScore < 60))
    );
  }, [q, filter]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Resume History</h1>
        <p className="text-sm text-muted-foreground">All your past analyses in one place.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All analyses ({rows.length})</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="pl-9 sm:w-64" />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="sm:w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All scores</SelectItem>
                  <SelectItem value="high">80–100</SelectItem>
                  <SelectItem value="mid">60–79</SelectItem>
                  <SelectItem value="low">Below 60</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground">No analyses match your filters.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resume</TableHead>
                    <TableHead>Target Role</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>ATS Score</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary"><FileText className="h-4 w-4" /></div>
                          <span className="font-medium">{r.fileName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{r.jobTitle}</TableCell>
                      <TableCell>{new Date(r.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={r.atsScore >= 80 ? "bg-success/15 text-success hover:bg-success/15" : r.atsScore >= 60 ? "bg-warning/15 text-warning-foreground hover:bg-warning/15" : "bg-destructive/15 text-destructive hover:bg-destructive/15"}>
                          {r.atsScore}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" aria-label="View"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" aria-label="Delete" onClick={() => toast.success("Deleted")}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
