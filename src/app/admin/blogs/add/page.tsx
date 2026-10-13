"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Upload,
  X,
  Loader2,
  CheckCircle,
  ImageIcon,
  ArrowLeft,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { adminUpload, adminFetch } from "@/lib/admin-api";

export default function AddBlogPage() {
  const router = useRouter();

  // ── Form fields ──────────────────────────────────────────────
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Buying Guide");
  const [readTime, setReadTime] = useState("5 min read");
  const [dateStr, setDateStr] = useState(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options); // e.g. "July 16, 2026"
  });
  const [description, setDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [content, setContent] = useState("");

  // ── Image upload state ───────────────────────────────────────
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Submit state ─────────────────────────────────────────────
  const [saving, setSaving] = useState(false);

  // ── Publishing state ───────────────────────────────────────────
  // published: goes live immediately · draft: hidden · scheduled: goes live at scheduledAt
  const [publishMode, setPublishMode] = useState<"published" | "draft" | "scheduled">("published");
  const [scheduledAt, setScheduledAt] = useState("");

  function resolvePublishing(): { status: "draft" | "published"; published_at: string | null } {
    if (publishMode === "draft") return { status: "draft", published_at: null };
    if (publishMode === "scheduled" && scheduledAt) {
      return { status: "published", published_at: new Date(scheduledAt).toISOString() };
    }
    return { status: "published", published_at: new Date().toISOString() };
  }

  // ── Auto-generate slug and meta from title ────────────────────
  function handleTitleChange(val: string) {
    setTitle(val);
    
    // Slug
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    setSlug(generatedSlug);

    // Meta Title
    setMetaTitle(`${val} | EV Store BD`);

    // Meta Desc
    if (description.length === 0) {
      setMetaDesc(val);
    }
  }

  // ── Handle image file select & upload ─────────────────────────
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);
    setUploading(true);
    setUploadProgress(10);

    try {
      setUploadProgress(40);
      const data = await adminUpload(file);
      setUploadProgress(80);

      setImageUrl(data.url);
      setImagePreview(data.url);
      setUploadProgress(100);
      toast.success("Blog cover uploaded successfully! ✅", {
        description: `${Math.round((data.bytes || 0) / 1024)} KB`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      toast.error(msg);
      setImagePreview("");
      setImageUrl("");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }

  // ── Submit ───────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!imageUrl) {
      toast.error("Please upload a blog cover image first!");
      return;
    }
    if (!title || !slug || !content || !description) {
      toast.error("Title, slug, short description, and content are required!");
      return;
    }
    if (publishMode === "scheduled") {
      if (!scheduledAt) {
        toast.error("Pick a date & time for the scheduled publish.");
        return;
      }
      if (new Date(scheduledAt) <= new Date()) {
        toast.error("Scheduled time must be in the future.");
        return;
      }
    }

    setSaving(true);

    try {
      if (!supabase) {
        throw new Error("Supabase client is not ready.");
      }

      const publishing = resolvePublishing();

      await adminFetch("/api/admin/blogs", {
        method: "POST",
        body: JSON.stringify({
          title,
          slug,
          category,
          read_time: readTime,
          image: imageUrl,
          description,
          meta_title: metaTitle || title,
          meta_desc: metaDesc || description,
          content,
          date: dateStr,
          status: publishing.status,
          published_at: publishing.published_at,
        }),
      });

      toast.success(
        publishMode === "draft"
          ? `"${title}" saved as draft. 📝`
          : publishMode === "scheduled"
          ? `"${title}" scheduled! 🕒`
          : `"${title}" blog post added! 🎉`
      );
      router.push("/admin/blogs");
    } catch (err: any) {
      toast.error("Failed to save blog: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen pt-0">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/admin/blogs"
            className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors p-1 -m-1"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900 dark:text-white tracking-tight">Add New Blog Post</h1>
            <p className="text-stone-500 dark:text-stone-400 text-xs font-semibold uppercase tracking-wider mt-0.5">
              Create a database-driven rich markdown blog post
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* ── Left: Image Upload ── */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 lg:sticky lg:top-24 shadow-sm">
                <h2 className="text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Cover Image
                </h2>

                {/* Drop zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "relative aspect-[16/10] rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden bg-stone-50 dark:bg-stone-800/60",
                    imagePreview
                      ? "border-emerald-600/50"
                      : "border-stone-200 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-500"
                  )}
                >
                  {imagePreview ? (
                    <>
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="300px"
                        unoptimized={true}
                      />
                      {/* Overlay on hover (desktop) */}
                      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity hidden sm:flex sm:items-center sm:justify-center">
                        <p className="text-white text-xs font-bold uppercase tracking-wider">
                          Click to change
                        </p>
                      </div>
                      {/* Always-visible change button for touch devices */}
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        aria-label="Change cover image"
                        className="sm:hidden absolute bottom-2 right-2 p-2.5 rounded-full bg-stone-900/70 text-white backdrop-blur-sm"
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-stone-400">
                      <Upload className="w-8 h-8 text-stone-300" />
                      <p className="text-xs text-center px-4 leading-normal font-medium">
                        Click to upload<br />
                        <span className="text-[10px] text-stone-400 font-normal">
                          JPG, PNG, WEBP (max 10MB)
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Upload progress overlay */}
                  {uploading && (
                    <div className="absolute inset-0 bg-stone-900/80 flex flex-col items-center justify-center gap-3">
                      <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                      <div className="w-32 h-1 bg-stone-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-white text-[10px] font-bold uppercase tracking-wider">Uploading...</p>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                {/* Upload status */}
                {imageUrl && !uploading && (
                  <div className="mt-3 flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Upload successful! ✅</span>
                  </div>
                )}
                {imageUrl && (
                  <p className="mt-1 text-stone-400 dark:text-stone-500 text-[10px] truncate break-all">{imageUrl}</p>
                )}

                {/* Remove image */}
                {imageUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setImageUrl("");
                      setImagePreview("");
                    }}
                    className="mt-3 text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 flex items-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" /> Remove image
                  </button>
                )}
              </div>
            </div>

            {/* ── Right: Blog Details ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic info */}
              <div className="bg-white dark:bg-stone-900 border border-stone-200/85 dark:border-stone-800 rounded-2xl p-6 space-y-4 shadow-sm">
                <h2 className="text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-widest border-b border-stone-100 dark:border-stone-800 pb-2.5">
                  Blog Content
                </h2>

                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Graphene Battery Lifespan: Is It Better?"
                    required
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2.5 text-base text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                    Slug (URL) *
                  </label>
                  <div className="flex items-center gap-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2.5 min-w-0">
                    <span className="text-stone-400 dark:text-stone-500 text-xs font-medium shrink-0">/blog/</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="graphene-battery-lifespan"
                      required
                      className="flex-1 min-w-0 bg-transparent text-base text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category & Read Time & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                      Category *
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Buying Guide"
                      required
                      className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2.5 text-base text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                      Read Time *
                    </label>
                    <input
                      type="text"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="8 min read"
                      required
                      className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2.5 text-base text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                      Display Date *
                    </label>
                    <input
                      type="text"
                      value={dateStr}
                      onChange={(e) => setDateStr(e.target.value)}
                      placeholder="July 16, 2026"
                      required
                      className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2.5 text-base text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                  </div>
                </div>

                {/* Excerpt / Short Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                    Short Excerpt *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (metaDesc === title || metaDesc === "") {
                        setMetaDesc(e.target.value);
                      }
                    }}
                    rows={2}
                    placeholder="A brief 1-2 sentence preview description for card layout..."
                    required
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2.5 text-base text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 resize-none"
                  />
                </div>

                {/* Main Content Body */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                    Article Body (Markdown Enabled) *
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={12}
                    placeholder="### Heading&#10;Write your article here. Use *italics* or **bolds** for markup styling."
                    required
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2.5 text-base text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 resize-y min-h-[300px]"
                  />
                  <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold uppercase tracking-wider">
                    Supports custom markdown headings (`###`), lists (`*`), and horizontal rules (`---`)
                  </p>
                </div>
              </div>

              {/* SEO Meta Information */}
              <div className="bg-white dark:bg-stone-900 border border-stone-200/85 dark:border-stone-800 rounded-2xl p-6 space-y-4 shadow-sm">
                <h2 className="text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-widest border-b border-stone-100 dark:border-stone-800 pb-2.5">
                  Search Engine Optimization (SEO)
                </h2>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="Graphene Battery Lifespan: Complete Guide"
                      className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2.5 text-base text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                      Meta Description
                    </label>
                    <textarea
                      value={metaDesc}
                      onChange={(e) => setMetaDesc(e.target.value)}
                      rows={2}
                      placeholder="Get the complete electric bike and scooter price list in Bangladesh..."
                      className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2.5 text-base text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Publishing */}
              <div className="bg-white dark:bg-stone-900 border border-stone-200/85 dark:border-stone-800 rounded-2xl p-6 space-y-4 shadow-sm">
                <h2 className="text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-widest border-b border-stone-100 dark:border-stone-800 pb-2.5">
                  Publishing
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(
                    [
                      { key: "published", label: "Publish now", icon: "🚀" },
                      { key: "draft", label: "Save draft", icon: "📝" },
                      { key: "scheduled", label: "Schedule", icon: "🕒" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setPublishMode(opt.key)}
                      className={cn(
                        "px-3 py-2.5 rounded-xl border text-xs font-bold transition-colors",
                        publishMode === opt.key
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-500"
                      )}
                    >
                      <span className="mr-1">{opt.icon}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>

                {publishMode === "scheduled" && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                      Go live at *
                    </label>
                    <input
                      type="datetime-local"
                      value={scheduledAt}
                      onChange={(e) => setScheduledAt(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2.5 text-base text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                    <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold uppercase tracking-wider">
                      The post stays hidden until this time (your local time).
                    </p>
                  </div>
                )}

                {publishMode === "draft" && (
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2">
                    Drafts are hidden from the blog page until you publish them.
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={saving || uploading || !imageUrl}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 text-sm gap-2 disabled:opacity-50 rounded-xl shadow-md shadow-emerald-600/20 border-0"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving to Supabase...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      {publishMode === "draft"
                        ? "Save Draft"
                        : publishMode === "scheduled"
                        ? "Schedule Post"
                        : "Publish Article"}
                    </>
                  )}
                </Button>

                {!imageUrl && (
                  <p className="text-center text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 py-2 px-3 rounded-xl border border-amber-100/50 dark:border-amber-900">
                    ⚠️ Please upload a cover image first to enable Publish button.
                  </p>
                )}
              </div>

            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
