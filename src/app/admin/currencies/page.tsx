"use client";

import { useState } from "react";
import {
  Coins,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  DollarSign,
  Search,
  Check,
  X,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import ComingSoonBanner from "@/components/admin/ComingSoonBanner";

interface CurrencyItem {
  id: string;
  name: string;
  code: string;
  symbol: string;
  rate: number;
  is_default: boolean;
  status: "Active" | "Inactive";
}

const DEFAULT_CURRENCIES: CurrencyItem[] = [
  {
    id: "cur-1",
    name: "Bangladeshi Taka",
    code: "BDT",
    symbol: "৳",
    rate: 1,
    is_default: true,
    status: "Active",
  },
  {
    id: "cur-2",
    name: "US Dollar",
    code: "USD",
    symbol: "$",
    rate: 0.0083,
    is_default: false,
    status: "Active",
  },
  {
    id: "cur-3",
    name: "Euro",
    code: "EUR",
    symbol: "€",
    rate: 0.0076,
    is_default: false,
    status: "Active",
  },
];

export default function AdminCurrenciesPage() {
  const [currencies, setCurrencies] = useState<CurrencyItem[]>(DEFAULT_CURRENCIES);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState<CurrencyItem | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [symbol, setSymbol] = useState("");
  const [rate, setRate] = useState("1");
  const [isDefault, setIsDefault] = useState(false);

  const handleOpenAdd = () => {
    setEditingCurrency(null);
    setName("");
    setCode("");
    setSymbol("");
    setRate("1");
    setIsDefault(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (c: CurrencyItem) => {
    setEditingCurrency(c);
    setName(c.name);
    setCode(c.code);
    setSymbol(c.symbol);
    setRate(String(c.rate));
    setIsDefault(c.is_default);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim() || !symbol.trim()) {
      toast.error("Please fill in all currency details");
      return;
    }

    const r = parseFloat(rate);
    if (isNaN(r) || r <= 0) {
      toast.error("Please enter a valid exchange rate");
      return;
    }

    if (editingCurrency) {
      setCurrencies((prev) =>
        prev.map((c) =>
          c.id === editingCurrency.id
            ? { ...c, name: name.trim(), code: code.toUpperCase().trim(), symbol: symbol.trim(), rate: r, is_default: isDefault }
            : isDefault ? { ...c, is_default: false } : c
        )
      );
      toast.success("Currency updated successfully!");
    } else {
      const newCur: CurrencyItem = {
        id: `cur-${Date.now()}`,
        name: name.trim(),
        code: code.toUpperCase().trim(),
        symbol: symbol.trim(),
        rate: r,
        is_default: isDefault,
        status: "Active",
      };
      setCurrencies((prev) => [
        ...(isDefault ? prev.map((c) => ({ ...c, is_default: false })) : prev),
        newCur,
      ]);
      toast.success("New currency created!");
    }
    setModalOpen(false);
  };

  const handleSetDefault = (id: string) => {
    setCurrencies((prev) =>
      prev.map((c) => ({ ...c, is_default: c.id === id }))
    );
    toast.success("Default store currency updated!");
  };

  const handleDelete = (id: string, name: string) => {
    if (currencies.length <= 1) {
      toast.error("Cannot delete the only currency");
      return;
    }
    setCurrencies((prev) => prev.filter((c) => c.id !== id));
    toast.success("Currency removed.");
  };

  const filtered = currencies.filter((c) => {
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <ComingSoonBanner feature="Currencies" />
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Currencies & Exchange Rates
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Configure default store currency, symbols, and automatic conversion multipliers
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Currency</span>
        </button>
      </div>

      {/* ── Currency Table (Kachabazar Style) ── */}
      <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/75 dark:bg-stone-800/40 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-12 text-center">Symbol</th>
                <th className="py-3.5 px-4">Currency Name</th>
                <th className="py-3.5 px-4">ISO Code</th>
                <th className="py-3.5 px-4">Exchange Rate (vs BDT)</th>
                <th className="py-3.5 px-4 text-center">Store Default</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {filtered.map((cur) => (
                <tr
                  key={cur.id}
                  className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors"
                >
                  <td className="py-3.5 px-4 text-center font-black text-lg text-emerald-600">
                    {cur.symbol}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-stone-900 dark:text-white">
                    {cur.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-stone-500">
                    {cur.code}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-stone-700 dark:text-stone-300">
                    1 BDT = {cur.rate} {cur.code}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {cur.is_default ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Default Currency
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSetDefault(cur.id)}
                        className="text-xs text-stone-400 hover:text-emerald-600 hover:underline font-bold"
                      >
                        Set Default
                      </button>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenEdit(cur)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {!cur.is_default && (
                        <button
                          onClick={() => handleDelete(cur.id, cur.name)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/40">
              <h3 className="font-extrabold text-sm text-stone-900 dark:text-white">
                {editingCurrency ? "Edit Currency" : "Add New Currency"}
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
                  Currency Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bangladeshi Taka"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Currency Code (ISO)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="BDT"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl uppercase font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Symbol
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="৳"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Exchange Rate (vs 1 BDT)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  required
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="cur-default"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <label htmlFor="cur-default" className="font-semibold text-stone-700 dark:text-stone-300 cursor-pointer">
                  Set as default primary store currency
                </label>
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
                  {editingCurrency ? "Save Changes" : "Create Currency"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
