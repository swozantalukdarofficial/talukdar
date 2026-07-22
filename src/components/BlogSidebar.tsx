import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Calendar, Facebook, Twitter, Instagram, Linkedin, Youtube, ExternalLink } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { parseYouTubeEmbedUrl } from "../lib/youtubeUtils";

interface BlogSidebarProps {
	currentPostId?: string;
	onSearchChange?: (val: string) => void;
	initialSearchVal?: string;
	activeCategory?: string;
	onCategoryChange?: (val: string) => void;
}

const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" fill="currentColor" className={props.className} {...props}>
		<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.715-.359-1.774c0-1.662.967-2.902 2.167-2.902 1.02 0 1.513.767 1.513 1.687 0 1.027-.653 2.561-.99 3.985-.283 1.196.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.005-4.882-3.409 0-5.413 2.561-5.413 5.207 0 1.03.397 2.133.89 2.73a.361.361 0 01.083.344c-.097.404-.314 1.277-.356 1.455-.056.23-.186.279-.427.168-1.591-.741-2.584-3.07-2.584-4.937 0-4.017 2.922-7.702 8.406-7.702 4.417 0 7.85 3.149 7.85 7.356 0 4.39-2.772 7.922-6.62 7.922-1.294 0-2.51-.672-2.927-1.47l-.799 3.046c-.29 1.107-1.077 2.493-1.603 3.351a12.019 12.019 0 006.184 1.72C18.618 24 24 18.631 24 12.012 24 5.393 18.616 0 12.017 0z" />
	</svg>
);

export default function BlogSidebar({
	currentPostId,
	onSearchChange,
	initialSearchVal = "",
	activeCategory = "All",
	onCategoryChange,
}: BlogSidebarProps) {
	const { blogs, socials, video } = useContent();
	const navigate = useNavigate();
	const [searchVal, setSearchVal] = useState(initialSearchVal);

	// Get recent posts (excluding current active post)
	const recentPosts = useMemo(() => {
		return blogs
			.filter((p) => p.id !== currentPostId)
			.slice(0, 5);
	}, [blogs, currentPostId]);

	// Calculate category counts dynamically
	const categoryCounts = useMemo(() => {
		const counts: Record<string, number> = {};
		blogs.forEach((post) => {
			counts[post.category] = (counts[post.category] || 0) + 1;
		});
		return counts;
	}, [blogs]);

	const categoriesList = ["AI & Tech", "Design", "Development", "Marketing", "Business"];

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (onSearchChange) {
			onSearchChange(searchVal);
		} else {
			// Redirect to /blogs page with search query parameter
			navigate(`/blogs?search=${encodeURIComponent(searchVal)}`);
		}
	};

	const handleCategoryClick = (cat: string) => {
		if (onCategoryChange) {
			onCategoryChange(cat);
		} else {
			navigate(`/blogs?category=${encodeURIComponent(cat)}`);
		}
	};

	// Get active post object if on single blog page
	const currentPost = useMemo(() => {
		if (!currentPostId) return null;
		return blogs.find((p) => p.id === currentPostId);
	}, [blogs, currentPostId]);

	// Clean up youtubeUrl to ensure it's embeddable (parsing m.youtube.com, watch?v=, youtu.be)
	const embedVideoUrl = useMemo(() => {
		if (currentPost?.videoUrl && currentPost.videoUrl.trim() !== "") {
			return parseYouTubeEmbedUrl(currentPost.videoUrl);
		}
		if (video?.youtubeUrl) {
			return parseYouTubeEmbedUrl(video.youtubeUrl);
		}
		return "https://www.youtube.com/embed/MnLd2G198U8";
	}, [currentPost, video]);

	return (
		<aside className="space-y-10 w-full lg:max-w-[340px] shrink-0">
			{/* 1. Search Box */}
			<div className="bg-neutral-900/40 border border-white/5 rounded-2xl p-5 backdrop-blur-sm">
				<h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-l-2 border-[#87E65C] pl-3">
					Search
				</h3>
				<form onSubmit={handleSearchSubmit} className="flex gap-2">
					<input
						type="text"
						value={searchVal}
						onChange={(e) => setSearchVal(e.target.value)}
						placeholder="Search posts..."
						className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#87E65C]/40 transition-all"
					/>
					<button
						type="submit"
						className="bg-white/5 border border-white/10 text-white font-bold px-4 py-2.5 rounded-xl hover:bg-[#87E65C] hover:text-black hover:border-[#87E65C] transition-all text-xs"
					>
						SEARCH
					</button>
				</form>
			</div>

			{/* 2. Recent Posts */}
			<div className="bg-neutral-900/40 border border-white/5 rounded-2xl p-5 backdrop-blur-sm">
				<h3 className="text-white font-bold text-xs uppercase tracking-wider mb-5 border-l-2 border-[#87E65C] pl-3">
					Recent Posts
				</h3>
				<div className="space-y-4">
					{recentPosts.map((post) => (
						<Link
							key={post.id}
							to={`/blogs/${post.id}`}
							className="flex gap-3 group items-start hover:bg-white/[0.02] p-1 rounded-lg transition-colors"
						>
							<div className="w-16 h-12 bg-neutral-800 rounded-lg overflow-hidden shrink-0 border border-white/5 relative">
								{post.image?.includes("from-") ? (
									<div className={`w-full h-full bg-gradient-to-br ${post.image} opacity-40`} />
								) : (
									<img
										src={post.image}
										alt={post.title}
										className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
									/>
								)}
							</div>
							<div className="min-w-0 flex-1">
								<h4 className="text-xs font-semibold text-neutral-200 group-hover:text-[#87E65C] transition-colors line-clamp-2 leading-snug">
									{post.title}
								</h4>
								<span className="text-[10px] text-neutral-500 mt-1 block">
									{post.date}
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>

			{/* 3. Keep In Touch */}
			<div className="bg-neutral-900/40 border border-white/5 rounded-2xl p-5 backdrop-blur-sm">
				<h3 className="text-white font-bold text-xs uppercase tracking-wider mb-5 border-l-2 border-[#87E65C] pl-3">
					Keep In Touch
				</h3>
				<div className="grid grid-cols-2 gap-3">
					{socials.facebook && (
						<a
							href={socials.facebook}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#87E65C]/20 hover:bg-white/10 transition-all text-neutral-300 hover:text-white text-xs"
						>
							<Facebook className="w-4 h-4 text-[#1877F2]" />
							<span className="font-semibold uppercase tracking-wider">Facebook</span>
						</a>
					)}
					{socials.instagram && (
						<a
							href={socials.instagram}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#87E65C]/20 hover:bg-white/10 transition-all text-neutral-300 hover:text-white text-xs"
						>
							<Instagram className="w-4 h-4 text-[#E1306C]" />
							<span className="font-semibold uppercase tracking-wider">Instagram</span>
						</a>
					)}
					<a
						href="https://pinterest.com"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#87E65C]/20 hover:bg-white/10 transition-all text-neutral-300 hover:text-white text-xs"
					>
						<PinterestIcon className="w-4 h-4 text-[#BD081C]" />
						<span className="font-semibold uppercase tracking-wider">Pinterest</span>
					</a>
					{socials.linkedin && (
						<a
							href={socials.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#87E65C]/20 hover:bg-white/10 transition-all text-neutral-300 hover:text-white text-xs"
						>
							<Linkedin className="w-4 h-4 text-[#0A66C2]" />
							<span className="font-semibold uppercase tracking-wider">LinkedIn</span>
						</a>
					)}
					{socials.youtube && (
						<a
							href={socials.youtube}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#87E65C]/20 hover:bg-white/10 transition-all text-neutral-300 hover:text-white text-xs"
						>
							<Youtube className="w-4 h-4 text-[#FF0000]" />
							<span className="font-semibold uppercase tracking-wider">YouTube</span>
						</a>
					)}
				</div>
			</div>

			{/* 4. Latest Video */}
			<div className="bg-neutral-900/40 border border-white/5 rounded-2xl p-5 backdrop-blur-sm">
				<h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-l-2 border-neon-green pl-3">
					Latest Video
				</h3>
				<div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-neutral-950">
					<iframe
						src={embedVideoUrl}
						title="Latest Video Presentation"
						className="w-full h-full"
						allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</div>
			</div>

			{/* 5. Categories */}
			<div className="bg-neutral-900/40 border border-white/5 rounded-2xl p-5 backdrop-blur-sm">
				<h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-l-2 border-neon-green pl-3">
					Categories
				</h3>
				<div className="divide-y divide-white/5">
					{categoriesList.map((cat) => {
						const count = categoryCounts[cat] || 0;
						const isActive = activeCategory === cat;
						return (
							<button
								key={cat}
								onClick={() => handleCategoryClick(cat)}
								className={`flex items-center justify-between w-full py-3 text-xs font-semibold tracking-wider text-left transition-colors ${
									isActive ? "text-neon-green" : "text-neutral-400 hover:text-white"
								}`}
							>
								<span className="uppercase">{cat}</span>
								<span className="bg-white/5 border border-white/10 text-neutral-400 px-2 py-0.5 rounded text-[10px]">
									({count})
								</span>
							</button>
						);
					})}
				</div>
			</div>
		</aside>
	);
}
