import { useState } from "react";
import { Upload, Loader2, AlertCircle } from "lucide-react";

interface CloudinaryUploadButtonProps {
	onUploadSuccess: (url: string) => void;
	resourceType?: "image" | "video" | "raw";
	label?: string;
	accept?: string;
	maxSizeKB?: number;
}

export default function CloudinaryUploadButton({
	onUploadSuccess,
	resourceType = "image",
	label = "Upload File",
	accept,
	maxSizeKB = 130,
}: CloudinaryUploadButtonProps) {
	const [loading, setLoading] = useState(false);

	const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
	const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

	const isConfigured = Boolean(cloudName && uploadPreset);

	if (!isConfigured) {
		return (
			<div className="flex items-center gap-1.5 text-[10px] text-neutral-500 mt-1">
				<AlertCircle className="w-3 h-3 text-amber-500/80" />
				<span>Configure storage settings in .env to enable uploads.</span>
			</div>
		);
	}

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		const file = files[0];

		// Check max file size limit for images (default: 130 KB)
		const maxBytes = (maxSizeKB || 130) * 1024;
		if (resourceType === "image" && file.size > maxBytes) {
			const currentKB = (file.size / 1024).toFixed(1);
			alert(`File size (${currentKB} KB) exceeds maximum allowed limit of ${maxSizeKB || 130} KB!\nPlease compress the image (e.g., convert to WebP) before uploading.`);
			e.target.value = "";
			return;
		}

		setLoading(true);

		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", uploadPreset);

		try {
			const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
				method: "POST",
				body: formData,
			});

			if (!res.ok) {
				const errorMsg = await res.text();
				throw new Error(errorMsg || "Upload failed");
			}

			const data = await res.json();
			if (data.secure_url) {
				onUploadSuccess(data.secure_url);
			} else {
				throw new Error("No secure URL returned");
			}
		} catch (error) {
			console.error("Storage upload error:", error);
			alert("Failed to upload file to WeBestOne storage. Please verify your storage configuration.");
		} finally {
			setLoading(false);
			e.target.value = ""; // Clear file selector
		}
	};

	return (
		<div className="mt-2">
			<label className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 cursor-pointer text-xs font-bold text-neutral-300 transition-all select-none disabled:opacity-50">
				{loading ? (
					<Loader2 className="w-3.5 h-3.5 animate-spin text-neon-green" />
				) : (
					<Upload className="w-3.5 h-3.5 text-neon-green" />
				)}
				<span>{loading ? "Uploading..." : label}</span>
				<input
					type="file"
					accept={accept || (resourceType === "image" ? "image/*" : resourceType === "video" ? "video/*" : "*")}
					onChange={handleFileChange}
					className="hidden"
					disabled={loading}
				/>
			</label>
		</div>
	);
}
