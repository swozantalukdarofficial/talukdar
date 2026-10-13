"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Tag,
  FileText,
  Settings,
  User,
  Bell,
  Plus,
  Package,
  Layers,
  Globe,
  Store,
  Search,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Command {
  label: string;
  keywords: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  group: string;
}

const COMMANDS: Command[] = [
  { label: "Dashboard", keywords: "home overview stats", href: "/admin", icon: LayoutDashboard, group: "Go to" },
  { label: "Orders", keywords: "sales purchases invoices", href: "/admin/orders", icon: ShoppingBag, group: "Go to" },
  { label: "Products", keywords: "catalog items inventory", href: "/admin/products", icon: Package, group: "Go to" },
  { label: "Customers", keywords: "buyers users clients", href: "/admin/customers", icon: Users, group: "Go to" },
  { label: "Categories", keywords: "catalog groups", href: "/admin/categories", icon: Layers, group: "Go to" },
  { label: "Coupons", keywords: "discounts vouchers promo", href: "/admin/coupons", icon: Tag, group: "Go to" },
  { label: "Blogs", keywords: "articles posts content", href: "/admin/blogs", icon: FileText, group: "Go to" },
  { label: "Our Staff", keywords: "team members employees", href: "/admin/staff", icon: User, group: "Go to" },
  { label: "Notifications", keywords: "alerts inbox", href: "/admin/notifications", icon: Bell, group: "Go to" },
  { label: "Settings", keywords: "config store preferences", href: "/admin/settings", icon: Settings, group: "Go to" },
  { label: "Languages", keywords: "locale translation international", href: "/admin/languages", icon: Globe, group: "Go to" },
  { label: "Currencies", keywords: "money exchange international", href: "/admin/currencies", icon: Globe, group: "Go to" },
  { label: "Attributes", keywords: "catalog fields options", href: "/admin/attributes", icon: Layers, group: "Go to" },
  { label: "Store Customization", keywords: "homepage theme design seo", href: "/admin/store-customization", icon: Store, group: "Go to" },
  { label: "My Profile", keywords: "account password", href: "/admin/profile", icon: User, group: "Go to" },
  { label: "View Store", keywords: "storefront website live", href: "/", icon: Store, group: "Go to" },
  { label: "Add product", keywords: "new create product", href: "/admin/products/add", icon: Plus, group: "Quick actions" },
  { label: "Add blog post", keywords: "new create article", href: "/admin/blogs/add", icon: Plus, group: "Quick actions" },
  { label: "Add coupon", keywords: "new create discount", href: "/admin/coupons", icon: Plus, group: "Quick actions" },
  { label: "View low stock", keywords: "inventory alert restock", href: "/admin/products", icon: AlertTriangle, group: "Quick actions" },
];

/** Simple fuzzy score: higher = better match. -1 = no match. */
function fuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase();
  if (!q) return 0;
  if (t.includes(q)) return 100 - t.indexOf(q); // substring beats scattered
  let qi = 0;
  let score = 0;
  let lastMatch = -1;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) {
      score += lastMatch === i - 1 ? 2 : 1; // bonus for consecutive
      lastMatch = i;
      qi++;
    }
  }
  return qi === q.length ? score : -1;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const results = useMemo(() => {
    return COMMANDS.map((c) => ({
      cmd: c,
      score: fuzzyScore(query, `${c.label} ${c.keywords}`),
    }))
      .filter((r) => r.score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((r) => r.cmd);
  }, [query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  // Global hotkey: Ctrl+K / Cmd+K, plus programmatic open via event
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    function onOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
  }, [open ]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function go(href: string) {
    close();
    router.push(href);
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[active]) go(results[active].href);
    } else if (e.key === "Escape") {
      close();
    }
  }

  if (!open) return null;

  let lastGroup = "";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh] bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 border-b border-stone-100 dark:border-stone-800">
          <Search className="w-4 h-4 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Type a command or search…"
            className="flex-1 py-4 bg-transparent text-sm text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none"
            aria-label="Search commands"
          />
          <kbd className="hidden sm:inline-block text-[10px] font-bold text-stone-400 bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-10 text-center text-xs text-stone-400">
              No matches for “{query}”
            </div>
          ) : (
            results.map((cmd, i) => {
              const showGroup = cmd.group !== lastGroup;
              lastGroup = cmd.group;
              const Icon = cmd.icon;
              return (
                <div key={cmd.href + cmd.label}>
                  {showGroup && (
                    <div className="px-3 pt-3 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-stone-400">
                      {cmd.group}
                    </div>
                  )}
                  <button
                    data-index={i}
                    onClick={() => go(cmd.href)}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors cursor-pointer",
                      i === active
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200"
                        : "text-stone-700 dark:text-stone-300"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-stone-400" />
                    <span className="font-semibold flex-1 text-left">{cmd.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer hint */}
        <div className="hidden sm:flex items-center gap-4 px-4 py-2.5 border-t border-stone-100 dark:border-stone-800 text-[10px] text-stone-400">
          <span><kbd className="font-bold bg-stone-100 dark:bg-stone-800 px-1 rounded">↑↓</kbd> navigate</span>
          <span><kbd className="font-bold bg-stone-100 dark:bg-stone-800 px-1 rounded">↵</kbd> select</span>
          <span><kbd className="font-bold bg-stone-100 dark:bg-stone-800 px-1 rounded">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
