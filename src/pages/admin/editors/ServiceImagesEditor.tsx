import { useState, useEffect } from "react";
import { useContent } from "../../../context/ContentContext";
import { Save, Check, Image, RotateCcw, AlertCircle, Video, Play, Monitor, Megaphone, Film } from "lucide-react";
import CloudinaryUploadButton from "../../../components/admin/CloudinaryUploadButton";


interface ServiceConfig {
	id: string;
	name: string;
	hasVideo: boolean;
	defaultVideo?: string;
}

interface CategoryConfig {
	id: string;
	name: string;
	description: string;
	icon: any;
	services: ServiceConfig[];
}

interface MediaField {
	key: string;
	label: string;
	type: "image" | "video";
	placeholder?: string;
	fallback?: string;
}

const SERVICE_CATEGORIES: CategoryConfig[] = [
	{
		id: "marketing",
		name: "Marketing & SEO",
		description: "SEO, Social Media, Content, and PPC",
		icon: Megaphone,
		services: [
			{ id: "digital-marketing-agency", name: "Digital Marketing Agency", hasVideo: true, defaultVideo: "Zey6npEA0KA" },
			{ id: "social-media-marketing-agency", name: "Social Media Marketing Agency", hasVideo: true, defaultVideo: "MnLd2G198U8" },
			{ id: "ppc-management-services", name: "PPC Management Services", hasVideo: true, defaultVideo: "MnLd2G198U8" },
			{ id: "AI-SEO-Service-Agency", name: "AI SEO Service Agency", hasVideo: false },
			{ id: "shopify-seo-service-agency", name: "Shopify SEO Service Agency", hasVideo: false },
			{ id: "ai-seo", name: "AI SEO", hasVideo: false },
			{ id: "content-writing-services", name: "Content Writing Services", hasVideo: false }
		]
	},
	{
		id: "dev-design",
		name: "Development & UI/UX",
		description: "Shopify, WordPress, Web Design & Dev",
		icon: Monitor,
		services: [
			{ id: "custom-web-development-services", name: "Custom Web Development", hasVideo: false },
			{ id: "wordpress-website-development-services", name: "WordPress Website Development", hasVideo: false },
			{ id: "shopify-website-development-service", name: "Shopify Website Development", hasVideo: false },
			{ id: "web-design-service", name: "Web Design (UI UX)", hasVideo: false }
		]
	},
	{
		id: "creative",
		name: "Creative & Media",
		description: "Video Editing and Motion Graphics",
		icon: Film,
		services: [
			{ id: "professional-video-editing-services", name: "Professional Video Editing", hasVideo: false },
			{ id: "motion-graphics-services-company", name: "Motion Graphics Services Company", hasVideo: false }
		]
	}
];

const defaultServiceImages: Record<string, string> = {
	"digital-marketing-agency": "https://img.youtube.com/vi/Zey6npEA0KA/maxresdefault.jpg",
	"digital-marketing-agency_video": "Zey6npEA0KA",
	"digital-marketing-agency_why_video": "MnLd2G198U8",
	"digital-marketing-agency_why_thumb": "https://img.youtube.com/vi/MnLd2G198U8/maxresdefault.jpg",
	"AI-SEO-Service-Agency": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660432/tum40e6jql4tprb1xdos.webp",
	"AI-SEO-Service-Agency_dashboard": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660435/m4qzfagrvow7equ3agaa.webp",
	"AI-SEO-Service-Agency_letters": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660432/yvtbqutlrcsnuwuhxpgj.webp",
	"AI-SEO-Service-Agency_circuit": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660434/jzwl2bbavjust01fgiko.webp",
	"AI-SEO-Service-Agency_brain": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660431/dlo7vfpwnefk9bmh5ayz.webp",
	"shopify-seo-service-agency": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660422/vxq8tpzrevtvi4lnaa7x.webp",
	"shopify-seo-service-agency_growth": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
	"shopify-seo-service-agency_masonry_1": "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
	"shopify-seo-service-agency_masonry_2": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
	"shopify-seo-service-agency_masonry_3": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
	"shopify-seo-service-agency_masonry_4": "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=600&auto=format&fit=crop",
	"professional-video-editing-services": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660425/s5cubflg8cnoc2cskgz4.webp",
	"professional-video-editing-services_slider_1": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660426/b76psj7bgwpk25uraitp.webp",
	"professional-video-editing-services_slider_2": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660424/ntu5bk2fhvc3adjp2usq.webp",
	"professional-video-editing-services_slider_3": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660427/je9htoxpbrghkik5chie.webp",
	"professional-video-editing-services_slider_4": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660423/jn0pdqeikyynwyogzto3.webp",
	"professional-video-editing-services_slider_5": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop",
	"professional-video-editing-services_slider_6": "https://images.unsplash.com/photo-1579165466511-7f00cd047c6a?q=80&w=600&auto=format&fit=crop",
	"ppc-management-services": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660419/wcj5iuidup9zucqbjzzo.webp",
	"ppc-management-services_video": "MnLd2G198U8",
	"ppc-management-services_cta_img": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660419/wcj5iuidup9zucqbjzzo.webp",
	"social-media-marketing-agency": "https://img.youtube.com/vi/MnLd2G198U8/maxresdefault.jpg",
	"social-media-marketing-agency_video": "MnLd2G198U8",
	"shopify-website-development-service": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660422/vxq8tpzrevtvi4lnaa7x.webp",
	"custom-web-development-services": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660428/abejavjxa67nfy6xmz2m.webp",
	"wordpress-website-development-services": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660429/i0kviv1aoomxodxum4sx.webp",
	"content-writing-services": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660437/dmddcxgzfu5imfn7iebu.webp",
	"motion-graphics-services-company": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660417/jmh8msnlrxi3n6gatpz2.webp",
	"web-design-service": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660413/fgnpdrgye9vwwbiv7tsd.webp",
	"ai-seo": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660432/tum40e6jql4tprb1xdos.webp"
};

const SERVICE_MEDIA_FIELDS: Record<string, MediaField[]> = {
	"digital-marketing-agency": [
		{ key: "digital-marketing-agency", label: "Hero Image / Thumbnail", type: "image", fallback: "https://img.youtube.com/vi/Zey6npEA0KA/maxresdefault.jpg" },
		{ key: "digital-marketing-agency_video", label: "Hero YouTube Video ID", type: "video", fallback: "Zey6npEA0KA" },
		{ key: "digital-marketing-agency_why_video", label: "Why Choose Us YouTube Video ID", type: "video", fallback: "MnLd2G198U8" },
		{ key: "digital-marketing-agency_why_thumb", label: "Why Choose Us Video Thumbnail", type: "image", fallback: "https://img.youtube.com/vi/MnLd2G198U8/maxresdefault.jpg" }
	],
	"social-media-marketing-agency": [
		{ key: "social-media-marketing-agency", label: "Hero Image / Thumbnail", type: "image", fallback: "https://img.youtube.com/vi/MnLd2G198U8/maxresdefault.jpg" },
		{ key: "social-media-marketing-agency_video", label: "Hero YouTube Video ID", type: "video", fallback: "MnLd2G198U8" }
	],
	"ppc-management-services": [
		{ key: "ppc-management-services", label: "Hero Image / Thumbnail", type: "image", fallback: "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660419/wcj5iuidup9zucqbjzzo.webp" },
		{ key: "ppc-management-services_video", label: "Hero YouTube Video ID", type: "video", fallback: "MnLd2G198U8" },
		{ key: "ppc-management-services_cta_img", label: "CTA Banner Image", type: "image", fallback: "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660419/wcj5iuidup9zucqbjzzo.webp" }
	],
	"AI-SEO-Service-Agency": [
		{ key: "AI-SEO-Service-Agency", label: "Hero Image", type: "image", fallback: "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660432/tum40e6jql4tprb1xdos.webp" },
		{ key: "AI-SEO-Service-Agency_dashboard", label: "SEO Dashboard Image (Behind Success)", type: "image", fallback: "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660435/m4qzfagrvow7equ3agaa.webp" },
		{ key: "AI-SEO-Service-Agency_letters", label: "AI 3D Letters Image", type: "image", fallback: "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660432/yvtbqutlrcsnuwuhxpgj.webp" },
		{ key: "AI-SEO-Service-Agency_circuit", label: "AI Search Platforms Circuit Image", type: "image", fallback: "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660434/jzwl2bbavjust01fgiko.webp" },
		{ key: "AI-SEO-Service-Agency_brain", label: "GEO AI SEO Brain Image", type: "image", fallback: "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660431/dlo7vfpwnefk9bmh5ayz.webp" }
	],
	"shopify-seo-service-agency": [
		{ key: "shopify-seo-service-agency", label: "Hero Image", type: "image", fallback: "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660422/vxq8tpzrevtvi4lnaa7x.webp" },
		{ key: "shopify-seo-service-agency_growth", label: "eCommerce Growth Dashboard Image", type: "image", fallback: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" },
		{ key: "shopify-seo-service-agency_masonry_1", label: "Masonry Grid Image 1", type: "image", fallback: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop" },
		{ key: "shopify-seo-service-agency_masonry_2", label: "Masonry Grid Image 2", type: "image", fallback: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop" },
		{ key: "shopify-seo-service-agency_masonry_3", label: "Masonry Grid Image 3", type: "image", fallback: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop" },
		{ key: "shopify-seo-service-agency_masonry_4", label: "Masonry Grid Image 4", type: "image", fallback: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=600&auto=format&fit=crop" }
	],
	"professional-video-editing-services": [
		{ key: "professional-video-editing-services", label: "Hero Image", type: "image", fallback: "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660425/s5cubflg8cnoc2cskgz4.webp" },
		{ key: "professional-video-editing-services_slider_1", label: "Slider Image 1 (Post Production)", type: "image", fallback: "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660426/b76psj7bgwpk25uraitp.webp" },
		{ key: "professional-video-editing-services_slider_2", label: "Slider Image 2 (Corporate)", type: "image", fallback: "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660424/ntu5bk2fhvc3adjp2usq.webp" },
		{ key: "professional-video-editing-services_slider_3", label: "Slider Image 3 (Social Media)", type: "image", fallback: "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660427/je9htoxpbrghkik5chie.webp" },
		{ key: "professional-video-editing-services_slider_4", label: "Slider Image 4 (Commercial)", type: "image", fallback: "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660423/jn0pdqeikyynwyogzto3.webp" },
		{ key: "professional-video-editing-services_slider_5", label: "Slider Image 5 (Brand Story)", type: "image", fallback: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop" },
		{ key: "professional-video-editing-services_slider_6", label: "Slider Image 6 (Promotional)", type: "image", fallback: "https://images.unsplash.com/photo-1579165466511-7f00cd047c6a?q=80&w=600&auto=format&fit=crop" }
	]
};

export default function ServiceImagesEditor() {
	const { serviceImages, updateDocument } = useContent();
	const [form, setForm] = useState<Record<string, string>>({});
	const [activeTab, setActiveTab] = useState<string>("marketing");
	const [selectedId, setSelectedId] = useState<string>("digital-marketing-agency");
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		if (serviceImages) {
			setForm({ ...defaultServiceImages, ...serviceImages });
		} else {
			setForm(defaultServiceImages);
		}
	}, [serviceImages]);

	const handleSave = async () => {
		setSaving(true);
		try {
			await updateDocument("content", "service_images", { ...form });
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		} catch (error) {
			console.error("Save failed:", error);
			alert("Failed to save. Make sure your database rules are configured to allow writing to content/service_images.");
		} finally {
			setSaving(false);
		}
	};

	const handleReset = (key: string) => {
		setForm(prev => ({
			...prev,
			[key]: defaultServiceImages[key] || ""
		}));
	};

	const handleValueChange = (key: string, val: string) => {
		setForm(prev => ({
			...prev,
			[key]: val
		}));
	};

	const activeCategory = SERVICE_CATEGORIES.find(cat => cat.id === activeTab) || SERVICE_CATEGORIES[0];
	const selectedService = activeCategory.services.find(s => s.id === selectedId) || activeCategory.services[0];

	// Keep selected service valid when category tab changes
	useEffect(() => {
		if (activeCategory && !activeCategory.services.some(s => s.id === selectedId)) {
			setSelectedId(activeCategory.services[0].id);
		}
	}, [activeTab]);

	// Get registered fields for selected service, fallback to single Hero Image field
	const fields = SERVICE_MEDIA_FIELDS[selectedService?.id] || [
		{ key: selectedService?.id, label: "Hero Image", type: "image", fallback: defaultServiceImages[selectedService?.id] || "" }
	];

	return (
		<div className="space-y-8 max-w-6xl">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-black text-white mb-1">Service Page Media</h1>
					<p className="text-neutral-500 text-sm">Organize and edit images and video embeds for all service pages.</p>
				</div>
				<button
					onClick={handleSave}
					disabled={saving}
					className="self-start sm:self-auto flex items-center gap-2 px-6 py-2.5 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 text-sm disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-neon-green/10"
				>
					{saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
					{saved ? "Saved!" : "Save Changes"}
				</button>
			</div>

			{/* Category Tabs */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-white/5 pb-4">
				{SERVICE_CATEGORIES.map((cat) => {
					const Icon = cat.icon;
					const isActive = activeTab === cat.id;
					return (
						<button
							key={cat.id}
							onClick={() => setActiveTab(cat.id)}
							className={`text-left p-4 rounded-2xl border transition-all ${
								isActive
									? "bg-neutral-900 border-neon-green/30 shadow-lg"
									: "bg-neutral-950/40 border-white/5 hover:bg-neutral-900 hover:border-white/10"
							}`}
						>
							<div className="flex items-center gap-3">
								<div className={`p-2 rounded-xl ${isActive ? "bg-neon-green/10 text-neon-green" : "bg-neutral-900 text-neutral-500"}`}>
									<Icon className="w-5 h-5" />
								</div>
								<div>
									<h4 className="text-sm font-bold text-white leading-none mb-1">{cat.name}</h4>
									<p className="text-[10px] text-neutral-500 leading-none">{cat.description}</p>
								</div>
							</div>
						</button>
					);
				})}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Services List inside Category */}
				<div className="space-y-4">
					<h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Services in {activeCategory.name}</h3>
					<div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
						{activeCategory.services.map((service) => {
							const imgUrl = form[service.id] || SERVICE_MEDIA_FIELDS[service.id]?.[0]?.fallback;
							const isSelected = service.id === selectedId;
							const hasCustomFields = SERVICE_MEDIA_FIELDS[service.id]?.some(f => form[f.key] !== defaultServiceImages[f.key]);
							const isModified = serviceImages && (serviceImages[service.id] !== defaultServiceImages[service.id] || hasCustomFields);
							return (
								<button
									key={service.id}
									onClick={() => setSelectedId(service.id)}
									className={`w-full text-left p-3 rounded-xl border flex items-center gap-3 transition-all ${
										isSelected
											? "bg-neon-green/10 border-neon-green/30"
											: "bg-neutral-950/40 border-white/5 hover:bg-neutral-900 hover:border-white/10"
									}`}
								>
									<div className="w-14 h-9 rounded-lg overflow-hidden bg-neutral-900 border border-white/10 shrink-0">
										{imgUrl ? (
											<img
												src={imgUrl}
												alt=""
												className="w-full h-full object-cover"
												onError={(e) => {
													(e.target as HTMLImageElement).src = "https://placehold.co/80x60/111/333?text=Err";
												}}
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center text-[8px] text-neutral-500">N/A</div>
										)}
									</div>
									<div className="min-w-0 flex-1">
										<p className="text-xs font-bold text-white truncate">{service.name}</p>
										<div className="flex items-center gap-2 mt-1">
											<span className={`text-[9px] px-1.5 py-0.5 rounded leading-none ${service.hasVideo || SERVICE_MEDIA_FIELDS[service.id]?.some(f => f.type === "video") ? "bg-red-500/10 text-red-400" : "bg-neutral-800 text-neutral-500"}`}>
												{service.hasVideo || SERVICE_MEDIA_FIELDS[service.id]?.some(f => f.type === "video") ? "Video + Image" : "Image Only"}
											</span>
											{isModified && (
												<span className="text-[9px] text-cyan-400 font-medium">Customized</span>
											)}
										</div>
									</div>
								</button>
							);
						})}
					</div>
				</div>

				{/* Editing Panel */}
				{selectedService && (
					<div className="lg:col-span-2 space-y-6">
						<div className="bg-neutral-900/40 border border-white/5 rounded-2xl p-6 space-y-6">
							<div className="border-b border-white/5 pb-4">
								<span className="text-[10px] font-black text-neon-green uppercase tracking-widest">Selected Service Settings</span>
								<h2 className="text-xl font-black text-white mt-1">{selectedService.name}</h2>
								<p className="text-xs text-neutral-500 font-mono mt-0.5">ID: {selectedService.id}</p>
							</div>

							{/* Render All Configured Fields for Selected Service */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{fields.map((field) => {
									const val = form[field.key];
									const previewUrl = val || field.fallback;
									const isUsingFallback = !val && field.fallback;

									return (
										<div key={field.key} className="space-y-4 bg-neutral-950/30 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
											<div className="space-y-3">
												<div className="flex items-center justify-between">
													<h4 className="text-xs font-bold text-white flex items-center gap-2">
														{field.type === "video" ? (
															<Video className="w-3.5 h-3.5 text-red-400" />
														) : (
															<Image className="w-3.5 h-3.5 text-neon-green" />
														)}
														{field.label}
													</h4>
													{isUsingFallback && (
														<span className="text-[9px] text-neutral-500 bg-neutral-900 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
															Default Fallback
														</span>
													)}
												</div>

												{/* Preview */}
												<div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-950 border border-white/5 group flex items-center justify-center">
													{field.type === "video" ? (
														previewUrl ? (
															<iframe
																src={`https://www.youtube.com/embed/${previewUrl}?rel=0&modestbranding=1`}
																title="YouTube Preview"
																className="w-full h-full"
																allowFullScreen
															/>
														) : (
															<div className="w-full h-full flex flex-col items-center justify-center text-neutral-600 gap-2 bg-neutral-950">
																<Play className="w-8 h-8 text-neutral-500" />
																<span className="text-[10px]">No Video ID Configured</span>
															</div>
														)
													) : (
														previewUrl ? (
															<img
																src={previewUrl}
																alt={field.label}
																className="w-full h-full object-cover"
																onError={(e) => {
																	(e.target as HTMLImageElement).src = "https://placehold.co/600x400/111/333?text=Invalid+Image+URL";
																}}
															/>
														) : (
															<div className="w-full h-full flex flex-col items-center justify-center text-neutral-600 gap-2 bg-neutral-950">
																<AlertCircle className="w-8 h-8 text-neutral-500" />
																<span className="text-[10px]">No Image URL Configured</span>
															</div>
														)
													)}
												</div>

												{/* Input field */}
												<div className="space-y-1">
													<label className="text-[10px] font-bold text-neutral-500 uppercase">
														{field.type === "video" ? "YouTube Video ID" : "Image URL"}
													</label>
													<input
														type="text"
														value={val || ""}
														onChange={(e) => handleValueChange(field.key, e.target.value)}
														className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs font-mono focus:outline-none focus:border-neon-green/50"
														placeholder={field.placeholder || "Leave empty to use default"}
													/>
												</div>
											</div>

											{/* Action Buttons */}
											<div className="flex items-center gap-2 mt-4">
												{field.type === "image" && (
													<CloudinaryUploadButton
														onUploadSuccess={(url) => handleValueChange(field.key, url)}
														resourceType="image"
														label="Upload"
													/>
												)}
												<button
													type="button"
													onClick={() => handleReset(field.key)}
													className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-neutral-800/80 border border-white/5 rounded-lg hover:bg-neutral-700 cursor-pointer text-[11px] font-bold text-neutral-300 transition-all select-none"
												>
													<RotateCcw className="w-3 h-3 text-neutral-400" />
													<span>Reset</span>
												</button>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
