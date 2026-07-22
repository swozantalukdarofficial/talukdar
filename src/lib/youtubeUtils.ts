/**
 * Converts any YouTube URL variant (desktop watch, mobile m.youtube.com, short link, shorts, or raw video ID)
 * into a sanitized iframe embeddable URL (https://www.youtube.com/embed/VIDEO_ID).
 */
export function parseYouTubeEmbedUrl(inputUrl?: string): string {
  if (!inputUrl || !inputUrl.trim()) {
    return "https://www.youtube.com/embed/MnLd2G198U8";
  }

  const clean = inputUrl.trim();

  // Already an embed URL
  if (clean.includes("/embed/")) {
    const videoId = clean.split("/embed/")[1]?.split("?")[0]?.split("&")[0]?.split("#")[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  }

  // Handle shorts format: youtube.com/shorts/VIDEO_ID
  if (clean.includes("/shorts/")) {
    const videoId = clean.split("/shorts/")[1]?.split("?")[0]?.split("&")[0]?.split("#")[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  }

  // Handle shortened format: youtu.be/VIDEO_ID
  if (clean.includes("youtu.be/")) {
    const videoId = clean.split("youtu.be/")[1]?.split("?")[0]?.split("&")[0]?.split("#")[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  }

  // Handle standard or mobile watch format: youtube.com/watch?v=VIDEO_ID or m.youtube.com/watch?v=VIDEO_ID
  if (clean.includes("v=")) {
    const videoId = clean.split("v=")[1]?.split("&")[0]?.split("#")[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  }

  // Raw 11-character YouTube video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return `https://www.youtube.com/embed/${clean}`;
  }

  return clean;
}
