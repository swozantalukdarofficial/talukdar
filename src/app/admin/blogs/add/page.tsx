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

    setSaving(true);

    try {
      if (!supabase) {
        throw new Error("Supabase client is not ready.");
      }

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
        }),
      });

      toast.success(`"${title}" blog post added! 🎉`);
      router.push("/admin/blogs");
    } catch (err: any) {
      toast.error("Failed to save blog: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] pt-0">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/admin/blogs"
            className="text-stone-400 hover:text-stone-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">Add New Blog Post</h1>
            <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider mt-0.5">
              Create a database-driven rich markdown blog post
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* ── Left: Image Upload ── */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-stone-200 rounded-2xl p-5 sticky top-24 shadow-sm shadow-stone-150/50">
                <h2 className="text-xs font-bold text-stone-750 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-800" />
                  Cover Image
                </h2>

                {/* Drop zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "relative aspect-[16/10] rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden bg-stone-50",
                    imagePreview
                      ? "border-emerald-600/50"
                      : "border-stone-200 hover:border-stone-400"
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
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-xs font-bold uppercase tracking-wider">
                          Click to change
                        </p>
                      </div>
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
                  <div className="mt-3 flex items-center gap-2 text-emerald-800 text-xs font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Upload successful! ✅</span>
                  </div>
                )}
                {imageUrl && (
                  <p className="mt-1 text-stone-400 text-[10px] truncate">{imageUrl}</p>
                )}

                {/* Remove image */}
                {imageUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setImageUrl("");
                      setImagePreview("");
                    }}
                    className="mt-3 text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" /> Remove image
                  </button>
                )}
              </div>
            </div>

            {/* ── Right: Blog Details ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic info */}
              <div className="bg-white border border-stone-200/85 rounded-2xl p-6 space-y-4 shadow-sm shadow-stone-150/40">
                <h2 className="text-xs font-bold text-stone-750 uppercase tracking-widest border-b border-stone-100 pb-2.5">
                  Blog Content
                </h2>

                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Graphene Battery Lifespan: Is It Better?"
                    required
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                    Slug (URL) *
                  </label>
                  <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5">
                    <span className="text-stone-400 text-xs font-medium">/blog/</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="graphene-battery-lifespan"
                      required
                      className="flex-1 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category & Read Time & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                      Category *
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Buying Guide"
                      required
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                      Read Time *
                    </label>
                    <input
                      type="text"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="8 min read"
                      required
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                      Display Date *
                    </label>
                    <input
                      type="text"
                      value={dateStr}
                      onChange={(e) => setDateStr(e.target.value)}
                      placeholder="July 16, 2026"
                      required
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                  </div>
                </div>

                {/* Excerpt / Short Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
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
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 resize-none"
                  />
                </div>

                {/* Main Content Body */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                    Article Body (Markdown Enabled) *
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={12}
                    placeholder="### Heading&#10;Write your article here. Use *italics* or **bolds** for markup styling."
                    required
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 resize-y min-h-[300px]"
                  />
                  <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">
                    Supports custom markdown headings (`###`), lists (`*`), and horizontal rules (`---`)
                  </p>
                </div>
              </div>

              {/* SEO Meta Information */}
              <div className="bg-white border border-stone-200/85 rounded-2xl p-6 space-y-4 shadow-sm shadow-stone-150/40">
                <h2 className="text-xs font-bold text-stone-750 uppercase tracking-widest border-b border-stone-100 pb-2.5">
                  Search Engine Optimization (SEO)
                </h2>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="Graphene Battery Lifespan: Complete Guide"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                      Meta Description
                    </label>
                    <textarea
                      value={metaDesc}
                      onChange={(e) => setMetaDesc(e.target.value)}
                      rows={2}
                      placeholder="Get the complete electric bike and scooter price list in Bangladesh..."
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={saving || uploading || !imageUrl}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold h-12 text-sm gap-2 disabled:opacity-50 rounded-xl shadow-md shadow-emerald-700/10 border-0"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving to Supabase...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Publish Article
                    </>
                  )}
                </Button>

                {!imageUrl && (
                  <p className="text-center text-xs font-bold text-amber-700 bg-amber-50 py-2 rounded-xl border border-amber-100/50">
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
