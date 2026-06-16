export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: "Free" | "Pro" | "Enterprise";
  joinedAt: string;
}

export interface ResumeAnalysis {
  id: string;
  fileName: string;
  uploadedAt: string;
  atsScore: number;
  jobMatch: number;
  skillsDetected: string[];
  missingSkills: string[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface JobMatchResult {
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  suggestions: string[];
}

export interface DashboardStats {
  atsScore: number;
  jobMatch: number;
  totalAnalyzed: number;
  recentActivity: { id: string; title: string; meta: string; date: string }[];
}
