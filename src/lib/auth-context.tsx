import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type AuthUser = { id: string; name: string; email: string };
type AuthCtx = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "sra_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      isAuthenticated: !!user,
      login: async (email) => {
        const u = { id: "u_1", name: email.split("@")[0] || "User", email };
        localStorage.setItem(KEY, JSON.stringify(u));
        setUser(u);
      },
      signup: async (name, email) => {
        const u = { id: "u_1", name, email };
        localStorage.setItem(KEY, JSON.stringify(u));
        setUser(u);
      },
      logout: () => {
        localStorage.removeItem(KEY);
        setUser(null);
      },
    }),
    [user],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
}
