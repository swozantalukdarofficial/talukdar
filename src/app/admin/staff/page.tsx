"use client";

import { useState } from "react";
import {
  Users,
  UserCheck,
  Plus,
  Trash2,
  Edit,
  ShieldCheck,
  Search,
  Phone,
  Mail,
  Calendar,
  X,
  Lock,
  CheckCircle2,
  Key
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Super Admin" | "Store Manager" | "Order Dispatcher" | "Support Staff";
  joining_date: string;
  status: "Active" | "Inactive";
}

const DEFAULT_STAFF: StaffMember[] = [
  {
    id: "stf-1",
    name: "Swozan Talukdar",
    email: "swozantalukdaofficial@gmail.com",
    phone: "+880 1833-289578",
    role: "Super Admin",
    joining_date: "2026-01-10",
    status: "Active",
  },
  {
    id: "stf-2",
    name: "Shipon Talukdar",
    email: "shipontalukdaroffice@gmail.com",
    phone: "+880 1333-600272",
    role: "Super Admin",
    joining_date: "2026-01-15",
    status: "Active",
  },
  {
    id: "stf-3",
    name: "EV Operations Manager",
    email: "manager@evsolutionbd.com",
    phone: "+880 1712-345678",
    role: "Store Manager",
    joining_date: "2026-03-01",
    status: "Active",
  },
];

export default function AdminStaffPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>(DEFAULT_STAFF);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<StaffMember["role"]>("Store Manager");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const handleOpenAdd = () => {
    setEditingStaff(null);
    setName("");
    setEmail("");
    setPhone("");
    setRole("Store Manager");
    setStatus("Active");
    setModalOpen(true);
  };

  const handleOpenEdit = (s: StaffMember) => {
    setEditingStaff(s);
    setName(s.name);
    setEmail(s.email);
    setPhone(s.phone);
    setRole(s.role);
    setStatus(s.status);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in staff name and email");
      return;
    }

    if (editingStaff) {
      setStaffList((prev) =>
        prev.map((s) =>
          s.id === editingStaff.id
            ? { ...s, name: name.trim(), email: email.trim(), phone: phone.trim(), role, status }
            : s
        )
      );
      toast.success("Staff profile updated!");
    } else {
      const newStaff: StaffMember = {
        id: `stf-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role,
        joining_date: new Date().toISOString().split("T")[0],
        status,
      };
      setStaffList((prev) => [newStaff, ...prev]);
      toast.success("New team member added to staff roster!");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (staffList.length <= 1) {
      toast.error("You cannot delete the only administrator.");
      return;
    }
    if (!confirm(`Are you sure you want to remove ${name}?`)) return;
    setStaffList((prev) => prev.filter((s) => s.id !== id));
    toast.success("Staff member removed.");
  };

  const filtered = staffList.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.phone.toLowerCase().includes(q) ||
      s.role.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Staff & Team Members
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Manage administrative permissions, store managers, and order fulfillment staff
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Staff Member</span>
        </button>
      </div>

      {/* ── Search Bar ── */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search staff by name, email, phone or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* ── Staff Table (Kachabazar Style) ── */}
      <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/75 dark:bg-stone-800/40 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Joining Date</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {filtered.map((staff) => (
                <tr
                  key={staff.id}
                  className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors"
                >
                  {/* Name & Avatar */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        {staff.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-bold text-stone-900 dark:text-white">
                        {staff.name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-3.5 px-4 text-stone-600 dark:text-stone-300 font-medium">
                    {staff.email}
                  </td>

                  {/* Phone */}
                  <td className="py-3.5 px-4 text-stone-500">
                    {staff.phone || "N/A"}
                  </td>

                  {/* Joining Date */}
                  <td className="py-3.5 px-4 text-stone-500">
                    {staff.joining_date}
                  </td>

                  {/* Role Badge */}
                  <td className="py-3.5 px-4">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-[11px] font-extrabold inline-flex items-center gap-1",
                        staff.role === "Super Admin"
                          ? "bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/40 dark:text-purple-300"
                          : staff.role === "Store Manager"
                          ? "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300"
                          : "bg-stone-100 text-stone-700 border border-stone-200 dark:bg-stone-800 dark:text-stone-300"
                      )}
                    >
                      <ShieldCheck className="w-3 h-3" />
                      {staff.role}
                    </span>
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        staff.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-stone-100 text-stone-500"
                      )}
                    >
                      {staff.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenEdit(staff)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                        title="Edit Staff Member"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(staff.id, staff.name)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove Staff"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add / Edit Staff Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/40">
              <h3 className="font-extrabold text-sm text-stone-900 dark:text-white">
                {editingStaff ? "Edit Staff Member" : "Add New Staff Member"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="staff@evsolutionbd.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  placeholder="+880 1833-289578"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    System Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Store Manager">Store Manager</option>
                    <option value="Order Dispatcher">Order Dispatcher</option>
                    <option value="Support Staff">Support Staff</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Account Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs cursor-pointer"
                >
                  {editingStaff ? "Save Profile" : "Add Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
