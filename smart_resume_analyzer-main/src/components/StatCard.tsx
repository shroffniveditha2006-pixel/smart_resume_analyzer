import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  value: string | number;
  delta?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function StatCard({ title, value, delta, icon: Icon, trend = "up", className }: Props) {
  return (
    <Card className={cn("group relative overflow-hidden transition-all hover:shadow-elegant", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight">{value}</p>
            {delta && (
              <p className={cn(
                "mt-1 text-xs font-medium",
                trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground",
              )}>
                {delta}
              </p>
            )}
          </div>
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
