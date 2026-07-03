"use client";

import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // 1. Clear local storage bypass token
    localStorage.removeItem("talukdar_admin_auth");
    localStorage.removeItem("talukdar_admin_auth_expiry");

    // 2. Clear Supabase auth session
    if (supabase) {
      await supabase.auth.signOut();
    }

    toast.success("Logged out successfully.");
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      type="button"
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 font-semibold text-sm transition-colors shrink-0 border-0 bg-transparent text-left cursor-pointer"
    >
      <LogOut className="w-5 h-5" />
      Sign Out / Exit
    </button>
  );
}
