"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { adminFetch } from "@/lib/admin-api";
import { POSTS, type BlogPost } from "@/lib/blogs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Loader2,
  Trash2,
  RefreshCw,
  FileText,
  AlertCircle,
  ExternalLink,
  Edit,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    fetchDbBlogs();
  }, []);

  async function fetchDbBlogs() {
    setLoading(true);
    if (!supabase) {
      toast.error("Supabase is not configured!");
      setLoading(false);
      return;
    }

    try {
      const { blogs: rows } = await adminFetch<{ blogs: any[] }>(
        "/api/admin/blogs"
      );

      const mapped: BlogPost[] = (rows || []).map((blog) => ({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        category: blog.category,
        readTime: blog.read_time,
        image: blog.image,
        desc: blog.description,
        metaTitle: blog.meta_title,
        metaDesc: blog.meta_desc,
        content: blog.content,
        date: blog.date,
      }));

      setBlogs(mapped);
    } catch (err: any) {
      toast.error("Failed to load database blogs: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string | number, title: string) {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      if (!supabase) return;
      await adminFetch(`/api/admin/blogs/${id}`, { method: "DELETE" });

      toast.success("Blog deleted successfully! 🗑️");
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      toast.error("Delete failed: " + err.message);
    }
  }

  async function handleSync() {
    if (!supabase) return;
    setSyncing(true);
    toast.loading("Syncing static blogs to Supabase database...");

    try {
      let insertedCount = 0;

      const { blogs: existingRows } = await adminFetch<{
        blogs: { slug: string }[];
      }>("/api/admin/blogs");
      const existingSlugs = new Set((existingRows || []).map((b) => b.slug));

      for (const post of POSTS) {
        // Check if blog already exists by slug
        if (existingSlugs.has(post.slug)) continue;

        // Insert it
        await adminFetch("/api/admin/blogs", {
          method: "POST",
          body: JSON.stringify({
            title: post.title,
            category: post.category,
            read_time: post.readTime,
            image: post.image,
            slug: post.slug,
            description: post.desc,
            meta_title: post.metaTitle,
            meta_desc: post.metaDesc,
            content: post.content,
            date: post.date,
          }),
        });
        insertedCount++;
      }

      toast.dismiss();
      if (insertedCount > 0) {
        toast.success(`Successfully synced ${insertedCount} new blogs to the database! 🎉`);
      } else {
        toast.info("All static blogs are already synced to the database.");
      }
      fetchDbBlogs();
    } catch (err: any) {
      toast.dismiss();
      toast.error("Sync failed: " + err.message);
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
              <FileText className="w-6 h-6 text-teal-600" />
              Manage Blogs
            </h1>
            <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider mt-1">
              Add, update, or remove database-driven blog posts
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={handleSync}
              disabled={syncing || loading}
              variant="outline"
              className="bg-white border-stone-200 text-stone-700 font-bold hover:bg-stone-50 text-xs gap-1.5 h-10 rounded-xl"
            >
              {syncing ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5" />
              )}
              Sync Static Blogs
            </Button>

            <Link href="/admin/blogs/add">
              <Button className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs gap-1.5 h-10 rounded-xl border-0 shadow-sm shadow-emerald-700/10">
                <Plus className="w-4 h-4" />
                Add New Blog
              </Button>
            </Link>
          </div>
        </div>

        {/* Info Note */}
        <div className="p-4 bg-teal-50 border border-teal-100 rounded-2xl text-teal-900 text-xs font-semibold leading-relaxed flex gap-2">
          <AlertCircle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <div>
            <p>Database blogs will take precedence over local static posts. Use the <b>"Sync Static Blogs"</b> button to import your initial 9 blogs to Supabase with one click.</p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-16 flex items-center justify-center shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
              <p className="text-stone-500 text-xs font-bold uppercase tracking-wider">Loading Blogs...</p>
            </div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-16 text-center shadow-sm">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-12 h-12 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-center mx-auto text-stone-400">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-stone-900">No Database Blogs Yet</h3>
              <p className="text-xs text-stone-500 font-semibold leading-relaxed">
                Click "Sync Static Blogs" above to load the existing posts, or start from scratch by creating a custom post.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm shadow-stone-150/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                    <th className="py-3.5 px-4 w-20">Image</th>
                    <th className="py-3.5 px-4">Title & Slug</th>
                    <th className="py-3.5 px-4 w-32">Category</th>
                    <th className="py-3.5 px-4 w-28">Read Time</th>
                    <th className="py-3.5 px-4 w-28">Date</th>
                    <th className="py-3.5 px-4 w-24 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-stone-50/50 transition-colors text-xs font-semibold">
                      {/* Image */}
                      <td className="py-4 px-4">
                        <div className="relative w-12 aspect-[16/10] rounded-lg overflow-hidden bg-stone-100 border border-stone-200">
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            unoptimized={true}
                          />
                        </div>
                      </td>

                      {/* Title & Slug */}
                      <td className="py-4 px-4 max-w-sm">
                        <div className="text-stone-900 font-bold truncate" title={blog.title}>
                          {blog.title}
                        </div>
                        <div className="text-[10px] text-stone-400 font-medium truncate mt-0.5 flex items-center gap-1">
                          <span>{blog.slug}</span>
                          <Link href={`/blog/${blog.slug}`} target="_blank" className="hover:text-teal-600">
                            <ExternalLink className="w-2.5 h-2.5 inline" />
                          </Link>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="border-stone-200 bg-stone-50 text-stone-600 font-bold text-[10px] py-0.5">
                          {blog.category}
                        </Badge>
                      </td>

                      {/* Read Time */}
                      <td className="py-4 px-4 text-stone-500">
                        {blog.readTime}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-stone-500">
                        {blog.date}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right flex justify-end gap-1">
                        <Link
                          href={`/admin/blogs/edit/${blog.id}`}
                          className="p-2 text-stone-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors inline-flex items-center justify-center"
                          title="Edit Blog"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id, blog.title)}
                          className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border-0 bg-transparent inline-flex items-center justify-center cursor-pointer"
                          title="Delete Blog"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-stone-50 border-t border-stone-200 px-4 py-3 text-[10px] font-bold text-stone-400 uppercase tracking-wider flex justify-between items-center">
              <span>Showing {blogs.length} posts</span>
              <span>Supabase Managed</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
