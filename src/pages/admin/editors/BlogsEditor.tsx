import { useState, useEffect } from "react";
import { useContent, type BlogPost } from "../../../context/ContentContext";
import { Save, Check, Plus, Trash2, Pencil, X, Sparkles, BookOpen, AlertCircle, FileText, ChevronRight, Video } from "lucide-react";
import CloudinaryUploadButton from "../../../components/admin/CloudinaryUploadButton";
import RichTextBlogEditor from "../../../components/admin/RichTextBlogEditor";

const BLOG_CATEGORIES = ["AI & Tech", "Design", "Development", "Marketing", "Business"];

export default function BlogsEditor() {
	const { blogs, services, video, addDocument, removeDocument, updateDocument } = useContent();
	const [items, setItems] = useState<BlogPost[]>(blogs);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [activeForm, setActiveForm] = useState<BlogPost | null>(null);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	// Global Sidebar Video State
	const [globalVideoUrl, setGlobalVideoUrl] = useState(video?.youtubeUrl || "");
	const [savingVideo, setSavingVideo] = useState(false);
	const [savedVideo, setSavedVideo] = useState(false);

	useEffect(() => {
		setItems(blogs);
	}, [blogs]);

	useEffect(() => {
		if (video?.youtubeUrl) {
			setGlobalVideoUrl(video.youtubeUrl);
		}
	}, [video]);

	const handleSaveGlobalVideo = async () => {
		setSavingVideo(true);
		try {
			await updateDocument("content", "video", {
				...video,
				youtubeUrl: globalVideoUrl
			});
			setSavedVideo(true);
			setTimeout(() => setSavedVideo(false), 2000);
		} catch (err) {
			console.error("Failed to save sidebar video URL:", err);
			alert("Failed to save sidebar video URL");
		} finally {
			setSavingVideo(false);
		}
	};

	const handleEdit = (item: BlogPost) => {
		setEditingId(item.id);
		setActiveForm({
			...item,
			author: item.author || "Webestone Team",
			authorRole: item.authorRole || "Specialists",
			featured: item.featured || false,
			seoTitle: item.seoTitle || "",
			seoDescription: item.seoDescription || "",
			linkedServiceId: item.linkedServiceId || "",
			videoUrl: item.videoUrl || "",
			schemaMarkup: item.schemaMarkup ? (typeof item.schemaMarkup === "string" ? item.schemaMarkup : JSON.stringify(item.schemaMarkup, null, 2)) : "",
		});
	};

	const handleCreateNew = () => {
		const newId = `new-post-${Date.now()}`;
		const newPost: BlogPost = {
			id: newId,
			title: "New Blog Post Title",
			excerpt: "Quick summary of this blog post...",
			content: "<h2>Introduction</h2><p>Start writing content here...</p>",
			category: "Marketing",
			readTime: "5 min read",
			image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
			date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
			author: "Webestone Team",
			authorRole: "Specialists",
			featured: false,
			seoTitle: "",
			seoDescription: "",
			linkedServiceId: "",
			schemaMarkup: ""
		};
		setEditingId(newId);
		setActiveForm(newPost);
	};

	const handleSave = async () => {
		if (!activeForm) return;
		if (!activeForm.id || activeForm.id.trim() === "") {
			alert("Post ID cannot be empty.");
			return;
		}

		setSaving(true);
		try {
			let parsedSchema = null;
			if (activeForm.schemaMarkup && typeof activeForm.schemaMarkup === "string" && activeForm.schemaMarkup.trim() !== "") {
				try {
					parsedSchema = JSON.parse(activeForm.schemaMarkup);
				} catch (err) {
					console.warn("Invalid Schema JSON, saving as raw string:", err);
					parsedSchema = activeForm.schemaMarkup;
				}
			}

			const dbData = {
				...activeForm,
				schemaMarkup: parsedSchema
			};

			// If the user modified the ID during editing, delete the old document
			if (editingId && editingId !== activeForm.id && !editingId.startsWith("new-post-")) {
				await removeDocument("blogs", editingId);
			}

			await addDocument("blogs", activeForm.id, dbData as any);
			
			setSaved(true);
			setEditingId(null);
			setActiveForm(null);
			setTimeout(() => setSaved(false), 2000);
		} catch (err) {
			console.error("Failed to save blog post:", err);
			alert("Error saving blog post. View browser console.");
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this blog post? This action is permanent.")) return;
		try {
			await removeDocument("blogs", id);
			setItems(items.filter((i) => i.id !== id));
		} catch (err) {
			console.error("Delete failed:", err);
		}
	};

	const handleFormChange = (key: keyof BlogPost, val: any) => {
		if (!activeForm) return;
		
		// Auto slugify ID if title is being changed for a new post
		if (key === "title" && editingId?.startsWith("new-post-")) {
			const slug = val
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/(^-|-$)+/g, "");
			setActiveForm({
				...activeForm,
				title: val,
				id: slug
			});
		} else {
			setActiveForm({
				...activeForm,
				[key]: val
			});
		}
	};

	return (
		<div className="space-y-8 max-w-6xl">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-black text-white mb-1">Blog Posts</h1>
					<p className="text-neutral-500 text-sm">Manage dynamic blog posts, link them to service pages, and customize layouts.</p>
				</div>
				{!activeForm && (
					<button
						onClick={handleCreateNew}
						className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 text-sm transition-all cursor-pointer shadow-lg shadow-neon-green/15"
					>
						<Plus className="w-4 h-4" />
						<span>New Blog Post</span>
					</button>
				)}
			</div>

			{activeForm ? (
				/* Form View */
				<div className="bg-neutral-900/40 border border-white/5 rounded-3xl p-6 lg:p-8 space-y-6">
					<div className="flex items-center justify-between border-b border-white/5 pb-4">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-xl bg-neon-green/10 text-neon-green">
								<BookOpen className="w-5 h-5" />
							</div>
							<div>
								<h2 className="text-lg font-bold text-white">
									{editingId?.startsWith("new-post-") ? "Creating Blog Post" : "Editing Blog Post"}
								</h2>
								<p className="text-xs text-neutral-500">All changes must be saved to apply to the live site.</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={() => {
									setEditingId(null);
									setActiveForm(null);
								}}
								className="px-4 py-2 border border-white/10 hover:bg-white/5 text-neutral-300 font-bold text-xs rounded-xl transition-all"
							>
								Cancel
							</button>
							<button
								onClick={handleSave}
								disabled={saving}
								className="flex items-center gap-1.5 px-5 py-2 bg-neon-green hover:bg-neon-green/95 text-black font-bold text-xs rounded-xl transition-all disabled:opacity-50"
							>
								{saving ? "Saving..." : <><Save className="w-3.5 h-3.5" /><span>Save Post</span></>}
							</button>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Main Content Area */}
						<div className="lg:col-span-2 space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-400">Post Title</label>
									<input
										type="text"
										value={activeForm.title}
										onChange={(e) => handleFormChange("title", e.target.value)}
										className="w-full bg-neutral-950 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neon-green/50"
										placeholder="e.g. Best Digital Marketing Agency in Bangladesh"
									/>
								</div>
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-400">URL Slug / ID</label>
									<input
										type="text"
										value={activeForm.id}
										onChange={(e) => handleFormChange("id", e.target.value)}
										className="w-full bg-neutral-950 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-neon-green/50"
										placeholder="e.g. best-digital-marketing-agency"
									/>
								</div>
							</div>

							<div className="space-y-1.5">
								<label className="text-xs font-bold text-neutral-400">Excerpt / Quick Description</label>
								<textarea
									value={activeForm.excerpt}
									onChange={(e) => handleFormChange("excerpt", e.target.value)}
									rows={2}
									className="w-full bg-neutral-950 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neon-green/50 resize-none"
									placeholder="A brief 1-2 sentence hook to summarize the blog post."
								/>
							</div>

							<div className="space-y-1.5">
								<div className="flex justify-between items-center mb-1">
									<label className="text-xs font-bold text-neutral-400">Article Content (WordPress / Docs Rich Text Editor)</label>
									<span className="text-[10px] text-neon-green font-mono">H1-H4, Align, Tables, Checklists, &amp; Inline Images Supported</span>
								</div>
								<RichTextBlogEditor
									value={activeForm.content}
									onChange={(html) => handleFormChange("content", html)}
								/>
							</div>
						</div>

						{/* Sidebar Metadata Area */}
						<div className="space-y-6">
							<div className="bg-neutral-950/40 border border-white/5 rounded-2xl p-5 space-y-4">
								<h3 className="text-xs font-black text-white uppercase tracking-wider border-b border-white/5 pb-2">Publish Settings</h3>
								
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-400">Category</label>
									<select
										value={activeForm.category}
										onChange={(e) => handleFormChange("category", e.target.value)}
										className="w-full bg-neutral-950 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-neon-green/50"
									>
										{BLOG_CATEGORIES.map(cat => (
											<option key={cat} value={cat}>{cat}</option>
										))}
									</select>
								</div>

								<div className="grid grid-cols-2 gap-3">
									<div className="space-y-1.5">
										<label className="text-xs font-bold text-neutral-400">Read Time</label>
										<input
											type="text"
											value={activeForm.readTime}
											onChange={(e) => handleFormChange("readTime", e.target.value)}
											className="w-full bg-neutral-950 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-neon-green/50"
											placeholder="e.g. 5 min read"
										/>
									</div>
									<div className="space-y-1.5">
										<label className="text-xs font-bold text-neutral-400">Publish Date</label>
										<input
											type="text"
											value={activeForm.date}
											onChange={(e) => handleFormChange("date", e.target.value)}
											className="w-full bg-neutral-950 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-neon-green/50"
											placeholder="e.g. June 26, 2026"
										/>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-3">
									<div className="space-y-1.5">
										<label className="text-xs font-bold text-neutral-400">Author Name</label>
										<input
											type="text"
											value={activeForm.author}
											onChange={(e) => handleFormChange("author", e.target.value)}
											className="w-full bg-neutral-950 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-neon-green/50"
										/>
									</div>
									<div className="space-y-1.5">
										<label className="text-xs font-bold text-neutral-400">Author Role</label>
										<input
											type="text"
											value={activeForm.authorRole}
											onChange={(e) => handleFormChange("authorRole", e.target.value)}
											className="w-full bg-neutral-950 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-neon-green/50"
										/>
									</div>
								</div>

								<div className="flex items-center gap-2 pt-2">
									<input
										type="checkbox"
										id="featured"
										checked={activeForm.featured}
										onChange={(e) => handleFormChange("featured", e.target.checked)}
										className="w-4 h-4 accent-neon-green"
									/>
									<label htmlFor="featured" className="text-xs font-bold text-neutral-400 select-none cursor-pointer">
										Featured Post (Shows in Carousel)
									</label>
								</div>
							</div>

							<div className="bg-neutral-950/40 border border-white/5 rounded-2xl p-5 space-y-4">
								<h3 className="text-xs font-black text-white uppercase tracking-wider border-b border-white/5 pb-2">Link to landing page</h3>
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-400">Related Service Landing Page</label>
									<select
										value={activeForm.linkedServiceId || ""}
										onChange={(e) => handleFormChange("linkedServiceId", e.target.value)}
										className="w-full bg-neutral-950 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-neon-green/50"
									>
										<option value="">-- No linked service --</option>
										{services.map(srv => (
											<option key={srv.id} value={srv.id}>{srv.title}</option>
										))}
									</select>
									<p className="text-[10px] text-neutral-500">Will render a promotional card dynamically linking to the selected service inside this blog details.</p>
								</div>
							</div>

							<div className="bg-neutral-950/40 border border-white/5 rounded-2xl p-5 space-y-4">
								<h3 className="text-xs font-black text-white uppercase tracking-wider border-b border-white/5 pb-2 flex items-center gap-2">
									<Video className="w-3.5 h-3.5 text-neon-green" /> Custom Video URL (Optional)
								</h3>
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-400">Blog Post Specific Video</label>
									<input
										type="text"
										value={activeForm.videoUrl || ""}
										onChange={(e) => handleFormChange("videoUrl", e.target.value)}
										className="w-full bg-neutral-950 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-neon-green/50"
										placeholder="e.g. https://www.youtube.com/watch?v=... or m.youtube.com"
									/>
									<p className="text-[10px] text-neutral-500 leading-relaxed">
										Paste any YouTube link here. If set, this specific video will embed in the sidebar on this single blog post page!
									</p>
								</div>
							</div>

							<div className="bg-neutral-950/40 border border-white/5 rounded-2xl p-5 space-y-4">
								<h3 className="text-xs font-black text-white uppercase tracking-wider border-b border-white/5 pb-2 font-mono">Featured Image</h3>
								<div className="space-y-3">
									<div className="aspect-video rounded-xl overflow-hidden bg-neutral-950 border border-white/10 relative group">
										{activeForm.image ? (
											<img src={activeForm.image} alt="" className="w-full h-full object-cover" />
										) : (
											<div className="w-full h-full flex items-center justify-center text-xs text-neutral-600">No Image</div>
										)}
									</div>
									<div className="space-y-1">
										<label className="text-[10px] font-bold text-neutral-500 uppercase">Image URL</label>
										<input
											type="text"
											value={activeForm.image}
											onChange={(e) => handleFormChange("image", e.target.value)}
											className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs font-mono focus:outline-none focus:border-neon-green/50"
										/>
									</div>
									<CloudinaryUploadButton
										onUploadSuccess={(url) => handleFormChange("image", url)}
										resourceType="image"
										label="Upload Thumbnail"
									/>
								</div>
							</div>

							<div className="bg-neutral-950/40 border border-white/5 rounded-2xl p-5 space-y-4">
								<h3 className="text-xs font-black text-white uppercase tracking-wider border-b border-white/5 pb-2">SEO Configurations</h3>
								<div className="space-y-3">
									<div className="space-y-1">
										<label className="text-xs font-bold text-neutral-400">SEO Meta Title</label>
										<input
											type="text"
											value={activeForm.seoTitle || ""}
											onChange={(e) => handleFormChange("seoTitle", e.target.value)}
											className="w-full bg-neutral-950 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-neon-green/50"
											placeholder="Leave blank to use post title"
										/>
									</div>
									<div className="space-y-1">
										<label className="text-xs font-bold text-neutral-400">SEO Meta Description</label>
										<textarea
											value={activeForm.seoDescription || ""}
											onChange={(e) => handleFormChange("seoDescription", e.target.value)}
											rows={3}
											className="w-full bg-neutral-950 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-neon-green/50 resize-none"
											placeholder="Leave blank to use post excerpt"
										/>
									</div>
									<div className="space-y-1">
										<label className="text-xs font-bold text-neutral-400 font-mono">Schema Markup (JSON)</label>
										<textarea
											value={activeForm.schemaMarkup || ""}
											onChange={(e) => handleFormChange("schemaMarkup", e.target.value)}
											rows={4}
											className="w-full bg-neutral-950 border border-white/15 rounded-xl px-3 py-2 text-white text-[10px] font-mono focus:outline-none focus:border-neon-green/50"
											placeholder='{ "@context": "https://schema.org", ... }'
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				/* List View */
				<div className="space-y-6 min-w-0">
					{/* Global Sidebar Video Settings Card */}
					<div className="bg-neutral-900/40 border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl overflow-hidden">
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
							<div className="flex items-center gap-3 min-w-0">
								<div className="p-2 rounded-xl bg-neon-green/10 text-neon-green shrink-0">
									<Video className="w-5 h-5" />
								</div>
								<div className="min-w-0">
									<h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider truncate">Blog Sidebar "Latest Video" Manager</h2>
									<p className="text-[11px] sm:text-xs text-neutral-500">Embedded across Blog listing &amp; single Blog pages</p>
								</div>
							</div>
							<button
								onClick={handleSaveGlobalVideo}
								disabled={savingVideo}
								className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 bg-neon-green text-black font-bold text-xs rounded-xl hover:bg-neon-green/90 transition-all disabled:opacity-50 cursor-pointer shrink-0"
							>
								{savedVideo ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
								<span>{savedVideo ? "Saved!" : savingVideo ? "Saving..." : "Save Video URL"}</span>
							</button>
						</div>

						<div className="space-y-2 pt-2 border-t border-white/5">
							<label className="text-xs font-bold text-neutral-400">YouTube Video URL / Link</label>
							<input
								type="text"
								value={globalVideoUrl}
								onChange={(e) => setGlobalVideoUrl(e.target.value)}
								placeholder="e.g. https://www.youtube.com/watch?v=... or https://m.youtube.com/..."
								className="w-full bg-neutral-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-neon-green/50"
							/>
							<p className="text-[10px] text-neutral-400 leading-relaxed">
								💡 <strong>Smart Converter:</strong> Paste any YouTube link (mobile <code className="text-neon-green">m.youtube.com</code>, <code className="text-neon-green">youtu.be</code>, shorts, or standard watch link). System automatically converts it to clean iframe embed format without connection refusal errors!
							</p>
						</div>
					</div>

					{saved && (
						<div className="flex items-center gap-2 p-3 bg-neon-green/10 border border-neon-green/20 rounded-xl text-neon-green text-xs font-bold">
							<Check className="w-4 h-4 animate-bounce" />
							<span>Blog post saved successfully!</span>
						</div>
					)}

					<div className="grid grid-cols-1 gap-4 min-w-0">
						{items.map((item) => (
							<div
								key={item.id}
								className="p-3.5 sm:p-4 rounded-2xl border border-white/5 bg-neutral-900/30 hover:border-white/10 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 group min-w-0 overflow-hidden"
							>
								<div className="flex items-start sm:items-center gap-3 min-w-0 w-full sm:w-auto">
									<div className="w-16 h-12 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-neutral-950 border border-white/10 shrink-0">
										<img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
									</div>
									<div className="min-w-0 flex-1 space-y-1">
										<div className="flex items-center gap-1.5 flex-wrap">
											<span className="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
												{item.category}
											</span>
											<span className="text-[10px] text-neutral-500 font-mono">
												{item.date}
											</span>
											{item.featured && (
												<span className="px-2 py-0.5 rounded-full bg-neon-green/10 text-neon-green text-[9px] font-bold flex items-center gap-0.5">
													<Sparkles className="w-2.5 h-2.5" /> Featured
												</span>
											)}
											{item.linkedServiceId && (
												<span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[9px] font-bold">
													🔗 Linked
												</span>
											)}
										</div>
										<h3 className="text-white font-bold text-xs sm:text-base leading-snug group-hover:text-neon-green transition-colors truncate">
											{item.title}
										</h3>
										<p className="text-neutral-500 text-[11px] sm:text-xs truncate max-w-xl">{item.excerpt}</p>
									</div>
								</div>

								<div className="flex items-center gap-2 self-end md:self-auto shrink-0">
									<button
										onClick={() => handleEdit(item)}
										className="p-2 border border-white/10 hover:border-white/20 hover:bg-white/5 text-neutral-400 hover:text-white rounded-xl transition-all cursor-pointer"
										title="Edit Post"
									>
										<Pencil className="w-4 h-4" />
									</button>
									<button
										onClick={() => handleDelete(item.id)}
										className="p-2 border border-white/10 hover:border-red-500/30 hover:bg-red-500/10 text-neutral-400 hover:text-red-400 rounded-xl transition-all cursor-pointer"
										title="Delete Post"
									>
										<Trash2 className="w-4 h-4" />
									</button>
								</div>
							</div>
						))}
					</div>

					{items.length === 0 && (
						<div className="border border-dashed border-white/10 rounded-3xl p-12 text-center text-neutral-500 space-y-2">
							<AlertCircle className="w-10 h-10 mx-auto text-neutral-600 animate-pulse" />
							<p className="text-sm font-bold text-white">No articles published yet</p>
							<p className="text-xs text-neutral-500 max-w-sm mx-auto">Seed database using the admin dashboard or click "New Blog Post" to compose one manually.</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
