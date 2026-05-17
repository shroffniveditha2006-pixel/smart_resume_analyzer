import { Link } from "@tanstack/react-router";
import { FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, to = "/" }: { className?: string; to?: string }) {
  return (
    <Link to={to} className={cn("flex items-center gap-2 font-display font-bold", className)}>
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-elegant">
        <FileSearch className="h-5 w-5" />
      </span>
      <span className="text-lg tracking-tight">SmartResume</span>
    </Link>
  );
}
