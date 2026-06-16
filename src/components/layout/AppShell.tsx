import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { BarChart3, FileSearch, History, LayoutDashboard, LogOut, Menu, Settings, Target, Upload, User } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/upload", label: "Upload Resume", icon: Upload },
  { to: "/analysis", label: "Analysis", icon: FileSearch },
  { to: "/job-match", label: "Job Match", icon: Target },
  { to: "/history", label: "History", icon: History },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const nav$ = useNavigate();
  const loc = useLocation();

  return (
    <div className="bg-background min-h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground border-sidebar-border fixed inset-y-0 left-0 z-40 w-64 -translate-x-full border-r transition-transform lg:translate-x-0",
          open && "translate-x-0",
        )}
      >
        <div className="flex h-16 items-center border-b px-4"><Logo /></div>
        <nav className="space-y-1 p-3">
          {nav.map((n) => {
            const active = loc.pathname === n.to || loc.pathname.startsWith(n.to + "/");
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "hover:bg-sidebar-accent/60",
                )}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute right-3 bottom-3 left-3">
          <button
            onClick={() => { logout(); nav$({ to: "/login" }); }}
            className="hover:bg-sidebar-accent flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        <header className="bg-background/80 sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((o) => !o)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="text-muted-foreground hidden items-center gap-2 text-sm sm:flex">
              <BarChart3 className="h-4 w-4" />
              <span>Workspace</span>
              <span className="opacity-50">/</span>
              <span className="text-foreground capitalize">{loc.pathname.replace("/", "") || "dashboard"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="bg-accent text-accent-foreground grid h-9 w-9 place-items-center rounded-full text-sm font-medium">
              {user?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>

      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}
    </div>
  );
}
