"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { deleteCategory } from "@/lib/categories";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function CategoryActions({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this category?")) return;
    
    setIsDeleting(true);
    const { error } = await deleteCategory(id);
    if (error) {
      toast.error(error);
      setIsDeleting(false);
    } else {
      toast.success("Category deleted");
      router.refresh();
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(`/admin/categories/edit/${id}`)}
        className="h-8 px-2 text-stone-600 hover:text-emerald-600 hover:bg-emerald-50"
      >
        <Pencil className="w-4 h-4 mr-1.5" />
        <span className="text-xs font-semibold">Edit</span>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        disabled={isDeleting}
        className="h-8 px-2 text-stone-600 hover:text-rose-600 hover:bg-rose-50"
      >
        {isDeleting ? (
          <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
        ) : (
          <Trash2 className="w-4 h-4 mr-1.5" />
        )}
        <span className="text-xs font-semibold">Delete</span>
      </Button>
    </div>
  );
}
