import type { Metadata } from "next";
import AdminClientGuard from "@/components/AdminClientGuard";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export const metadata: Metadata = {
  title: "Admin Panel | EV Solution BD",
  description: "Enterprise Control Panel for EV Solution BD",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminClientGuard>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </AdminClientGuard>
  );
}
