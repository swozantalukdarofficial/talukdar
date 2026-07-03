"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Copy, ArrowRight, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function Footer() {
  const phone1 = "09638001122";
  const phone2 = "+880 9638 001122";

  function copyToClipboard(num: string) {
    navigator.clipboard.writeText(num);
    toast.success("Copied to clipboard!", {
      description: num,
    });
  }

  return (
    <footer className="relative bg-[#faf9f6] border-t border-stone-200/80 pt-16 pb-12 mt-20">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 mx-auto">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5 items-stretch pb-12 border-b border-stone-200/60">
          
          {/* Column 1: Brand & Socials (4 Cols) */}
          <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-2xl border border-stone-200/80 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black uppercase tracking-tight text-stone-900">
                TALUKDAR<span className="text-emerald-700"> EV</span>
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse mt-1" />
            </div>
            
            <p className="text-xs text-stone-500 leading-relaxed max-w-sm">
              Shop premium engineered electric bikes, smart scooters, and authentic parts. 
              Delivering modern, eco-friendly mobility solutions across Bangladesh.
            </p>

            {/* Social Buttons Matrix */}
            <div className="grid grid-cols-2 gap-2.5 max-w-[280px]">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-200 rounded-xl hover:border-stone-400 hover:shadow-sm transition-all group"
              >
                <svg className="w-4 h-4 text-blue-600 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
                <span className="text-[10px] font-bold text-stone-700">Facebook</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-200 rounded-xl hover:border-stone-400 hover:shadow-sm transition-all group"
              >
                <svg className="w-4 h-4 text-pink-600 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="text-[10px] font-bold text-stone-700">Instagram</span>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${phone1.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-200 rounded-xl hover:border-stone-400 hover:shadow-sm transition-all group"
              >
                <svg
                  className="w-4 h-4 text-emerald-600 group-hover:scale-105 transition-transform fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="text-[10px] font-bold text-stone-700">WhatsApp</span>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-200 rounded-xl hover:border-stone-400 hover:shadow-sm transition-all group"
              >
                <svg
                  className="w-4 h-4 text-stone-900 group-hover:scale-105 transition-transform fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.17.99 1.13 2.37 1.83 3.86 2.06v3.63c-1.67-.02-3.29-.54-4.66-1.5-.09-.06-.18-.13-.28-.2-.04.09-.07.19-.08.29-.02 4.41.02 8.81-.04 13.22-.09 1.76-.73 3.49-1.91 4.79-1.25 1.37-3.04 2.19-4.91 2.34-2.31.18-4.71-.58-6.42-2.17-1.84-1.7-2.73-4.32-2.3-6.8 0.38-2.2 1.83-4.17 3.91-4.94 1.25-.47 2.62-.51 3.9-.17.02 1.34.01 2.67.01 4.01-.89-.25-1.86-.14-2.66.36-.88.54-1.42 1.51-1.44 2.54-.03 1.31.78 2.57 2.01 3.02 1 .37 2.15.15 2.94-.55.67-.6 1.01-1.48 1.01-2.37 0-3.66.01-7.32-.01-10.99 0-3.67.01-7.33-.01-11zm0 0" />
                </svg>
                <span className="text-[10px] font-bold text-stone-700">TikTok</span>
              </a>
            </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 Cols) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] flex flex-col space-y-5">
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-stone-600 font-semibold">
              <li>
                <Link href="/" className="hover:text-emerald-850 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-emerald-850 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-850 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-850 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/emi-policy" className="hover:text-emerald-850 transition-colors">
                  EMI Policy
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-emerald-850 transition-colors">
                  Return & Refund
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-850 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-emerald-850 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Collections (2 Cols) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] flex flex-col space-y-5">
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Collections
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-stone-600 font-semibold">
              <li>
                <Link href="/products?category=ebike" className="hover:text-emerald-850 transition-colors">
                  Electric Bikes
                </Link>
              </li>
              <li>
                <Link href="/products?category=ebike" className="hover:text-emerald-850 transition-colors">
                  Smart Scooters
                </Link>
              </li>
              <li>
                <Link href="/products?category=battery" className="hover:text-emerald-850 transition-colors">
                  Graphene Batteries
                </Link>
              </li>
              <li>
                <Link href="/products?category=parts" className="hover:text-emerald-850 transition-colors">
                  Lithium Chargers
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="hover:text-emerald-850 transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-emerald-850 transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location (2 Cols) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] flex flex-col space-y-5">
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Contact & Location
            </h4>
            <div className="space-y-4">
              <div className="flex gap-2 text-stone-600">
                <MapPin className="w-4 h-4 mt-0.5 text-stone-400 flex-shrink-0" />
                <p className="text-[10px] leading-relaxed">
                  Suite 402, Floor 4, Pragati Sarani, Gulshan-Badda Link Road, Dhaka, Bangladesh.
                </p>
              </div>

              {/* Copyable Phone Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => copyToClipboard(phone1)}
                  className="w-full flex items-center justify-between p-2.5 bg-white border border-stone-200 hover:border-stone-400 hover:shadow-sm rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 transition-colors" />
                    <span className="text-[9px] font-bold text-stone-700">{phone1}</span>
                  </div>
                  <Copy className="w-3 h-3 text-stone-300 group-hover:text-stone-500 transition-colors" />
                </button>

                <button
                  onClick={() => copyToClipboard(phone2)}
                  className="w-full flex items-center justify-between p-2.5 bg-white border border-stone-200 hover:border-stone-400 hover:shadow-sm rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 transition-colors" />
                    <span className="text-[9px] font-bold text-stone-700">{phone2}</span>
                  </div>
                  <Copy className="w-3 h-3 text-stone-300 group-hover:text-stone-500 transition-colors" />
                </button>
              </div>
            </div>
          </div>

          {/* Column 5: Map & Newsletter (2 Cols) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] flex flex-col space-y-5">
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Location Map
            </h4>
            <div className="space-y-4">
              {/* Map Screenshot/Card */}
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-[4/3] rounded-xl overflow-hidden border border-stone-200 group shadow-sm"
              >
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400"
                  alt="Gulshan Dhaka Map Grid"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 filter saturate-50"
                  sizes="200px"
                />
                <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-2 left-2 bg-white/95 px-2 py-0.5 rounded text-[8px] font-extrabold text-stone-800 shadow-sm border border-stone-100 flex items-center gap-1">
                  <span>Maps</span>
                  <span className="text-stone-400">↗</span>
                </div>
              </a>

              {/* Newsletter Field */}
              <div className="relative flex items-center bg-white border border-stone-200 focus-within:border-stone-400 rounded-xl overflow-hidden px-2 shadow-sm transition-all">
                <input
                  type="email"
                  placeholder="Newsletter Email"
                  className="w-full bg-transparent border-0 text-[10px] py-2 px-1 focus:ring-0 focus:outline-none placeholder-stone-400 font-medium"
                />
                <button className="p-1 text-stone-400 hover:text-emerald-700 transition-colors border-0 bg-transparent cursor-pointer">
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-stone-400 font-semibold gap-4">
          <p>© {new Date().getFullYear()} Talukdar EV. All rights reserved.</p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/privacy-policy" className="hover:text-stone-650 transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-stone-650 transition-colors">Terms of Service</Link>
            <Link href="/emi-policy" className="hover:text-stone-650 transition-colors">EMI Policy</Link>
            <Link href="/return-policy" className="hover:text-stone-650 transition-colors">Return Policy</Link>
          </div>
        </div>
      </div>

      {/* Floating Orange Chat Button */}
      <a
        href={`https://wa.me/${phone1.replace(/[^0-9]/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#ff5c00] hover:bg-[#e05100] text-white rounded-full shadow-lg shadow-[#ff5c00]/25 flex items-center justify-center transition-all hover:scale-105 z-50 border-0"
      >
        <MessageSquare className="w-5 h-5 fill-white" />
      </a>
    </footer>
  );
}
