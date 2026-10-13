"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Images,
  Copy,
  Trash2,
  Loader2,
  Check,
  X,
  RefreshCw,
  Download,
  Pencil,
} from "lucide-react";
import { toast } from "sonner";
import { adminFetch } from "@/lib/admin-api";
import { cn } from "@/lib/utils";
import type { MediaImage } from "@/app/api/admin/media/route";

function formatBytes(bytes: number): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminMediaPage() {
  const [images, setImages] = useState<MediaImage[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaImage | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [detailImg, setDetailImg] = useState<MediaImage | null>(null);
  const [altDraft, setAltDraft] = useState("");
  const [savingAlt, setSavingAlt] = useState(false);

  const loadMedia = useCallback(async (cursor?: string) => {
    try {
      const data = await adminFetch<{ images: MediaImage[]; next_cursor: string | null }>(
        cursor
          ? `/api/admin/media?cursor=${encodeURIComponent(cursor)}`
          : "/api/admin/media"
      );
      return data;
    } catch (err: any) {
      throw err;
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const data = await loadMedia();
      setImages(data.images || []);
      setNextCursor(data.next_cursor);
    } catch (err: any) {
      setLoadError(err.message || "Failed to load media library.");
    } finally {
      setLoading(false);
    }
  }, [loadMedia]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleLoadMore() {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const data = await loadMedia(nextCursor);
      setImages((prev) => [...prev, ...(data.images || [])]);
      setNextCursor(data.next_cursor);
    } catch (err: any) {
      toast.error(err.message || "Failed to load more images");
    } finally {
      setLoadingMore(false);
    }
  }

  async function handleCopy(img: MediaImage) {
    try {
      await navigator.clipboard.writeText(img.url);
      setCopiedId(img.public_id);
      toast.success("Image URL copied to clipboard!");
      setTimeout(() => setCopiedId((id) => (id === img.public_id ? null : id)), 2000);
    } catch {
      toast.error("Could not copy — clipboard unavailable.");
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminFetch(
        `/api/admin/media?public_id=${encodeURIComponent(deleteTarget.public_id)}`,
        { method: "DELETE" }
      );
      setImages((prev) => prev.filter((i) => i.public_id !== deleteTarget.public_id));
      if (detailImg?.public_id === deleteTarget.public_id) setDetailImg(null);
      toast.success("Image deleted.");
      setDeleteTarget(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete image");
    } finally {
      setDeleting(false);
    }
  }

  function openDetail(img: MediaImage) {
    setDetailImg(img);
    setAltDraft(img.alt || "");
  }

  async function handleSaveAlt() {
    if (!detailImg) return;
    setSavingAlt(true);
    try {
      const data = await adminFetch<{ ok: boolean; alt: string }>(
        "/api/admin/media",
        {
          method: "PATCH",
          body: JSON.stringify({
            public_id: detailImg.public_id,
            alt: altDraft.trim(),
          }),
        }
      );
      const newAlt = data.alt || "";
      setImages((prev) =>
        prev.map((i) =>
          i.public_id === detailImg.public_id ? { ...i, alt: newAlt } : i
        )
      );
      setDetailImg({ ...detailImg, alt: newAlt });
      toast.success("Alt text saved.");
    } catch (err: any) {
      toast.error(err.message || "Failed to save alt text");
    } finally {
      setSavingAlt(false);
    }
  }

  function downloadUrl(img: MediaImage): string {
    // Cloudinary fl_attachment forces a download instead of opening in-browser
    return img.url.replace("/upload/", "/upload/fl_attachment/");
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Media Library
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Every image uploaded to your store — click any image for details,
            alt text, download, or to copy its URL
          </p>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs sm:text-sm font-bold hover:bg-stone-50 transition-all disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          <span>Refresh</span>
        </button>
      </div>

      {/* ── Content ── */}
      <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : loadError ? (
          <div className="p-10 text-center">
            <Images className="w-10 h-10 mx-auto text-stone-300 mb-3" />
            <p className="text-sm font-bold text-stone-700 dark:text-stone-200">
              Couldn&apos;t load the media library
            </p>
            <p className="text-xs text-stone-500 mt-1">{loadError}</p>
            <button
              onClick={refresh}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
            >
              Try Again
            </button>
          </div>
        ) : images.length === 0 ? (
          <div className="p-14 text-center">
            <Images className="w-10 h-10 mx-auto text-stone-300 mb-3" />
            <p className="text-sm font-bold text-stone-700 dark:text-stone-200">
              No images yet
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Images you upload from products or blogs will appear here.
            </p>
          </div>
        ) : (
          <div className="p-4 sm:p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {images.map((img) => (
                <div
                  key={img.public_id}
                  className="group relative rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden bg-stone-50 dark:bg-stone-800"
                >
                  <button
                    onClick={() => openDetail(img)}
                    title="View image details"
                    className="block w-full aspect-square relative cursor-pointer"
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || img.public_id.split("/").pop() || "store image"}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Hover overlay — always visible on touch, hover-reveal on desktop */}
                    <span className="absolute inset-0 bg-stone-900/30 sm:bg-stone-900/0 sm:group-hover:bg-stone-900/40 transition-colors flex items-center justify-center">
                      <span className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-stone-900 text-[11px] font-bold shadow">
                        <Pencil className="w-3.5 h-3.5" /> Details
                      </span>
                    </span>
                  </button>
                  {/* Meta + delete */}
                  <div className="flex items-center justify-between gap-2 px-2.5 py-2">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-stone-600 dark:text-stone-300 truncate">
                        {(img.public_id.split("/").pop() || "").slice(0, 24)}
                      </p>
                      <p className="text-[10px] text-stone-400">
                        {img.width}×{img.height} · {formatBytes(img.bytes)}
                      </p>
                    </div>
                    <button
                      onClick={() => setDeleteTarget(img)}
                      title="Delete image"
                      className="p-2.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {nextCursor && (
              <div className="flex justify-center pt-5">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-bold transition-colors disabled:opacity-50"
                >
                  {loadingMore && <Loader2 className="w-4 h-4 animate-spin" />}
                  Load more
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Image detail modal: preview, alt text, copy, download, delete ── */}
      {detailImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
          onClick={() => setDetailImg(null)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90dvh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-stone-100 dark:bg-stone-800">
              <Image
                src={detailImg.url}
                alt={detailImg.alt || "store image preview"}
                fill
                sizes="(max-width: 640px) 90vw, 448px"
                className="object-contain"
              />
              <button
                onClick={() => setDetailImg(null)}
                aria-label="Close"
                className="absolute top-2 right-2 p-2.5 rounded-xl bg-stone-900/60 text-white hover:bg-stone-900/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="min-w-0">
                <p className="text-xs font-bold text-stone-800 dark:text-stone-100 truncate">
                  {detailImg.public_id.split("/").pop()}
                </p>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  {detailImg.width}×{detailImg.height} ·{" "}
                  {formatBytes(detailImg.bytes)} ·{" "}
                  {detailImg.format?.toUpperCase()}
                </p>
              </div>

              {/* Alt text editor */}
              <div className="space-y-1.5">
                <label
                  htmlFor="media-alt"
                  className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide"
                >
                  Alt text <span className="normal-case font-medium text-stone-400">(SEO & accessibility)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="media-alt"
                    type="text"
                    value={altDraft}
                    onChange={(e) => setAltDraft(e.target.value)}
                    placeholder="e.g. Red electric scooter front view"
                    maxLength={500}
                    className="flex-1 min-w-0 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3.5 py-2.5 text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                  />
                  <button
                    onClick={handleSaveAlt}
                    disabled={savingAlt || altDraft.trim() === (detailImg.alt || "")}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold disabled:opacity-40 shrink-0 inline-flex items-center gap-1.5"
                  >
                    {savingAlt && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    Save
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCopy(detailImg)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-bold transition-colors min-h-[44px]"
                >
                  {copiedId === detailImg.public_id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy URL
                    </>
                  )}
                </button>
                <a
                  href={downloadUrl(detailImg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-bold transition-colors min-h-[44px]"
                >
                  <Download className="w-4 h-4" /> Download
                </a>
                <button
                  onClick={() => setDeleteTarget(detailImg)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-600 text-xs font-bold transition-colors min-h-[44px]"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirmation ── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 p-6 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center mb-3">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-stone-900 dark:text-white">
              Delete this image?
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              It will be removed from Cloudinary. Pages using this image will
              show a broken image until updated.
            </p>
            <div className="flex items-center justify-center gap-2 mt-5">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold disabled:opacity-50 inline-flex items-center gap-2"
              >
                {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
