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
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "scheduled">("all");

  useEffect(() => {
    fetchDbBlogs();
  }, []);

  /** Display state for the admin list: draft / scheduled / published */
  function displayStatus(b: BlogPost): "draft" | "scheduled" | "published" {
    if ((b.status || "published") === "draft") return "draft";
    if (b.published_at && new Date(b.published_at) > new Date()) return "scheduled";
    return "published";
  }

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
        status: (blog.status as "draft" | "published") || "published",
        published_at: blog.published_at || null,
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900 dark:text-white tracking-tight flex items-center gap-2">
              <FileText className="w-6 h-6 text-teal-600" />
              Manage Blogs
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-xs font-semibold uppercase tracking-wider mt-1">
              Add, update, or remove database-driven blog posts
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={handleSync}
              disabled={syncing || loading}
              variant="outline"
              className="bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 font-bold hover:bg-stone-50 dark:hover:bg-stone-800 text-xs gap-1.5 h-10 rounded-xl"
            >
              {syncing ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5" />
              )}
              Sync Static Blogs
            </Button>

            <Link href="/admin/blogs/add">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 h-10 rounded-xl border-0 shadow-sm shadow-emerald-600/20">
                <Plus className="w-4 h-4" />
                Add New Blog
              </Button>
            </Link>
          </div>
        </div>

        {/* Info Note */}
        <div className="p-4 bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900 rounded-2xl text-teal-900 dark:text-teal-200 text-xs font-semibold leading-relaxed flex gap-2">
          <AlertCircle className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0 mt-0.5" />
          <div>
            <p>Database blogs will take precedence over local static posts. Use the <b>"Sync Static Blogs"</b> button to import your initial 9 blogs to Supabase with one click.</p>
          </div>
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2 flex-wrap">
          {(
            [
              { key: "all", label: "All" },
              { key: "published", label: "Published" },
              { key: "scheduled", label: "Scheduled" },
              { key: "draft", label: "Drafts" },
            ] as const
          ).map((f) => {
            const count =
              f.key === "all"
                ? blogs.length
                : blogs.filter((b) => displayStatus(b) === f.key).length;
            const active = statusFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setStatusFilter(f.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                  active
                    ? "bg-stone-900 text-white border-stone-900"
                    : "bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-500"
                }`}
              >
                {f.label}
                <span
                  className={`ml-1.5 text-[10px] font-extrabold ${active ? "text-stone-300" : "text-stone-400 dark:text-stone-500"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-16 flex items-center justify-center shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
              <p className="text-stone-500 dark:text-stone-400 text-xs font-bold uppercase tracking-wider">Loading Blogs...</p>
            </div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-16 text-center shadow-sm">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-12 h-12 bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 flex items-center justify-center mx-auto text-stone-400 dark:text-stone-500">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-stone-900 dark:text-white">No Database Blogs Yet</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold leading-relaxed">
                Click "Sync Static Blogs" above to load the existing posts, or start from scratch by creating a custom post.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                    <th className="py-3.5 px-4 w-20">Image</th>
                    <th className="py-3.5 px-4">Title & Slug</th>
                    <th className="py-3.5 px-4 w-32">Category</th>
                    <th className="py-3.5 px-4 w-28">Status</th>
                    <th className="py-3.5 px-4 w-28">Date</th>
                    <th className="py-3.5 px-4 w-24 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                  {blogs
                    .filter((b) => statusFilter === "all" || displayStatus(b) === statusFilter)
                    .map((blog) => {
                      const st = displayStatus(blog);
                      return (
                      <tr key={blog.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/40 transition-colors text-xs font-semibold">
                      {/* Image */}
                      <td className="py-4 px-4">
                        <div className="relative w-12 aspect-[16/10] rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
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
                        <div className="text-stone-900 dark:text-white font-bold truncate" title={blog.title}>
                          {blog.title}
                        </div>
                        <div className="text-[10px] text-stone-400 dark:text-stone-500 font-medium truncate mt-0.5 flex items-center gap-1">
                          <span>{blog.slug}</span>
                          <Link href={`/blog/${blog.slug}`} target="_blank" className="hover:text-teal-600">
                            <ExternalLink className="w-2.5 h-2.5 inline" />
                          </Link>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold text-[10px] py-0.5">
                          {blog.category}
                        </Badge>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            st === "published"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                              : st === "scheduled"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300"
                              : "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400"
                          }`}
                          title={
                            st === "scheduled" && blog.published_at
                              ? `Goes live ${new Date(blog.published_at).toLocaleString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}`
                              : undefined
                          }
                        >
                          {st}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-stone-500 dark:text-stone-400">
                        {blog.date}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right flex justify-end gap-1">
                        <Link
                          href={`/admin/blogs/edit/${blog.id}`}
                          className="p-2.5 text-stone-400 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl transition-colors inline-flex items-center justify-center"
                          title="Edit Blog"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id, blog.title)}
                          className="p-2.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors border-0 bg-transparent inline-flex items-center justify-center cursor-pointer"
                          title="Delete Blog"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="bg-stone-50 dark:bg-stone-800/60 border-t border-stone-200 dark:border-stone-800 px-4 py-3 text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider flex justify-between items-center">
              <span>Showing {blogs.filter((b) => statusFilter === "all" || displayStatus(b) === statusFilter).length} of {blogs.length} posts</span>
              <span>Supabase Managed</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
