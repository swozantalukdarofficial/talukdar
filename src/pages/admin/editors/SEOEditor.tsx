import { useState, useEffect } from "react";
import { useContent } from "../../../context/ContentContext";
import { Save, Check, Search, Globe, FileText, HelpCircle, Sparkles } from "lucide-react";

const MAIN_PAGES = [
	{ key: "home", label: "Home Page" },
	{ key: "about", label: "About Us Page" },
	{ key: "contact", label: "Contact Us Page" },
	{ key: "work", label: "Work (Portfolio) Page" },
	{ key: "services", label: "Services Listing Page" },
	{ key: "blogs", label: "Blogs Listing Page" },
];

const SERVICE_PAGES = [
	{ key: "digital-marketing-agency", label: "Full Stack Digital Marketing" },
	{ key: "AI-SEO-Service-Agency", label: "AI SEO Services" },
	{ key: "shopify-seo-service-agency", label: "Shopify SEO Services" },
	{ key: "professional-video-editing-services", label: "Video Editing Services" },
	{ key: "ppc-management-services", label: "PPC Management Services" },
	{ key: "social-media-marketing-agency", label: "Social Media Marketing Agency" },
	{ key: "shopify-website-development-service", label: "Shopify Website Development" },
	{ key: "custom-web-development-services", label: "Custom Web Development" },
	{ key: "wordpress-website-development-services", label: "WordPress Web Development" },
	{ key: "content-writing-services", label: "Content Writing Services" },
	{ key: "motion-graphics-services-company", label: "Motion Graphics Company" },
	{ key: "web-design-service", label: "Web Design (UI UX) Service" },
	{ key: "ai-seo", label: "GEO & AI SEO Service" },
];

const ALL_PAGES = [...MAIN_PAGES, ...SERVICE_PAGES];

export default function SEOEditor() {
	const { seo, updateDocument } = useContent();
	const [form, setForm] = useState(seo);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);
	const [activeTab, setActiveTab] = useState<"main" | "services">("main");
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		setForm(seo);
	}, [seo]);

	const handleSave = async () => {
		setSaving(true);
		try {
			for (const page of ALL_PAGES) {
				const pageKey = page.key;
				if (form[pageKey]) {
					await updateDocument("seo", pageKey, form[pageKey]);
				}
			}
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		} catch (error) {
			console.error("SEO Save failed:", error);
			alert("Save failed. Please check your internet connection.");
		} finally {
			setSaving(false);
		}
	};

	const update = (page: string, field: "title" | "description", value: string) => {
		setForm((prev) => ({
			...prev,
			[page]: {
				...(prev[page] || { title: "", description: "" }),
				[field]: value,
			},
		}));
	};

	const getTitleStatus = (len: number) => {
		if (len === 0) return { text: "Missing", color: "text-red-400 bg-red-500/10 border-red-500/20" };
		if (len < 40) return { text: "Too short", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" };
		if (len <= 65) return { text: "Optimal", color: "text-neon-green bg-neon-green/10 border-neon-green/20" };
		return { text: "Too long", color: "text-red-400 bg-red-500/10 border-red-500/20" };
	};

	const getDescStatus = (len: number) => {
		if (len === 0) return { text: "Missing", color: "text-red-400 bg-red-500/10 border-red-500/20" };
		if (len < 100) return { text: "Too short", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" };
		if (len <= 165) return { text: "Optimal", color: "text-neon-green bg-neon-green/10 border-neon-green/20" };
		return { text: "Too long", color: "text-red-400 bg-red-500/10 border-red-500/20" };
	};

	const activePages = activeTab === "main" ? MAIN_PAGES : SERVICE_PAGES;
	const filteredPages = activePages.filter((p) =>
		p.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
		p.key.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="space-y-6 max-w-4xl">
			{/* Top Header Panel */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
				<div>
					<h1 className="text-2xl font-black text-white flex items-center gap-2">
						<Globe className="w-6 h-6 text-neon-green" />
						SEO Metadata Settings
					</h1>
					<p className="text-neutral-500 text-sm mt-1">
						Configure custom page titles and meta descriptions for search engines.
					</p>
				</div>
				<button
					onClick={handleSave}
					disabled={saving}
					className="flex items-center justify-center gap-2 px-6 py-3 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 text-sm disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(135,230,92,0.2)]"
				>
					{saved ? (
						<>
							<Check className="w-4 h-4" />
							Saved Successfully!
						</>
					) : (
						<>
							<Save className="w-4 h-4" />
							{saving ? "Saving..." : "Save Changes"}
						</>
					)}
				</button>
			</div>

			{/* Navigation Tabs and Search */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
				<div className="flex gap-2 p-1 bg-neutral-900/60 rounded-xl border border-white/5 w-fit">
					<button
						onClick={() => {
							setActiveTab("main");
							setSearchQuery("");
						}}
						className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
							activeTab === "main"
								? "bg-white/10 text-white"
								: "text-neutral-400 hover:text-white"
						}`}
					>
						<Globe className="w-4 h-4" />
						Main Pages
					</button>
					<button
						onClick={() => {
							setActiveTab("services");
							setSearchQuery("");
						}}
						className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
							activeTab === "services"
								? "bg-white/10 text-white"
								: "text-neutral-400 hover:text-white"
						}`}
					>
						<Sparkles className="w-4 h-4 text-neon-green" />
						Service Pages ({SERVICE_PAGES.length})
					</button>
				</div>

				{/* Search filter input */}
				<div className="relative max-w-xs w-full">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
					<input
						type="text"
						placeholder="Search page..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full bg-neutral-900/50 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-neon-green/30 transition-all"
					/>
				</div>
			</div>

			{/* SEO Cards Grid */}
			<div className="grid grid-cols-1 gap-6">
				{filteredPages.length > 0 ? (
					filteredPages.map((page) => {
						const titleLen = form[page.key]?.title?.length || 0;
						const descLen = form[page.key]?.description?.length || 0;
						const titleStatus = getTitleStatus(titleLen);
						const descStatus = getDescStatus(descLen);

						return (
							<div
								key={page.key}
								className="bg-neutral-900/30 border border-white/5 rounded-2xl p-6 space-y-5 hover:border-white/10 transition-all backdrop-blur-sm"
							>
								{/* Card Header */}
								<div className="flex items-center justify-between border-b border-white/5 pb-3">
									<h2 className="text-base font-bold text-white flex items-center gap-2">
										<FileText className="w-4 h-4 text-neon-green" />
										{page.label}
									</h2>
									<span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">
										Key: {page.key}
									</span>
								</div>

								{/* Title Input */}
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<label className="text-xs font-bold text-neutral-400">Meta Title</label>
										<div className="flex items-center gap-2">
											<span className="text-[10px] text-neutral-500 font-mono">
												{titleLen} chars
											</span>
											<span className={`text-[10px] px-1.5 py-0.5 rounded border font-semibold ${titleStatus.color}`}>
												{titleStatus.text}
											</span>
										</div>
									</div>
									<input
										type="text"
										value={form[page.key]?.title || ""}
										onChange={(e) => update(page.key, "title", e.target.value)}
										placeholder="e.g. Best Digital Marketing Agency | WeBestOne"
										className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/50 transition-all placeholder-neutral-600"
									/>
								</div>

								{/* Description Textarea */}
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<label className="text-xs font-bold text-neutral-400">Meta Description</label>
										<div className="flex items-center gap-2">
											<span className="text-[10px] text-neutral-500 font-mono">
												{descLen} chars
											</span>
											<span className={`text-[10px] px-1.5 py-0.5 rounded border font-semibold ${descStatus.color}`}>
												{descStatus.text}
											</span>
										</div>
									</div>
									<textarea
										value={form[page.key]?.description || ""}
										onChange={(e) => update(page.key, "description", e.target.value)}
										rows={3}
										placeholder="e.g. Leading agency providing premium AI SEO, web design, development, and conversion campaigns..."
										className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/50 transition-all resize-none placeholder-neutral-600 leading-relaxed"
									/>
								</div>
							</div>
						);
					})
				) : (
					<div className="text-center py-12 bg-neutral-900/10 border border-white/5 rounded-2xl">
						<HelpCircle className="w-8 h-8 text-neutral-600 mx-auto mb-2 animate-bounce" />
						<p className="text-neutral-500 text-sm">কোনো পেজ খুঁজে পাওয়া যায়নি।</p>
					</div>
				)}
			</div>
		</div>
	);
}
