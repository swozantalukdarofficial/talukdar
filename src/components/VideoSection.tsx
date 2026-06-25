import { motion, AnimatePresence } from "framer-motion";
import { Play, Youtube, ExternalLink, Link2, X, CheckCircle } from "lucide-react";
import { useState } from "react";

// Extract YouTube video ID from various URL formats
function extractVideoId(url: string): string | null {
	if (!url) return null;
	const patterns = [
		/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
		/^([a-zA-Z0-9_-]{11})$/, // raw ID
	];
	for (const pattern of patterns) {
		const match = url.match(pattern);
		if (match) return match[1];
	}
	return null;
}

// ✅ Default video ID — বদলে দিন আপনার আসল video ID দিয়ে
const DEFAULT_VIDEO_ID = "dQw4w9WgXcQ";

export default function VideoSection() {
	const [videoId, setVideoId] = useState(DEFAULT_VIDEO_ID);
	const [isPlaying, setIsPlaying] = useState(false);
	const [inputUrl, setInputUrl] = useState("");
	const [showInput, setShowInput] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
	const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
	const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

	function handleApplyUrl() {
		const id = extractVideoId(inputUrl.trim());
		if (!id) {
			setError("সঠিক YouTube লিংক দিন (যেমন: https://youtu.be/xxxxx)");
			setSuccess(false);
			return;
		}
		setVideoId(id);
		setIsPlaying(false);
		setError("");
		setSuccess(true);
		setTimeout(() => {
			setShowInput(false);
			setSuccess(false);
			setInputUrl("");
		}, 1000);
	}

	return (
		<section className="py-28 px-6 relative z-10 overflow-hidden">
			{/* Background ambient glow */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-neon-green/5 blur-[120px] rounded-full" />
				<div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full" />
			</div>

			<div className="max-w-5xl mx-auto relative">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					viewport={{ once: true }}
					className="text-center mb-14 space-y-4"
				>
					{/* Label */}
					<div className="flex items-center justify-center gap-3">
						<span className="w-8 h-[1px] bg-neon-green/60" />
						<span className="text-neon-green font-mono text-xs tracking-[0.25em] uppercase">
							Our Introduction
						</span>
						<span className="w-8 h-[1px] bg-neon-green/60" />
					</div>

					<h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
						Meet{" "}
						<span className="bg-gradient-to-r from-neon-green via-cyan-400 to-blue-500 bg-clip-text text-transparent">
							WebEstOne
						</span>
					</h2>

					<p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
						আমরা কে এবং কীভাবে আপনার ব্যবসাকে পরবর্তী স্তরে নিয়ে যেতে পারি —
						জানুন আমাদের পরিচিতি ভিডিওতে।
					</p>

					{/* URL Input Toggle Button */}
					<motion.button
						onClick={() => {
							setShowInput((v) => !v);
							setError("");
							setSuccess(false);
						}}
						whileHover={{ scale: 1.04 }}
						whileTap={{ scale: 0.97 }}
						className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-neon-green/10 hover:border-neon-green/40 text-neutral-300 hover:text-neon-green text-sm font-medium transition-all duration-300"
					>
						<Link2 className="w-4 h-4" />
						YouTube লিংক দিন
					</motion.button>

					{/* URL Input Panel */}
					<AnimatePresence>
						{showInput && (
							<motion.div
								initial={{ opacity: 0, y: -10, height: 0 }}
								animate={{ opacity: 1, y: 0, height: "auto" }}
								exit={{ opacity: 0, y: -10, height: 0 }}
								transition={{ duration: 0.3 }}
								className="overflow-hidden"
							>
								<div className="mt-4 max-w-xl mx-auto">
									<div className="flex gap-2">
										<div className="relative flex-1">
											<Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
											<input
												type="text"
												value={inputUrl}
												onChange={(e) => {
													setInputUrl(e.target.value);
													setError("");
												}}
												onKeyDown={(e) => e.key === "Enter" && handleApplyUrl()}
												placeholder="https://youtu.be/xxxxx বা https://youtube.com/watch?v=xxxxx"
												className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 focus:border-neon-green/50 focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors duration-200"
											/>
										</div>
										<motion.button
											onClick={handleApplyUrl}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											className="px-5 py-3 rounded-xl bg-neon-green text-black font-semibold text-sm hover:bg-neon-green/90 transition-colors duration-200 whitespace-nowrap"
										>
											{success ? (
												<span className="flex items-center gap-1.5">
													<CheckCircle className="w-4 h-4" /> হয়েছে!
												</span>
											) : (
												"দেখাও"
											)}
										</motion.button>
										<button
											onClick={() => {
												setShowInput(false);
												setError("");
												setInputUrl("");
											}}
											className="p-3 rounded-xl border border-white/10 text-neutral-500 hover:text-white hover:border-white/20 transition-all duration-200"
											aria-label="Close URL input"
										>
											<X className="w-4 h-4" />
										</button>
									</div>
									{error && (
										<motion.p
											initial={{ opacity: 0, y: -4 }}
											animate={{ opacity: 1, y: 0 }}
											className="mt-2 text-red-400 text-xs text-left"
										>
											⚠️ {error}
										</motion.p>
									)}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>

				{/* Video Player Card */}
				<motion.div
					key={videoId}
					initial={{ opacity: 0, scale: 0.92, y: 40 }}
					whileInView={{ opacity: 1, scale: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
					viewport={{ once: true }}
					className="relative group"
				>
					{/* Outer glow ring */}
					<div className="absolute -inset-[3px] rounded-3xl bg-gradient-to-r from-neon-green via-cyan-400 to-blue-500 opacity-30 blur-md group-hover:opacity-60 transition-all duration-700" />

					{/* Card */}
					<div className="relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-950 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
						{/* Aspect ratio wrapper */}
						<div className="relative aspect-video w-full">
							<AnimatePresence mode="wait">
								{!isPlaying ? (
									/* ── Thumbnail Preview ── */
									<motion.div
										key={`thumb-${videoId}`}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
										className="absolute inset-0 cursor-pointer"
										onClick={() => setIsPlaying(true)}
									>
										{/* YouTube Thumbnail */}
										<img
											src={thumbnail}
											alt="WebEstOne Introduction Video"
											className="w-full h-full object-cover"
											onError={(e) => {
												(e.target as HTMLImageElement).src =
													`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
											}}
										/>

										{/* Dark overlay */}
										<div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

										{/* Scan line shimmer */}
										<div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

										{/* Top bar: YouTube branding */}
										<div className="absolute top-5 left-5 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
											<Youtube className="w-4 h-4 text-red-500" />
											<span className="text-white text-xs font-semibold tracking-wide">
												YouTube
											</span>
										</div>

										{/* Top-right: watch now badge */}
										<div className="absolute top-5 right-5 bg-black/70 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
											<span className="text-white text-xs font-mono">WATCH NOW</span>
										</div>

										{/* Center Play Button */}
										<div className="absolute inset-0 flex items-center justify-center">
											<motion.div
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.95 }}
												className="relative"
											>
												{/* Pulsing ring */}
												<motion.div
													animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
													transition={{ duration: 2.5, repeat: Infinity }}
													className="absolute inset-0 rounded-full bg-neon-green/30"
												/>
												{/* Inner glow ring */}
												<motion.div
													animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
													transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
													className="absolute inset-0 rounded-full bg-neon-green/20"
												/>
												{/* Play circle */}
												<div className="relative w-20 h-20 bg-neon-green rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(135,230,92,0.5)] group-hover:shadow-[0_0_60px_rgba(135,230,92,0.8)] transition-all duration-300">
													<Play className="w-8 h-8 text-black fill-black ml-1" />
												</div>
											</motion.div>
										</div>

										{/* Bottom info bar */}
										<div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
											<div className="flex items-end justify-between">
												<div>
													<p className="text-white font-bold text-lg leading-tight">
														WebEstOne — Introduction
													</p>
													<p className="text-neutral-400 text-sm mt-1">
														আমাদের সম্পর্কে জানুন • WeBestOne Agency
													</p>
												</div>
												<a
													href={youtubeUrl}
													target="_blank"
													rel="noopener noreferrer"
													onClick={(e) => e.stopPropagation()}
													className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neon-green transition-colors duration-200"
												>
													<ExternalLink className="w-3.5 h-3.5" />
													YouTube-এ দেখুন
												</a>
											</div>
										</div>
									</motion.div>
								) : (
									/* ── Embedded Player ── */
									<motion.iframe
										key={`player-${videoId}`}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.4 }}
										className="absolute inset-0 w-full h-full"
										src={embedUrl}
										title="WebEstOne Introduction Video"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										allowFullScreen
									/>
								)}
							</AnimatePresence>
						</div>

						{/* Bottom decorative border */}
						<div className="h-[2px] w-full bg-gradient-to-r from-transparent via-neon-green/50 to-transparent" />
					</div>
				</motion.div>

				{/* Stats Row below video */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.4 }}
					viewport={{ once: true }}
					className="mt-10 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
				>
					{[
						{ value: "50+", label: "Successful Projects" },
						{ value: "98%", label: "Client Satisfaction" },
						{ value: "24/7", label: "Support Available" },
					].map((stat) => (
						<div
							key={stat.label}
							className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 text-center hover:border-neon-green/30 hover:bg-neon-green/[0.03] transition-all duration-300"
						>
							<p className="text-2xl font-bold text-white">{stat.value}</p>
							<p className="text-neutral-500 text-xs mt-1 tracking-wide uppercase">
								{stat.label}
							</p>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
}

