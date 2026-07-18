"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

interface OptionRow {
  name: string;
  price: string;
}

interface ProductOptionsManagerProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholderName?: string;
  placeholderPrice?: string;
}

export default function ProductOptionsManager({
  label,
  value,
  onChange,
  placeholderName = "e.g. Red / ONLY BODY",
  placeholderPrice = "120000",
}: ProductOptionsManagerProps) {
  const [rows, setRows] = useState<OptionRow[]>([]);

  // Parse string value into rows on initial load or reset
  useEffect(() => {
    if (!value) {
      setRows([{ name: "", price: "" }]);
      return;
    }

    const parsed = value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        // Try split by colon first
        if (line.includes(":")) {
          const idx = line.lastIndexOf(":");
          return {
            name: line.substring(0, idx).trim(),
            price: line.substring(idx + 1).trim(),
          };
        }
        // Try split by hyphen next
        if (line.includes("-")) {
          const idx = line.lastIndexOf("-");
          return {
            name: line.substring(0, idx).trim(),
            price: line.substring(idx + 1).trim(),
          };
        }
        return { name: line, price: "" };
      });

    setRows(parsed.length > 0 ? parsed : [{ name: "", price: "" }]);
  }, [value]);

  // Propagate local changes back to the parent string
  const handleRowsChange = (updatedRows: OptionRow[]) => {
    setRows(updatedRows);
    const serialized = updatedRows
      .filter((r) => r.name.trim())
      .map((r) => {
        const cleanPrice = r.price.replace(/[^\d.]/g, "").trim();
        return `${r.name.trim()}: ${cleanPrice || 0}`;
      })
      .join("\n");
    onChange(serialized);
  };

  const updateRow = (idx: number, field: keyof OptionRow, val: string) => {
    const updated = rows.map((row, i) =>
      i === idx ? { ...row, [field]: val } : row
    );
    handleRowsChange(updated);
  };

  const addRow = () => {
    handleRowsChange([...rows, { name: "", price: "" }]);
  };

  const removeRow = (idx: number) => {
    const updated = rows.filter((_, i) => i !== idx);
    handleRowsChange(updated.length > 0 ? updated : [{ name: "", price: "" }]);
  };

  return (
    <div className="space-y-3 bg-stone-50/50 p-4 rounded-xl border border-stone-200 shadow-sm">
      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wide">
          {label} List
        </label>
        <span className="text-[10px] text-stone-400 font-semibold uppercase">
          Automatic Save
        </span>
      </div>

      <div className="space-y-2">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-wider px-1">
          <div className="col-span-7">Option Name / Title</div>
          <div className="col-span-4">Price (৳ BDT)</div>
          <div className="col-span-1 text-center"></div>
        </div>

        {/* Rows */}
        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
          {rows.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 gap-2 items-center group transition-all"
            >
              <div className="col-span-7">
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => updateRow(idx, "name", e.target.value)}
                  placeholder={placeholderName}
                  className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-850 placeholder:text-stone-350 focus:outline-none focus:ring-1.5 focus:ring-emerald-700/20 focus:border-emerald-600 transition-colors shadow-inner-sm"
                />
              </div>
              <div className="col-span-4">
                <div className="relative flex items-center">
                  <span className="absolute left-2.5 text-[10px] font-bold text-stone-400">৳</span>
                  <input
                    type="text"
                    value={row.price}
                    onChange={(e) => updateRow(idx, "price", e.target.value)}
                    placeholder={placeholderPrice}
                    className="w-full bg-white border border-stone-200 rounded-lg pl-6 pr-2.5 py-1.5 text-xs text-stone-850 font-mono font-bold placeholder:text-stone-350 focus:outline-none focus:ring-1.5 focus:ring-emerald-700/20 focus:border-emerald-600 transition-colors shadow-inner-sm"
                  />
                </div>
              </div>
              <div className="col-span-1 flex justify-center">
                <button
                  type="button"
                  onClick={() => removeRow(idx)}
                  className="p-1.5 rounded-md hover:bg-rose-50 text-stone-400 hover:text-rose-600 transition-colors border-0 bg-transparent"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={addRow}
        className="flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-lg transition-all border border-emerald-250 shadow-sm"
      >
        <Plus className="w-3.5 h-3.5" /> Add New Row
      </button>
    </div>
  );
}
