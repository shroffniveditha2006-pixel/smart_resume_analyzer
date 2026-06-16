import { FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="bg-gradient-hero grid h-8 w-8 place-items-center rounded-lg text-primary-foreground shadow-elegant">
        <FileText className="h-4 w-4" />
      </span>
      <span className="text-base">Smart Resume Analyzer</span>
    </Link>
  );
}
