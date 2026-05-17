import type { JobMatch, ResumeAnalysis } from "@/types";

export const ATS_SCORE_TREND = [
  { month: "Jan", score: 62 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 71 },
  { month: "Apr", score: 75 },
  { month: "May", score: 78 },
  { month: "Jun", score: 82 },
  { month: "Jul", score: 86 },
];

export const SKILL_MATCH = [
  { name: "Matched", value: 72, fill: "var(--color-chart-2)" },
  { name: "Partial", value: 18, fill: "var(--color-chart-4)" },
  { name: "Missing", value: 10, fill: "var(--color-destructive)" },
];

export const RESUME_QUALITY = [
  { metric: "Skills", score: 88 },
  { metric: "Projects", score: 76 },
  { metric: "Experience", score: 82 },
  { metric: "Education", score: 91 },
  { metric: "Formatting", score: 84 },
];

export const KEYWORD_MATCH = [
  { keyword: "React", count: 12 },
  { keyword: "TypeScript", count: 9 },
  { keyword: "Node.js", count: 7 },
  { keyword: "AWS", count: 5 },
  { keyword: "Docker", count: 4 },
  { keyword: "GraphQL", count: 3 },
];

export const SAMPLE_ANALYSIS: ResumeAnalysis = {
  id: "demo",
  fileName: "Aman_Resume_2025.pdf",
  jobTitle: "Senior Full-Stack Engineer",
  atsScore: 86,
  matchedSkills: ["React", "TypeScript", "Node.js", "PostgreSQL", "REST APIs", "Git", "Tailwind CSS", "Jest"],
  missingSkills: ["Kubernetes", "GraphQL", "Terraform", "Redis"],
  suggestions: [
    "Add measurable impact metrics to your work experience (e.g. reduced load time by 40%).",
    "Include a 'GraphQL' bullet under your most recent role to match the JD.",
    "Move the Skills section above Education for better ATS parsing.",
    "Use a single-column layout — multi-column resumes confuse most ATS parsers.",
  ],
  strengths: [
    "Strong project portfolio with measurable outcomes",
    "Clean, ATS-friendly formatting",
    "Excellent keyword density for core stack",
    "Quantified achievements in 4 of 5 roles",
  ],
  sectionScores: { skills: 88, projects: 82, experience: 90, education: 95, formatting: 78 },
  createdAt: new Date().toISOString(),
};

export const RECENT_ANALYSES: ResumeAnalysis[] = [
  { ...SAMPLE_ANALYSIS, id: "1", fileName: "Aman_v3.pdf", jobTitle: "Frontend Engineer", atsScore: 86, createdAt: "2025-05-10" },
  { ...SAMPLE_ANALYSIS, id: "2", fileName: "Aman_v2.pdf", jobTitle: "Full-Stack Engineer", atsScore: 78, createdAt: "2025-04-22" },
  { ...SAMPLE_ANALYSIS, id: "3", fileName: "Aman_v1.pdf", jobTitle: "Backend Engineer", atsScore: 71, createdAt: "2025-03-15" },
  { ...SAMPLE_ANALYSIS, id: "4", fileName: "Resume_Old.pdf", jobTitle: "Software Intern", atsScore: 64, createdAt: "2025-02-01" },
];

export const JOB_MATCHES: JobMatch[] = [
  {
    id: "j1",
    role: "Senior Frontend Engineer",
    company: "Stripe",
    matchPercentage: 92,
    missingRequirements: ["GraphQL", "Internationalization"],
    recommendedSkills: ["GraphQL", "i18n", "Web Performance"],
  },
  {
    id: "j2",
    role: "Full-Stack Engineer",
    company: "Linear",
    matchPercentage: 86,
    missingRequirements: ["Rust", "WebSockets"],
    recommendedSkills: ["Rust basics", "Realtime systems"],
  },
  {
    id: "j3",
    role: "Product Engineer",
    company: "Vercel",
    matchPercentage: 78,
    missingRequirements: ["Edge Functions", "Serverless"],
    recommendedSkills: ["Cloudflare Workers", "Next.js"],
  },
  {
    id: "j4",
    role: "Software Engineer II",
    company: "Notion",
    matchPercentage: 74,
    missingRequirements: ["CRDTs", "Offline-first"],
    recommendedSkills: ["Yjs", "IndexedDB"],
  },
];

export const TESTIMONIALS = [
  { name: "Priya Shah", role: "SDE @ Razorpay", quote: "I jumped from 62 to 89 ATS score in one week. Got 3 interviews the next." },
  { name: "Marcus Lee", role: "Senior Engineer @ Atlassian", quote: "The skill gap roadmap is gold. Felt like a personal career coach." },
  { name: "Ananya Verma", role: "Recent Grad", quote: "Finally a tool that explains *why* my resume was getting rejected." },
];

export const FAQS = [
  { q: "How is the ATS score calculated?", a: "We parse your resume the same way leading ATS systems do — extracting structured data, then scoring keyword overlap, formatting, and section completeness against the job description." },
  { q: "Is my data secure?", a: "Yes. Resumes are encrypted at rest, never shared with third parties, and you can delete your data at any time." },
  { q: "Do you support all file types?", a: "We currently support PDF and DOCX. PDF is recommended for the most accurate parsing." },
  { q: "Can I use this for multiple job descriptions?", a: "Absolutely. Each analysis is scoped to a JD, and your history keeps every run for comparison." },
];
