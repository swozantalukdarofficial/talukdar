"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/products";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ProductActions({ id, slug }: { id: string; slug: string }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    setDeleting(true);
    const result = await deleteProduct(id);
    
    if ("error" in result) {
      toast.error("Failed to delete: " + result.error);
      setDeleting(false);
    } else {
      toast.success("Product deleted successfully");
      router.refresh();
    }
  }

  return (
    <div className="flex justify-end gap-2">
      <Link
        href={`/admin/products/edit/${id}`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-emerald-700 bg-stone-100 hover:bg-emerald-50 px-3 py-2 rounded-xl transition-colors"
      >
        <Pencil className="w-3.5 h-3.5" />
        Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 px-3 py-2 rounded-xl transition-colors disabled:opacity-50"
      >
        {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
        Delete
      </button>
    </div>
  );
}
