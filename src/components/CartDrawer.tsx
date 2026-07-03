"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-full sm:w-96 bg-white border-l border-stone-200 text-stone-900 flex flex-col p-0"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b border-stone-200">
          <SheetTitle className="text-stone-900 flex items-center gap-2 font-bold tracking-tight">
            <ShoppingBag className="h-5 w-5 text-emerald-700" />
            Shopping Cart
            {totalItems > 0 && (
              <span className="ml-1 text-sm font-normal text-stone-400">
                ({totalItems} item{totalItems !== 1 ? "s" : ""})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="rounded-full bg-stone-50 border border-stone-100 p-6">
                <ShoppingBag className="h-10 w-10 text-stone-300" />
              </div>
              <p className="text-stone-500 text-sm font-medium">Your cart is empty</p>
              <Button
                variant="outline"
                size="sm"
                onClick={closeCart}
                className="border-stone-300 text-stone-700 hover:bg-stone-50"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200/60"
                >
                  {/* Image */}
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-stone-100">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-stone-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-[10px] text-stone-400 capitalize">
                      {product.category}
                    </p>
                    <p className="text-xs font-bold text-emerald-800 mt-1">
                      ৳{(product.price * quantity).toLocaleString("en-BD")}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-md bg-stone-200/50 hover:bg-stone-200 text-stone-700 border-0"
                        onClick={() =>
                          updateQuantity(product.id, quantity - 1)
                        }
                      >
                        <Minus className="h-2.5 w-2.5" />
                      </Button>
                      <span className="text-xs font-semibold w-5 text-center">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-md bg-stone-200/50 hover:bg-stone-200 text-stone-700 border-0"
                        onClick={() =>
                          updateQuantity(product.id, quantity + 1)
                        }
                      >
                        <Plus className="h-2.5 w-2.5" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-md ml-auto text-stone-400 hover:text-red-600 hover:bg-red-50 border-0"
                        onClick={() => removeItem(product.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-stone-200 space-y-4 bg-stone-50/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Subtotal</span>
              <span className="text-lg font-bold text-stone-900">
                ৳{totalPrice.toLocaleString("en-BD")}
              </span>
            </div>
            <p className="text-[10px] text-stone-400 leading-normal">
              Delivery charges and taxes are calculated at step. Next checkout.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white font-semibold h-11 text-sm rounded-xl shadow-md shadow-emerald-700/10 transition-all"
            >
              Proceed to Checkout · ৳{totalPrice.toLocaleString("en-BD")}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-stone-400 hover:text-red-600 hover:bg-transparent text-xs py-0 h-auto border-0"
              onClick={clearCart}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear entire cart
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
