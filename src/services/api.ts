// API service layer. Wired with axios; uses mock adapter for now.
// Swap BASE_URL and remove the mock interceptor to connect to a real backend.
import axios from "axios";
import type { DashboardStats, JobMatchResult, ResumeAnalysis, User } from "@/types";
import { mockAnalysis, mockHistory, mockJobMatch, mockStats, mockUser } from "@/lib/mock-data";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  headers: { "Content-Type": "application/json" },
});

const delay = <T,>(data: T, ms = 600) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(data), ms));

export const ResumeAPI = {
  // POST /api/resume/upload
  upload: (_file: File, onProgress?: (pct: number) => void) =>
    new Promise<{ id: string; fileName: string }>((resolve) => {
      let p = 0;
      const t = setInterval(() => {
        p += Math.random() * 22;
        if (p >= 100) {
          p = 100;
          clearInterval(t);
          onProgress?.(100);
          resolve({ id: "a_new", fileName: _file.name });
        } else onProgress?.(Math.floor(p));
      }, 220);
    }),

  // POST /api/resume/analyze
  analyze: (): Promise<ResumeAnalysis> => delay(mockAnalysis, 900),

  // GET /api/resume/history
  history: (): Promise<ResumeAnalysis[]> => delay(mockHistory),
};

export const JobAPI = {
  // POST /api/job/match
  match: (_jd: string): Promise<JobMatchResult> => delay(mockJobMatch, 900),
};

export const UserAPI = {
  // GET /api/profile
  profile: (): Promise<User> => delay(mockUser),
  // GET dashboard
  stats: (): Promise<DashboardStats> => delay(mockStats),
};
