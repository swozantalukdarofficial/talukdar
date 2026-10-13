"use client";

import { useState, useEffect } from "react";
import {
  Lock,
  ShieldCheck,
  Save,
  KeyRound,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function AdminProfilePage() {
  const [loadingUser, setLoadingUser] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  // Password state
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [changingPw, setChangingPw] = useState(false);

  // Load the real signed-in admin
  useEffect(() => {
    async function load() {
      if (!supabase) {
        setLoadingUser(false);
        return;
      }
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
        setName(
          (user.user_metadata?.display_name as string) ||
            (user.user_metadata?.name as string) ||
            ""
        );
        setPhone((user.user_metadata?.phone as string) || "");
      }
      setLoadingUser(false);
    }
    load();
  }, []);

  const initials = (name || userEmail || "AD")
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]!.toUpperCase())
    .join("");

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      toast.error("Supabase is not configured.");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { display_name: name.trim(), phone: phone.trim() },
      });
      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error("Failed to update profile: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      toast.error("Supabase is not configured.");
      return;
    }
    if (!currentPass) {
      toast.error("Please enter your current password.");
      return;
    }
    if (!newPass || newPass.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (newPass !== confirmPass) {
      toast.error("New passwords do not match!");
      return;
    }

    setChangingPw(true);
    try {
      // 1. Verify the current password is correct
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: currentPass,
      });
      if (signInError) throw new Error("Current password is incorrect.");

      // 2. Set the new password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPass,
      });
      if (updateError) throw updateError;

      toast.success("Password changed successfully!");
      setCurrentPass("");
      setNewPass("");
      setConfirmPass("");
    } catch (err: any) {
      toast.error("Failed to change password: " + err.message);
    } finally {
      setChangingPw(false);
    }
  }

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Admin Profile & Security
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Manage your personal administrator identity and security credentials
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Profile Card */}
        <form
          onSubmit={handleSaveProfile}
          className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-4"
        >
          <div className="flex items-center gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              {initials || "AD"}
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-stone-900 dark:text-white">
                Admin Details
              </h3>
              <p className="text-[11px] text-stone-400 dark:text-stone-500 truncate" title={userEmail || ""}>
                Signed in as {userEmail || "unknown"}
              </p>
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Your Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Shipon Talukdar"
              className="w-full px-3 py-2.5 text-base bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Admin Email (login)
            </label>
            <input
              type="email"
              value={userEmail}
              disabled
              title="Login email can only be changed from Supabase Auth settings"
              className="w-full px-3 py-2.5 text-base bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-500 dark:text-stone-400 cursor-not-allowed truncate"
            />
            <p className="text-[10px] text-stone-400 mt-1">
              Login email is managed via Supabase Auth.
            </p>
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Contact Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+880 1XXX-XXXXXX"
              className="w-full px-3 py-2.5 text-base bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Update Profile
          </button>
        </form>

        {/* Security Password Card */}
        <form
          onSubmit={handleUpdatePassword}
          className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-4"
        >
          <div className="flex items-center gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-stone-900 dark:text-white">
                Change Password
              </h3>
              <p className="text-[11px] text-stone-400">
                Your current password is verified first
              </p>
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Current Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              className="w-full px-3 py-2.5 text-base bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              placeholder="Minimum 8 characters"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full px-3 py-2.5 text-base bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              placeholder="Repeat new password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full px-3 py-2.5 text-base bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400"
            />
          </div>

          <button
            type="submit"
            disabled={changingPw}
            className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-xs cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {changingPw ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
            Change Password
          </button>

          <p className="flex items-start gap-1.5 text-[10px] text-stone-400">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-px text-emerald-600" />
            For security, changing your password signs this session out everywhere else.
          </p>
        </form>
      </div>
    </div>
  );
}
