import { useState, useEffect } from "react";
import { useContent } from "../../context/ContentContext";
import { useAuth } from "../../context/AuthContext";
import { Save, Check, Image as ImageIcon, RotateCcw, X, Loader2, Edit } from "lucide-react";
import CloudinaryUploadButton from "./CloudinaryUploadButton";

interface AdminServiceImageEditorProps {
	serviceId: string;
}

const defaultServiceImages: Record<string, string> = {
	"digital-marketing-agency": "https://img.youtube.com/vi/Zey6npEA0KA/maxresdefault.jpg",
	"AI-SEO-Service-Agency": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660432/tum40e6jql4tprb1xdos.webp",
	"shopify-seo-service-agency": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660422/vxq8tpzrevtvi4lnaa7x.webp",
	"professional-video-editing-services": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660425/s5cubflg8cnoc2cskgz4.webp",
	"ppc-management-services": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660419/wcj5iuidup9zucqbjzzo.webp",
	"social-media-marketing-agency": "https://img.youtube.com/vi/MnLd2G198U8/maxresdefault.jpg",
	"shopify-website-development-service": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660422/vxq8tpzrevtvi4lnaa7x.webp",
	"custom-web-development-services": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660428/abejavjxa67nfy6xmz2m.webp",
	"wordpress-website-development-services": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660429/i0kviv1aoomxodxum4sx.webp",
	"content-writing-services": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660437/dmddcxgzfu5imfn7iebu.webp",
	"motion-graphics-services-company": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660417/jmh8msnlrxi3n6gatpz2.webp",
	"web-design-service": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660413/fgnpdrgye9vwwbiv7tsd.webp",
	"ai-seo": "https://res.cloudinary.com/dh9xvwyvs/image/upload/v1784660432/tum40e6jql4tprb1xdos.webp"
};

export default function AdminServiceImageEditor({ serviceId }: AdminServiceImageEditorProps) {
	const { user } = useAuth();
	const { serviceImages, updateDocument } = useContent();
	const [isOpen, setIsOpen] = useState(false);
	const [imageUrl, setImageUrl] = useState("");
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	// Sync local state with context when context loads or changes
	useEffect(() => {
		if (serviceImages && serviceImages[serviceId]) {
			setImageUrl(serviceImages[serviceId]);
		} else {
			setImageUrl(defaultServiceImages[serviceId] || "");
		}
	}, [serviceImages, serviceId]);

	if (!user) return null;

	const handleSave = async () => {
		setSaving(true);
		try {
			const updatedImages = {
				...serviceImages,
				[serviceId]: imageUrl
			};
			await updateDocument("content", "service_images", updatedImages);
			setSaved(true);
			setTimeout(() => {
				setSaved(false);
				setIsOpen(false);
			}, 1500);
		} catch (error) {
			console.error("Save service image failed:", error);
			alert("Failed to save image. Please check your network and try again.");
		} finally {
			setSaving(false);
		}
	};

	const handleReset = () => {
		const defaultUrl = defaultServiceImages[serviceId] || "";
		setImageUrl(defaultUrl);
	};

	return (
		<>
			{/* Floating Edit Button */}
			<button
				onClick={() => setIsOpen(true)}
				className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-neutral-900/90 text-white font-bold rounded-full border border-neon-green/40 shadow-[0_0_20px_rgba(135,230,92,0.25)] hover:border-neon-green hover:shadow-[0_0_30px_rgba(135,230,92,0.45)] hover:scale-105 transition-all duration-300 cursor-pointer text-xs uppercase tracking-wider backdrop-blur-md group"
			>
				<Edit className="w-4 h-4 text-neon-green group-hover:rotate-12 transition-transform duration-300" />
				<span>Edit Hero Image</span>
			</button>

			{/* Modal Dialog */}
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
					<div className="w-full max-w-lg bg-neutral-950 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative">
						
						{/* Close Button */}
						<button
							onClick={() => setIsOpen(false)}
							className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
						>
							<X className="w-4 h-4" />
						</button>

						{/* Header */}
						<div>
							<h3 className="text-xl font-black text-white mb-1">Edit Page Image</h3>
							<p className="text-neutral-500 text-xs font-mono">{serviceId}</p>
						</div>

						{/* Preview */}
						<div className="space-y-2">
							<label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Live Preview</label>
							<div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-inner flex items-center justify-center">
								{imageUrl ? (
									<img
										src={imageUrl}
										alt="Preview"
										className="w-full h-full object-cover"
										onError={(e) => {
											(e.target as HTMLImageElement).src = "https://placehold.co/600x400/111/333?text=Invalid+Image+URL";
										}}
									/>
								) : (
									<div className="flex flex-col items-center justify-center text-neutral-600 gap-2 text-sm">
										<ImageIcon className="w-8 h-8 text-neutral-500" />
										<span>No Image URL Provided</span>
									</div>
								)}
							</div>
						</div>

						{/* Inputs & Actions */}
						<div className="space-y-4">
							<div className="space-y-2">
								<label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Image URL</label>
								<input
									type="text"
									value={imageUrl}
									onChange={(e) => setImageUrl(e.target.value)}
									placeholder="https://res.cloudinary.com/..."
									className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs font-mono focus:outline-none focus:border-neon-green/50"
								/>
							</div>

							<div className="flex flex-wrap items-center gap-3">
								<CloudinaryUploadButton
									onUploadSuccess={(url) => setImageUrl(url)}
									resourceType="image"
									label="Upload via Cloudinary"
								/>
								
								<button
									type="button"
									onClick={handleReset}
									className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 border border-white/5 rounded-lg hover:bg-neutral-800 cursor-pointer text-xs font-bold text-neutral-400 hover:text-white transition-all select-none"
								>
									<RotateCcw className="w-3.5 h-3.5" />
									<span>Reset Default</span>
								</button>
							</div>
						</div>

						{/* Save / Close buttons */}
						<div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
							<button
								onClick={() => setIsOpen(false)}
								className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer border border-white/5"
							>
								Cancel
							</button>
							<button
								onClick={handleSave}
								disabled={saving}
								className="flex items-center gap-2 px-6 py-2.5 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 text-xs disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-neon-green/10"
							>
								{saving ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : saved ? (
									<Check className="w-4 h-4" />
								) : (
									<Save className="w-4 h-4" />
								)}
								{saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
							</button>
						</div>

					</div>
				</div>
			)}
		</>
	);
}
