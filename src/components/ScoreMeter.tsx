import { cn } from "@/lib/utils";

interface Props {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export function ScoreMeter({ value, size = 200, strokeWidth = 14, label, className }: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const colorVar = value >= 80 ? "var(--color-success)" : value >= 60 ? "var(--color-chart-1)" : "var(--color-destructive)";

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} stroke="var(--color-muted)" fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth}
          stroke={colorVar} fill="none" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-4xl font-bold tracking-tight">{value}<span className="text-xl text-muted-foreground">%</span></div>
        {label && <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>}
      </div>
    </div>
  );
}
