"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { placeOrder } from "@/lib/products";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import {
  Truck,
  Wallet,
  CheckCircle,
  Loader2,
  ArrowLeft,
  Phone,
} from "lucide-react";
import Link from "next/link";
import type { PaymentMethod, OrderPayload } from "@/lib/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PAYMENT_METHODS: {
  id: PaymentMethod;
  label: string;
  icon: string;
  desc: string;
}[] = [
  {
    id: "cod",
    label: "Cash on Delivery",
    icon: "💵",
    desc: "Pay when you receive",
  },
  {
    id: "bkash",
    label: "bKash",
    icon: "🟣",
    desc: "Mobile banking",
  },
  {
    id: "nagad",
    label: "Nagad",
    icon: "🟠",
    desc: "Mobile banking",
  },
  {
    id: "card",
    label: "Card",
    icon: "💳",
    desc: "Visa / Mastercard",
  },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  district: string;
  zip: string;
  notes: string;
  paymentNumber: string;
  trxId: string;
}

const INITIAL: FormData = {
  name: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  district: "",
  zip: "",
  notes: "",
  paymentNumber: "",
  trxId: "",
};

const DISTRICTS = [
  "Bagerhat", "Bandarban", "Barguna", "Barisal", "Bhola", "Bogra", "Brahmanbaria",
  "Chandpur", "Chapainawabganj", "Chittagong", "Chuadanga", "Comilla", "Cox's Bazar",
  "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj",
  "Habiganj", "Jamalpur", "Jessore", "Jhalokati", "Jhenaidah", "Joypurhat",
  "Khagrachari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur",
  "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar",
  "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi",
  "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh",
  "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur",
  "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet",
  "Tangail", "Thakurgaon"
];

export default function CheckoutPage() {
  const { items, totalPrice, dispatch } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<FormData>(INITIAL);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPaymentModal, setShowPaymentModal] = useState<"bkash" | "nagad" | null>(null);
  const [bkashNumber, setBkashNumber] = useState("01333600272");
  const [nagadNumber, setNagadNumber] = useState("01333600272");

  useEffect(() => {
    const savedBkash = localStorage.getItem("ev_bkash_number");
    const savedNagad = localStorage.getItem("ev_nagad_number");
    if (savedBkash) setBkashNumber(savedBkash);
    if (savedNagad) setNagadNumber(savedNagad);
  }, []);

  const subtotal = totalPrice;
  const shippingFee = 150;
  const total = subtotal + shippingFee;

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validateBasic(): boolean {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim() || !form.email.includes("@"))
      newErrors.email = "Valid email required";
    if (!form.phone.trim() || form.phone.length < 11)
      newErrors.phone = "Valid phone number required (11 digits)";
    if (!form.street.trim()) newErrors.street = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.district) newErrors.district = "District is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validatePayment(): boolean {
    const newErrors: Partial<FormData> = {};
    if (!form.paymentNumber.trim()) newErrors.paymentNumber = "Payment mobile number is required";
    if (!form.trxId.trim()) newErrors.trxId = "Transaction ID is required";
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateBasic()) return;
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (paymentMethod === "bkash" || paymentMethod === "nagad") {
      setShowPaymentModal(paymentMethod);
    } else {
      submitOrder();
    }
  }

  async function submitOrder() {
    setLoading(true);

    const payload: OrderPayload = {
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: {
          street: form.street,
          city: form.city,
          district: form.district,
          zip: form.zip,
        },
      },
      items: items.map(({ product, quantity }: CartItem) => ({
        productId: product.id,
        name: product.name,
        imageUrl: product.image_url,
        price: product.price,
        quantity,
      })),
      paymentMethod,
      notes: (paymentMethod === "bkash" || paymentMethod === "nagad") 
        ? `${form.notes ? form.notes + "\n" : ""}Payment Number: ${form.paymentNumber}\nTrxID: ${form.trxId}`
        : form.notes || undefined,
    };

    const result = await placeOrder(payload);

    if ("error" in result) {
      toast.error("Order failed: " + result.error);
      setLoading(false);
      return;
    }

    // Clear cart and redirect to success
    dispatch({ type: "CLEAR_CART" });
    router.push(`/order-success?id=${result.orderId}`);
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#faf9f6] pt-24 flex items-center justify-center">
        <div className="text-center bg-white border border-stone-200 rounded-2xl p-8 max-w-sm shadow-md">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-stone-900 mb-1">Your Cart is Empty</h2>
          <p className="text-stone-500 text-sm mb-6">Add some products first before check out.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-800 shadow-md shadow-emerald-700/10 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] pt-0">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/products"
            className="text-stone-400 hover:text-stone-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* ── Left: Form ── */}
            <div className="lg:col-span-3 space-y-6">
              {/* Customer info */}
              <Section title="Customer Information" icon={<Phone className="w-4 h-4 text-emerald-850" />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Full Name *"
                    id="name"
                    value={form.name}
                    onChange={(v) => update("name", v)}
                    error={errors.name}
                    placeholder="আপনার নাম"
                  />
                  <Field
                    label="Phone *"
                    id="phone"
                    value={form.phone}
                    onChange={(v) => update("phone", v)}
                    error={errors.phone}
                    placeholder="01XXXXXXXXX"
                    type="tel"
                  />
                </div>
                <Field
                  label="Email *"
                  id="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  error={errors.email}
                  placeholder="email@example.com"
                  type="email"
                />
              </Section>

              {/* Shipping */}
              <Section title="Shipping Address" icon={<Truck className="w-4 h-4 text-emerald-850" />}>
                <Field
                  label="Street Address *"
                  id="street"
                  value={form.street}
                  onChange={(v) => update("street", v)}
                  error={errors.street}
                  placeholder="বাড়ি নং, রোড, এলাকা"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="City *"
                    id="city"
                    value={form.city}
                    onChange={(v) => update("city", v)}
                    error={errors.city}
                    placeholder="Dhaka"
                  />
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="district"
                      className="text-xs font-bold text-stone-700 uppercase tracking-wide"
                    >
                      District *
                    </label>
                    <select
                      id="district"
                      value={form.district}
                      onChange={(e) => update("district", e.target.value)}
                      className={cn(
                        "bg-stone-50 border rounded-xl px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 transition-all",
                        errors.district ? "border-rose-500" : "border-stone-200"
                      )}
                    >
                      <option value="">Select</option>
                      {DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <span className="text-[11px] font-semibold text-rose-600 mt-1">
                        {errors.district}
                      </span>
                    )}
                  </div>

                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="notes"
                    className="text-xs font-bold text-stone-700 uppercase tracking-wide"
                  >
                    Order Notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    rows={2}
                    placeholder="Instructions for courier..."
                    className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 transition-all resize-none"
                  />
                </div>
              </Section>

              {/* Payment */}
              <Section title="Payment Method" icon={<Wallet className="w-4 h-4 text-emerald-850" />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => {
                        if (method.id === "bkash" || method.id === "nagad") {
                          if (!validateBasic()) {
                            toast.error("Please fill out your delivery details first.");
                            return;
                          }
                          setPaymentMethod(method.id);
                          setShowPaymentModal(method.id);
                        } else {
                          setPaymentMethod(method.id);
                        }
                      }}
                      className={cn(
                        "flex items-center gap-3.5 p-3.5 rounded-xl border-2 text-left transition-all",
                        paymentMethod === method.id
                          ? "border-emerald-600 bg-emerald-50/50"
                          : "border-stone-250/70 hover:border-stone-300 bg-white"
                      )}
                    >
                      {method.id === "bkash" ? (
                        <div className="w-8 h-8 rounded shrink-0 bg-white shadow-sm flex items-center justify-center p-0.5">
                          <img src="/bkash.png" alt="bKash" className="w-full h-full object-contain" />
                        </div>
                      ) : method.id === "nagad" ? (
                        <div className="w-8 h-8 rounded shrink-0 bg-white shadow-sm flex items-center justify-center p-0.5">
                          <img src="/nagad.png" alt="Nagad" className="w-full h-full object-contain" />
                        </div>
                      ) : (
                        <span className="text-2xl filter drop-shadow-sm shrink-0 w-8 text-center">{method.icon}</span>
                      )}
                      <div>
                        <div className="text-sm font-bold text-stone-900">
                          {method.label}
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">{method.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                 {paymentMethod === "bkash" && (
                  <div className="mt-3 text-xs text-stone-550 flex items-center justify-between bg-stone-50 p-2.5 rounded-lg border border-stone-200 animate-fade-in">
                    <span>Pay via bKash to <strong>{bkashNumber}</strong></span>
                    <button
                      type="button"
                      onClick={() => {
                        if (!validateBasic()) {
                          toast.error("Please fill out your delivery details first.");
                          return;
                        }
                        setShowPaymentModal("bkash");
                      }}
                      className="text-pink-600 font-bold hover:underline"
                    >
                      Enter TrxID / Pay Now
                    </button>
                  </div>
                )}
                {paymentMethod === "nagad" && (
                  <div className="mt-3 text-xs text-stone-550 flex items-center justify-between bg-stone-50 p-2.5 rounded-lg border border-stone-200 animate-fade-in">
                    <span>Pay via Nagad to <strong>{nagadNumber}</strong></span>
                    <button
                      type="button"
                      onClick={() => {
                        if (!validateBasic()) {
                          toast.error("Please fill out your delivery details first.");
                          return;
                        }
                        setShowPaymentModal("nagad");
                      }}
                      className="text-orange-600 font-bold hover:underline"
                    >
                      Enter TrxID / Pay Now
                    </button>
                  </div>
                )}


              </Section>
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sticky top-24 shadow-sm shadow-stone-150/40">
                <h3 className="font-extrabold text-stone-900 text-lg mb-4 tracking-tight">
                  Order Summary
                </h3>

                {/* Items */}
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {items.map((item: CartItem) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 pb-2 border-b border-stone-100"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-50 border border-stone-150 shrink-0">
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-stone-850 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[10px] text-stone-400 mt-0.5">
                          ৳{item.product.price.toLocaleString("en-BD")} × {item.quantity}
                        </p>
                      </div>
                      <p className="text-xs font-extrabold text-emerald-850 shrink-0">
                        ৳{(item.product.price * item.quantity).toLocaleString("en-BD")}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2.5 text-xs pt-4">
                  <div className="flex justify-between text-stone-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-800">৳{subtotal.toLocaleString("en-BD")}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Shipping</span>
                    <span className="flex items-center gap-1 font-semibold text-stone-800">
                      <Truck className="w-3.5 h-3.5 text-stone-400" />
                      ৳{shippingFee}
                    </span>
                  </div>
                  <Separator className="bg-stone-100" />
                  <div className="flex justify-between text-stone-900 text-base font-extrabold pt-1">
                    <span>Total</span>
                    <span className="text-emerald-850">
                      ৳{total.toLocaleString("en-BD")}
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-emerald-700 hover:bg-emerald-800 text-white font-bold h-12 text-sm gap-2 rounded-xl shadow-md shadow-emerald-700/10 border-0"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {paymentMethod === "bkash" || paymentMethod === "nagad" ? (
                        <>Proceed to Payment · ৳{total.toLocaleString("en-BD")}</>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Place Order · ৳{total.toLocaleString("en-BD")}
                        </>
                      )}
                    </>
                  )}
                </Button>

                <p className="text-[10px] text-stone-400 text-center mt-3">
                  🔒 Your checkout session is fully encrypted & secure
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Payment Instruction Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className={cn(
              "p-6 text-white text-center relative",
              showPaymentModal === "bkash" ? "bg-[#e2136e]" : "bg-[#f7941d]"
            )}>
              <button 
                onClick={() => setShowPaymentModal(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/10 hover:bg-black/20 rounded-full transition-colors text-white"
              >
                ✕
              </button>
              <div className="w-16 h-16 mx-auto bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm p-1.5 border-2 border-white/20">
                {showPaymentModal === "bkash" ? (
                  <img src="/bkash.png" alt="bKash" className="w-full h-full object-contain" />
                ) : (
                  <img src="/nagad.png" alt="Nagad" className="w-full h-full object-contain" />
                )}
              </div>
              <h3 className="text-xl font-extrabold mb-1">
                {showPaymentModal === "bkash" ? "bKash Payment" : "Nagad Payment"}
              </h3>
              <p className="text-white/90 text-sm font-medium">Please follow the instructions below</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                <p className="text-sm text-stone-700">Go to your {showPaymentModal === "bkash" ? "bKash" : "Nagad"} app and select <strong>Send Money</strong> or <strong>Payment</strong>.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                <p className="text-sm text-stone-700">Enter our merchant number: <strong className={showPaymentModal === "bkash" ? "text-[#e2136e] text-base" : "text-[#f7941d] text-base"}>{showPaymentModal === "bkash" ? bkashNumber : nagadNumber}</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                <p className="text-sm text-stone-700">Enter the total amount: <strong>৳{total.toLocaleString("en-BD")}</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</div>
                <p className="text-sm text-stone-700">Use your phone number as the <strong>Reference</strong>.</p>
              </div>
              
              <div className="pt-2 border-t border-stone-100 mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 mb-4 text-left">
                  <Field
                    label={`${showPaymentModal === "bkash" ? "bKash" : "Nagad"} Number *`}
                    id="paymentNumber"
                    value={form.paymentNumber}
                    onChange={(v) => update("paymentNumber", v)}
                    error={errors.paymentNumber}
                    placeholder="01XXXXXXXXX"
                    type="tel"
                  />
                  <Field
                    label="Transaction ID (TrxID) *"
                    id="trxId"
                    value={form.trxId}
                    onChange={(v) => update("trxId", v)}
                    error={errors.trxId}
                    placeholder="9XXXXXXX"
                  />
                </div>
                <Button 
                  onClick={() => {
                    if (validatePayment()) {
                      submitOrder();
                    }
                  }}
                  type="button"
                  disabled={loading}
                  className={cn(
                    "w-full text-white rounded-xl h-12 font-bold border-0 flex items-center justify-center gap-2",
                    showPaymentModal === "bkash" ? "bg-[#e2136e] hover:bg-[#c40e5d]" : "bg-[#f7941d] hover:bg-[#d67f18]"
                  )}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                  Confirm & Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// ── Reusable Field component ──────────────────────────────────────
function Field({
  label,
  id,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-bold text-stone-700 uppercase tracking-wide">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "bg-stone-50 border rounded-xl px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 transition-all",
          error ? "border-rose-500" : "border-stone-200"
        )}
      />
      {error && <span className="text-[11px] font-semibold text-rose-600 mt-1">{error}</span>}
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────
function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-stone-200/80 rounded-2xl p-6 space-y-4 shadow-sm shadow-stone-100/50">
      <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
        {icon}
        <h2 className="font-extrabold text-stone-900 tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  );
}
