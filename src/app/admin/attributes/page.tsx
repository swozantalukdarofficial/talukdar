"use client";

import { useState } from "react";
import {
  SlidersHorizontal,
  Plus,
  Trash2,
  Edit,
  Tag,
  Search,
  CheckCircle2,
  X,
  Layers,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import ComingSoonBanner from "@/components/admin/ComingSoonBanner";

interface AttributeItem {
  id: string;
  name: string;
  category: string;
  values: string[];
  is_required: boolean;
}

const DEFAULT_ATTRIBUTES: AttributeItem[] = [
  {
    id: "attr-1",
    name: "Battery Capacity / Type",
    category: "Batteries & Scooters",
    values: ["48V 20Ah", "60V 30Ah Graphene", "72V 32Ah Lithium", "12V 100Ah LiFePO4", "51.2V 100Ah"],
    is_required: true,
  },
  {
    id: "attr-2",
    name: "Motor Power (Watts)",
    category: "Electric Bikes & Scooters",
    values: ["800W", "1000W", "1200W", "1500W Bosch", "2000W High Speed"],
    is_required: true,
  },
  {
    id: "attr-3",
    name: "Range Per Full Charge",
    category: "Vehicles",
    values: ["50-60 KM", "70-80 KM", "90-110 KM", "120+ KM Ultra"],
    is_required: false,
  },
  {
    id: "attr-4",
    name: "Solar Panel Wattage",
    category: "Solar & Inverters",
    values: ["150W Mono", "250W", "550W Tier 1", "615W Bifacial", "620W Deep Blue"],
    is_required: true,
  },
  {
    id: "attr-5",
    name: "Warranty Coverage",
    category: "All Products",
    values: ["1 Year Official", "2 Years Replacement", "3 Years Cell Warranty", "5 Years Solar Performance"],
    is_required: false,
  },
];

export default function AdminAttributesPage() {
  const [attributes, setAttributes] = useState<AttributeItem[]>(DEFAULT_ATTRIBUTES);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAttr, setEditingAttr] = useState<AttributeItem | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Vehicles");
  const [valuesStr, setValuesStr] = useState("");
  const [isRequired, setIsRequired] = useState(false);

  const handleOpenAdd = () => {
    setEditingAttr(null);
    setName("");
    setCategory("Vehicles");
    setValuesStr("");
    setIsRequired(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (a: AttributeItem) => {
    setEditingAttr(a);
    setName(a.name);
    setCategory(a.category);
    setValuesStr(a.values.join(", "));
    setIsRequired(a.is_required);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter attribute title");
      return;
    }

    const valArray = valuesStr
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    if (valArray.length === 0) {
      toast.error("Please provide at least one attribute value (comma separated)");
      return;
    }

    if (editingAttr) {
      setAttributes((prev) =>
        prev.map((a) =>
          a.id === editingAttr.id
            ? { ...a, name: name.trim(), category, values: valArray, is_required: isRequired }
            : a
        )
      );
      toast.success("Attribute updated!");
    } else {
      const newAttr: AttributeItem = {
        id: `attr-${Date.now()}`,
        name: name.trim(),
        category,
        values: valArray,
        is_required: isRequired,
      };
      setAttributes((prev) => [newAttr, ...prev]);
      toast.success("New product specification attribute created!");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete attribute "${name}"?`)) return;
    setAttributes((prev) => prev.filter((a) => a.id !== id));
    toast.success("Attribute deleted.");
  };

  const filtered = attributes.filter((a) => {
    const q = search.toLowerCase();
    return a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <ComingSoonBanner feature="Attributes" />
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Product Attributes & Specs
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Define dynamic specification attributes (Batteries, Motors, Solar capacities, Speeds)
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Attribute</span>
        </button>
      </div>

      {/* ── Search Bar ── */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search attributes by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* ── Attributes Grid / Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((attr) => (
          <div
            key={attr.id}
            className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-extrabold text-base text-stone-900 dark:text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                  <span>{attr.name}</span>
                </span>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  {attr.category}
                </span>
              </div>

              {/* Values Badges */}
              <div className="flex flex-wrap gap-1.5 mt-3.5">
                {attr.values.map((v, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/50"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span>{attr.values.length} standard options configured</span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(attr)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                  title="Edit Attribute"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(attr.id, attr.name)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Attribute"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Add / Edit Attribute Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/40">
              <h3 className="font-extrabold text-sm text-stone-900 dark:text-white">
                {editingAttr ? "Edit Attribute" : "Add Specification Attribute"}
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
                  Attribute Name / Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Battery Voltage & Capacity"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Category Scope
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Electric Scooters, Solar Inverters"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Attribute Options (Comma separated)
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="48V 20Ah, 60V 30Ah Graphene, 72V 32Ah Lithium"
                  value={valuesStr}
                  onChange={(e) => setValuesStr(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                />
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
                  {editingAttr ? "Save Changes" : "Create Attribute"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
