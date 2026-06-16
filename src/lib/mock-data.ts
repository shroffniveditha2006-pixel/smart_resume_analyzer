import type { DashboardStats, JobMatchResult, ResumeAnalysis, User } from "@/types";

export const mockUser: User = {
  id: "u_1",
  name: "Alex Morgan",
  email: "alex@example.com",
  plan: "Pro",
  joinedAt: "2025-02-14",
};

export const mockAnalysis: ResumeAnalysis = {
  id: "a_1",
  fileName: "Alex_Morgan_Resume.pdf",
  uploadedAt: new Date().toISOString(),
  atsScore: 82,
  jobMatch: 76,
  skillsDetected: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker", "Jest", "Tailwind CSS"],
  missingSkills: ["Kubernetes", "Go", "Terraform"],
  strengths: [
    "Clear, ATS-friendly structure",
    "Quantified achievements in 7 bullets",
    "Strong action verbs throughout",
    "Relevant keywords for target role",
  ],
  weaknesses: [
    "Summary section is generic",
    "Missing leadership impact metrics",
    "Skills section lacks categorization",
  ],
  recommendations: [
    "Add a 2–3 line tailored summary mentioning target role",
    "Quantify leadership impact (team size, revenue, retention)",
    "Group skills by category: Frontend, Backend, DevOps",
    "Include 1 line about open-source / community contributions",
  ],
};

export const mockStats: DashboardStats = {
  atsScore: 82,
  jobMatch: 76,
  totalAnalyzed: 14,
  recentActivity: [
    { id: "1", title: "Resume analyzed", meta: "Alex_Morgan_Resume.pdf", date: "2h ago" },
    { id: "2", title: "Job match run", meta: "Senior Frontend Engineer @ Stripe", date: "1d ago" },
    { id: "3", title: "Resume uploaded", meta: "v3-final.pdf", date: "2d ago" },
    { id: "4", title: "Profile updated", meta: "Added 2 skills", date: "5d ago" },
  ],
};

export const mockHistory: ResumeAnalysis[] = Array.from({ length: 8 }).map((_, i) => ({
  ...mockAnalysis,
  id: `a_${i + 1}`,
  fileName: `Resume_v${i + 1}.pdf`,
  uploadedAt: new Date(Date.now() - i * 86_400_000).toISOString(),
  atsScore: 60 + ((i * 7) % 35),
  jobMatch: 55 + ((i * 11) % 40),
}));

export const mockJobMatch: JobMatchResult = {
  matchPercentage: 78,
  matchingSkills: ["React", "TypeScript", "GraphQL", "AWS", "Jest"],
  missingSkills: ["Kubernetes", "Rust", "gRPC"],
  suggestions: [
    "Add a project demonstrating Kubernetes deployment",
    "Highlight system design experience near the top",
    "Mirror the JD's keywords in your summary",
  ],
};

export const chartScoreTrend = [
  { name: "v1", ats: 58, match: 52 },
  { name: "v2", ats: 64, match: 60 },
  { name: "v3", ats: 71, match: 65 },
  { name: "v4", ats: 76, match: 70 },
  { name: "v5", ats: 80, match: 73 },
  { name: "v6", ats: 82, match: 76 },
];

export const chartSkillCoverage = [
  { name: "Frontend", value: 92 },
  { name: "Backend", value: 78 },
  { name: "DevOps", value: 54 },
  { name: "Testing", value: 71 },
  { name: "Cloud", value: 66 },
];
