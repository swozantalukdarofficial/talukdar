"use client";

import { useState, useEffect } from "react";
import { Lock, Mail, ShieldAlert, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function AdminClientGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Check auth state on mount
  useEffect(() => {
    async function checkAuth() {
      if (!supabase) {
        setIsAuthenticated(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const adminEmailsStr = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "swozantalukdaofficial@gmail.com,shipontalukdaroffice@gmail.com";
        const adminEmails = adminEmailsStr.split(",").map(e => e.trim().toLowerCase());

        if (session.user?.email && adminEmails.includes(session.user.email.toLowerCase())) {
          setIsAuthenticated(true);
          return;
        } else {
          // Unauthorised email
          await supabase.auth.signOut();
        }
      }
      setIsAuthenticated(false);
    }

    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!supabase) {
      toast.error("Supabase is not configured properly in environment variables.");
      setLoading(false);
      return;
    }

    if (!email.trim() || !password) {
      toast.error("Please enter both email and password.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      toast.error(error.message || "Invalid email or password.");
    } else if (data.user) {
      const adminEmailsStr = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "swozantalukdaofficial@gmail.com,shipontalukdaroffice@gmail.com";
      const adminEmails = adminEmailsStr.split(",").map(item => item.trim().toLowerCase());

      if (data.user.email && adminEmails.includes(data.user.email.toLowerCase())) {
        setIsAuthenticated(true);
        toast.success("Welcome Back, Admin!");
      } else {
        await supabase.auth.signOut();
        toast.error("Unauthorized email address! Access denied.");
      }
    }
    setLoading(false);
  };

  // Prevent flashing content
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-stone-200 rounded-3xl p-8 shadow-xl shadow-stone-200/40 relative overflow-hidden">
          {/* Top border decor */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-green-700" />

          <div className="text-center space-y-6">
            {/* Logo */}
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-emerald-500/20 bg-stone-950 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <img src="/logo.svg" alt="Talukdar EV Logo" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-xl font-extrabold text-stone-900 tracking-tight mt-2">
                Talukdar <span className="text-emerald-700">EV</span> Admin Portal
              </h1>
              <p className="text-stone-400 text-xs font-semibold">Authorized Personnel Only</p>
            </div>

            {!supabase && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-semibold text-left">
                Warning: Supabase credentials are not configured. Admin panel is locked until configuration is provided.
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold text-stone-500 mb-1.5 uppercase flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  Admin Email
                </label>
                <input
                  type="email"
                  placeholder="admin@talukdarev.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-semibold"
                  required
                  disabled={!supabase}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold text-stone-500 mb-1.5 uppercase flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-stone-400" />
                  Security Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-semibold"
                  required
                  disabled={!supabase}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !supabase}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm h-12 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/15 hover:shadow-emerald-600/25 transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Verify Access
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-stone-400 text-[10px] font-bold uppercase">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
              All attempts are monitored and logged
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
