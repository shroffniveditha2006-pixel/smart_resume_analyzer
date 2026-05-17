import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            AI-powered ATS analysis that gets your resume past the bots and in front of recruiters.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
            <li><Link to="/dashboard/upload" className="hover:text-foreground">Analyze Resume</Link></li>
            <li><Link to="/dashboard/job-match" className="hover:text-foreground">Job Match</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Privacy</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
            <li className="flex gap-3 pt-2">
              <a href="#" aria-label="GitHub"><Github className="h-4 w-4 hover:text-foreground" /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin className="h-4 w-4 hover:text-foreground" /></a>
              <a href="#" aria-label="Email"><Mail className="h-4 w-4 hover:text-foreground" /></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SmartResume Analyzer. All rights reserved.
      </div>
    </footer>
  );
}
