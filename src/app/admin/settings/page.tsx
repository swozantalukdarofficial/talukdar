"use client";

import { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Store,
  Truck,
  CreditCard,
  Save,
  Loader2,
  Shield,
  Phone,
  Mail,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Sliders,
  DollarSign
} from "lucide-react";
import { toast } from "sonner";
import { getStoreSettings, updateStoreSettings } from "@/lib/settings";
import { cn } from "@/lib/utils";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "payments" | "shipping" | "security">("general");

  // General Store Info
  const [storeName, setStoreName] = useState("EV Solution BD");
  const [supportEmail, setSupportEmail] = useState("support@evsolutionbd.com");
  const [supportPhone, setSupportPhone] = useState("01333600272");
  const [whatsappNumber, setWhatsappNumber] = useState("01333600272");

  // Shipping Fees
  const [shippingFee, setShippingFee] = useState(150);

  // Payment Methods
  const [enableCod, setEnableCod] = useState(true);
  const [enableBkash, setEnableBkash] = useState(true);
  const [enableNagad, setEnableNagad] = useState(true);
  const [bkashNumber, setBkashNumber] = useState("01333600272");
  const [nagadNumber, setNagadNumber] = useState("01333600272");

  useEffect(() => {
    async function loadSettings() {
      const data = await getStoreSettings();
      if (data) {
        setStoreName(data.store_name || "EV Solution BD");
        setSupportEmail(data.support_email || "support@evsolutionbd.com");
        setSupportPhone(data.support_phone || "01333600272");
        setWhatsappNumber(data.whatsapp_number || "01333600272");
        setShippingFee(data.shipping_fee || 150);
        setEnableCod(data.enable_cod ?? true);
        setEnableBkash(data.enable_bkash ?? true);
        setEnableNagad(data.enable_nagad ?? true);
        setBkashNumber(data.bkash_number || "01333600272");
        setNagadNumber(data.nagad_number || "01333600272");
      }
    }
    loadSettings();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await updateStoreSettings({
      store_name: storeName,
      support_email: supportEmail,
      support_phone: supportPhone,
      whatsapp_number: whatsappNumber,
      shipping_fee: shippingFee,
      enable_cod: enableCod,
      enable_bkash: enableBkash,
      enable_nagad: enableNagad,
      bkash_number: bkashNumber,
      nagad_number: nagadNumber,
    });

    if (error) {
      toast.error(`Failed to save settings: ${error}`);
    } else {
      toast.success("Store settings updated & published successfully!");
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Store Configuration
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Manage contact channels, delivery charges, and payment gateway accounts
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Changes</span>
        </button>
      </div>

      {/* ── Kachabazar Style Settings Tabs ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {[
          { id: "general", label: "Store Profile", icon: Store },
          { id: "payments", label: "Payment Gateways", icon: CreditCard },
          { id: "shipping", label: "Delivery & Shipping", icon: Truck },
          { id: "security", label: "Security & Access", icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer",
                activeTab === tab.id
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                  : "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Tab Content Card ── */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. General Profile Tab */}
        {activeTab === "general" && (
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-6 animate-in fade-in duration-150">
            <div>
              <h3 className="font-extrabold text-base text-stone-900 dark:text-white">
                Store Identity & Contact Information
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                These contact details appear in customer receipts, invoices, and the website footer
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  Store Display Name
                </label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-bold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  Official Support Email
                </label>
                <input
                  type="email"
                  required
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  Customer Care Hotline
                </label>
                <input
                  type="text"
                  required
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  WhatsApp Support Number
                </label>
                <input
                  type="text"
                  required
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. Payments Tab */}
        {activeTab === "payments" && (
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-6 animate-in fade-in duration-150">
            <div>
              <h3 className="font-extrabold text-base text-stone-900 dark:text-white">
                Payment Gateways & Merchant Numbers
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Enable or disable checkout payment methods and configure bKash/Nagad accounts
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Cash On Delivery */}
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-stone-900 dark:text-white text-sm">
                    Cash On Delivery (COD)
                  </h4>
                  <p className="text-stone-500 text-[11px] mt-0.5">
                    Allow customers to pay cash when product arrives at their doorstep
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={enableCod}
                  onChange={(e) => setEnableCod(e.target.checked)}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                />
              </div>

              {/* bKash */}
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-pink-600 text-sm">
                      bKash Payment
                    </h4>
                    <p className="text-stone-500 text-[11px] mt-0.5">
                      Accept bKash mobile wallet transfers during checkout
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableBkash}
                    onChange={(e) => setEnableBkash(e.target.checked)}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                  />
                </div>
                {enableBkash && (
                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                      bKash Merchant / Personal Wallet Number
                    </label>
                    <input
                      type="text"
                      value={bkashNumber}
                      onChange={(e) => setBkashNumber(e.target.value)}
                      className="w-full sm:w-80 px-3 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl"
                    />
                  </div>
                )}
              </div>

              {/* Nagad */}
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-orange-600 text-sm">
                      Nagad Payment
                    </h4>
                    <p className="text-stone-500 text-[11px] mt-0.5">
                      Accept Nagad mobile wallet transfers during checkout
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableNagad}
                    onChange={(e) => setEnableNagad(e.target.checked)}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                  />
                </div>
                {enableNagad && (
                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Nagad Merchant / Personal Wallet Number
                    </label>
                    <input
                      type="text"
                      value={nagadNumber}
                      onChange={(e) => setNagadNumber(e.target.value)}
                      className="w-full sm:w-80 px-3 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. Shipping Tab */}
        {activeTab === "shipping" && (
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-6 animate-in fade-in duration-150">
            <div>
              <h3 className="font-extrabold text-base text-stone-900 dark:text-white">
                Delivery Charges & Logistics
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Set standard delivery charges applied across the entire nationwide store
              </p>
            </div>

            <div className="max-w-md text-xs space-y-3">
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  Standard Nationwide Delivery Charge (BDT)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-stone-400">
                    ৳
                  </span>
                  <input
                    type="number"
                    min="0"
                    required
                    value={shippingFee}
                    onChange={(e) => setShippingFee(parseInt(e.target.value, 10) || 0)}
                    className="w-full pl-8 pr-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-bold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <p className="text-[11px] text-stone-400 mt-1">
                  Orders will automatically include this delivery fee unless free shipping coupon is applied.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. Security Tab */}
        {activeTab === "security" && (
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-6 animate-in fade-in duration-150">
            <div>
              <h3 className="font-extrabold text-base text-stone-900 dark:text-white">
                Admin Panel Security & Access
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Manage authenticated administrator email addresses and security policies
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/50 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-extrabold">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Super Admin Protection Active</span>
              </div>
              <p className="text-stone-600 dark:text-stone-300">
                Only authenticated emails configured in your Supabase admin role or environment variables have write-access to the product catalog and customer orders.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save & Publish All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
