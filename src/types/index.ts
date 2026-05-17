export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface ResumeAnalysis {
  id: string;
  fileName: string;
  jobTitle: string;
  atsScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
  strengths: string[];
  sectionScores: {
    skills: number;
    projects: number;
    experience: number;
    education: number;
    formatting: number;
  };
  createdAt: string;
}

export interface JobMatch {
  id: string;
  role: string;
  company: string;
  matchPercentage: number;
  missingRequirements: string[];
  recommendedSkills: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
