"use client";

import { useState } from "react";
import {
  Globe,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Search,
  Check,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import ComingSoonBanner from "@/components/admin/ComingSoonBanner";

interface LanguageItem {
  id: string;
  name: string;
  code: string;
  flag: string;
  is_default: boolean;
  status: "Active" | "Inactive";
}

const DEFAULT_LANGUAGES: LanguageItem[] = [
  {
    id: "lang-1",
    name: "English (US)",
    code: "en",
    flag: "🇺🇸",
    is_default: true,
    status: "Active",
  },
  {
    id: "lang-2",
    name: "বাংলা (Bengali)",
    code: "bn",
    flag: "🇧🇩",
    is_default: false,
    status: "Active",
  },
];

export default function AdminLanguagesPage() {
  const [languages, setLanguages] = useState<LanguageItem[]>(DEFAULT_LANGUAGES);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLang, setEditingLang] = useState<LanguageItem | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [flag, setFlag] = useState("🌐");
  const [isDefault, setIsDefault] = useState(false);

  const handleOpenAdd = () => {
    setEditingLang(null);
    setName("");
    setCode("");
    setFlag("🌐");
    setIsDefault(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (l: LanguageItem) => {
    setEditingLang(l);
    setName(l.name);
    setCode(l.code);
    setFlag(l.flag);
    setIsDefault(l.is_default);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) {
      toast.error("Please fill in language name and code");
      return;
    }

    if (editingLang) {
      setLanguages((prev) =>
        prev.map((l) =>
          l.id === editingLang.id
            ? { ...l, name: name.trim(), code: code.toLowerCase().trim(), flag, is_default: isDefault }
            : isDefault ? { ...l, is_default: false } : l
        )
      );
      toast.success("Language updated!");
    } else {
      const newLang: LanguageItem = {
        id: `lang-${Date.now()}`,
        name: name.trim(),
        code: code.toLowerCase().trim(),
        flag,
        is_default: isDefault,
        status: "Active",
      };
      setLanguages((prev) => [
        ...(isDefault ? prev.map((l) => ({ ...l, is_default: false })) : prev),
        newLang,
      ]);
      toast.success("New language added!");
    }
    setModalOpen(false);
  };

  const handleSetDefault = (id: string) => {
    setLanguages((prev) =>
      prev.map((l) => ({ ...l, is_default: l.id === id }))
    );
    toast.success("Default store language updated!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <ComingSoonBanner feature="Languages" />
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            International Languages
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Configure multi-language translations and regional default language
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Language</span>
        </button>
      </div>

      {/* ── Languages Table ── */}
      <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/75 dark:bg-stone-800/40 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-12 text-center">Flag</th>
                <th className="py-3.5 px-4">Language Name</th>
                <th className="py-3.5 px-4">Code</th>
                <th className="py-3.5 px-4 text-center">Default Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {languages.map((lang) => (
                <tr
                  key={lang.id}
                  className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors"
                >
                  <td className="py-3.5 px-4 text-center text-xl">
                    {lang.flag}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-stone-900 dark:text-white">
                    {lang.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-stone-500">
                    {lang.code}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {lang.is_default ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Default Language
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSetDefault(lang.id)}
                        className="text-xs text-stone-400 hover:text-emerald-600 hover:underline font-bold"
                      >
                        Set Default
                      </button>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenEdit(lang)}
                        className="p-2.5 rounded-lg text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md mx-auto bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 max-h-[90dvh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/40 sticky top-0 z-10">
              <h3 className="font-extrabold text-sm text-stone-900 dark:text-white">
                {editingLang ? "Edit Language" : "Add Language"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Language Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. বাংলা (Bengali)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 text-base bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Language Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="bn"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toLowerCase())}
                    className="w-full px-3 py-2.5 text-base bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Flag Emoji
                  </label>
                  <input
                    type="text"
                    required
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    className="w-full px-3 py-2.5 text-base bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="lang-default"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 shrink-0"
                />
                <label htmlFor="lang-default" className="text-xs font-semibold text-stone-700 dark:text-stone-300 cursor-pointer">
                  Set as default primary storefront language
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-xs cursor-pointer"
                >
                  {editingLang ? "Save Changes" : "Create Language"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
