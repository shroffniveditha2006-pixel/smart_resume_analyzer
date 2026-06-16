/**
 * API service layer — ready to plug into Spring Boot backend.
 * Set VITE_API_BASE_URL in your env to point to your backend.
 * All methods throw on non-2xx responses.
 */
import type { ApiResponse, JobMatch, ResumeAnalysis, User } from "@/types";

const API_BASE_URL =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_BASE_URL) ||
  "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const json = (await res.json()) as ApiResponse<T>;
  return json.data;
}

export const authApi = {
  login: (email: string, password: string) =>
    request<{ token: string; user: User }>(`/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  signup: (fullName: string, email: string, password: string) =>
    request<{ token: string; user: User }>(`/auth/signup`, {
      method: "POST",
      body: JSON.stringify({ fullName, email, password }),
    }),
  me: () => request<User>(`/auth/me`),
  logout: () => request<void>(`/auth/logout`, { method: "POST" }),
};

export const resumeApi = {
  upload: (formData: FormData) =>
    fetch(`${API_BASE_URL}/resumes/upload`, { method: "POST", body: formData }).then(
      (r) => r.json() as Promise<ApiResponse<ResumeAnalysis>>,
    ),
  analyze: (resumeId: string, jobDescription: string) =>
    request<ResumeAnalysis>(`/resumes/${resumeId}/analyze`, {
      method: "POST",
      body: JSON.stringify({ jobDescription }),
    }),
  getById: (id: string) => request<ResumeAnalysis>(`/resumes/${id}`),
  list: () => request<ResumeAnalysis[]>(`/resumes`),
};

export const jobMatchApi = {
  list: () => request<JobMatch[]>(`/job-matches`),
  byResume: (resumeId: string) => request<JobMatch[]>(`/resumes/${resumeId}/matches`),
};
