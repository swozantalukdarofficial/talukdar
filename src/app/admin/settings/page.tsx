"use client";

import { useState, useEffect } from "react";
import { Settings as SettingsIcon, Store, Truck, CreditCard, Save, Loader2, Shield } from "lucide-react";
import { toast } from "sonner";
import { getStoreSettings, updateStoreSettings } from "@/lib/settings";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [storeName, setStoreName] = useState("EV Solution BD");
  const [supportEmail, setSupportEmail] = useState("support@evsolutionbd.com");
  const [supportPhone, setSupportPhone] = useState("01333600272");
  const [whatsappNumber, setWhatsappNumber] = useState("01333600272");
  const [shippingFee, setShippingFee] = useState(150);
  const [enableCod, setEnableCod] = useState(true);
  const [enableBkash, setEnableBkash] = useState(true);
  const [enableNagad, setEnableNagad] = useState(true);
  const [bkashNumber, setBkashNumber] = useState("01333600272");
  const [nagadNumber, setNagadNumber] = useState("01333600272");

  // Load from Supabase on mount
  useEffect(() => {
    async function loadSettings() {
      const data = await getStoreSettings();
      if (data) {
        setStoreName(data.store_name);
        setSupportEmail(data.support_email);
        setSupportPhone(data.support_phone);
        setWhatsappNumber(data.whatsapp_number);
        setShippingFee(data.shipping_fee);
        setEnableCod(data.enable_cod);
        setEnableBkash(data.enable_bkash);
        setEnableNagad(data.enable_nagad);
        setBkashNumber(data.bkash_number);
        setNagadNumber(data.nagad_number);
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
      toast.success("Settings saved successfully!");
    }
    setLoading(false);
  }


  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <SettingsIcon className="w-8 h-8 text-emerald-600 animate-spin-slow" />
            General Settings
          </h1>
          <p className="text-stone-500 mt-1">Configure your storefront branding, shipping parameters, and active gateways.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Store Details Card */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-stone-900">Branding & Contact Info</h2>
                <p className="text-xs text-stone-400">Manage how your store identity appears to customers.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-stone-500 mb-1.5 uppercase">Store Public Name</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-500 mb-1.5 uppercase">Support Email</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-500 mb-1.5 uppercase">Support Hotline</label>
                <input
                  type="text"
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-500 mb-1.5 uppercase">WhatsApp Number</label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Shipping Rules Card */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-stone-900">Shipping Fees</h2>
                <p className="text-xs text-stone-400">Configure standard delivery cost calculations.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-500 mb-1.5 uppercase">Flat Delivery Fee (৳)</label>
              <input
                type="number"
                value={shippingFee}
                onChange={(e) => setShippingFee(Number(e.target.value))}
                className="w-full md:w-64 bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
                min="0"
                required
              />
              <p className="text-[11px] text-stone-400 mt-1.5">This fee is automatically applied during the checkout process.</p>
            </div>
          </div>

          {/* Payment Gateways Card */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-stone-900">Payment Gateways</h2>
                <p className="text-xs text-stone-400">Toggle checkout payment methods visible to customers.</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* COD Toggle */}
              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-100">
                <div>
                  <h3 className="text-sm font-bold text-stone-800">Cash on Delivery (COD)</h3>
                  <p className="text-xs text-stone-400 mt-0.5">Allow buyers to pay cash at their doorstep upon delivery.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEnableCod(!enableCod)}
                  className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${enableCod ? "bg-emerald-500" : "bg-stone-300"}`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${enableCod ? "left-6" : "left-1"}`} />
                </button>
              </div>

              {/* bKash Toggle */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-stone-800">bKash Payment Gateway</h3>
                    <p className="text-xs text-stone-400 mt-0.5">Accept instant mobile payments using official bKash API.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEnableBkash(!enableBkash)}
                    className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${enableBkash ? "bg-emerald-500" : "bg-stone-300"}`}
                  >
                    <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${enableBkash ? "left-6" : "left-1"}`} />
                  </button>
                </div>
                {enableBkash && (
                  <div className="pt-3 border-t border-stone-200/60 animate-in fade-in duration-200">
                    <label className="block text-[11px] font-bold text-stone-500 mb-1.5 uppercase">bKash Merchant/Personal Number</label>
                    <input
                      type="text"
                      value={bkashNumber}
                      onChange={(e) => setBkashNumber(e.target.value)}
                      placeholder="e.g. 017XXXXXXXX"
                      className="w-full md:w-80 bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm font-medium"
                    />
                  </div>
                )}
              </div>

              {/* Nagad Toggle */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-stone-800">Nagad Payment Gateway</h3>
                    <p className="text-xs text-stone-400 mt-0.5">Accept instant mobile payments using Nagad API.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEnableNagad(!enableNagad)}
                    className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${enableNagad ? "bg-emerald-500" : "bg-stone-300"}`}
                  >
                    <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${enableNagad ? "left-6" : "left-1"}`} />
                  </button>
                </div>
                {enableNagad && (
                  <div className="pt-3 border-t border-stone-200/60 animate-in fade-in duration-200">
                    <label className="block text-[11px] font-bold text-stone-500 mb-1.5 uppercase">Nagad Merchant/Personal Number</label>
                    <input
                      type="text"
                      value={nagadNumber}
                      onChange={(e) => setNagadNumber(e.target.value)}
                      placeholder="e.g. 018XXXXXXXX"
                      className="w-full md:w-80 bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm font-medium"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2 text-stone-400 text-xs font-semibold">
              <Shield className="w-4 h-4 text-emerald-600" />
              Settings changes are applied globally.
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
