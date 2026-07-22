import React, { useState, useRef, useEffect } from "react";
import {
	Bold,
	Italic,
	Underline,
	Strikethrough,
	AlignLeft,
	AlignCenter,
	AlignRight,
	AlignJustify,
	List,
	ListOrdered,
	CheckSquare,
	Table as TableIcon,
	Image as ImageIcon,
	Link as LinkIcon,
	Quote,
	Code,
	Code2,
	Eye,
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Type,
	Plus,
	Upload,
	Check
} from "lucide-react";
import CloudinaryUploadButton from "./CloudinaryUploadButton";

interface RichTextBlogEditorProps {
	value: string;
	onChange: (value: string) => void;
}

export default function RichTextBlogEditor({ value, onChange }: RichTextBlogEditorProps) {
	const [mode, setMode] = useState<"visual" | "code">("visual");
	const editorRef = useRef<HTMLDivElement>(null);
	const [showImageModal, setShowImageModal] = useState(false);
	const [imageUrl, setImageUrl] = useState("");
	const [imageAlt, setImageAlt] = useState("");
	const [showLinkModal, setShowLinkModal] = useState(false);
	const [linkUrl, setLinkUrl] = useState("");
	const [linkText, setLinkText] = useState("");

	// Keep editor content in sync when entering visual mode or external prop change
	useEffect(() => {
		if (editorRef.current && editorRef.current.innerHTML !== value) {
			editorRef.current.innerHTML = value || "<p><br></p>";
		}
	}, [value, mode]);

	const exec = (command: string, value: string | undefined = undefined) => {
		document.execCommand(command, false, value);
		if (editorRef.current) {
			onChange(editorRef.current.innerHTML);
		}
	};

	const handleEditorInput = () => {
		if (editorRef.current) {
			onChange(editorRef.current.innerHTML);
		}
	};

	const applyFormatBlock = (headingTag: string) => {
		exec("formatBlock", `<${headingTag}>`);
	};

	const insertHTML = (htmlSnippet: string) => {
		if (mode === "code") {
			onChange(value + "\n" + htmlSnippet);
			return;
		}

		if (editorRef.current) {
			editorRef.current.focus();
			const sel = window.getSelection();
			if (sel && sel.rangeCount > 0) {
				const range = sel.getRangeAt(0);
				range.deleteContents();
				const el = document.createElement("div");
				el.innerHTML = htmlSnippet;
				const frag = document.createDocumentFragment();
				let node;
				while ((node = el.firstChild)) {
					frag.appendChild(node);
				}
				range.insertNode(frag);
			} else {
				editorRef.current.innerHTML += htmlSnippet;
			}
			onChange(editorRef.current.innerHTML);
		}
	};

	const handleInsertTable = () => {
		const tableHTML = `
<table className="w-full text-left border-collapse my-6 border border-white/10 rounded-xl overflow-hidden">
  <thead>
    <tr className="bg-white/10 text-neon-green">
      <th className="p-3 border border-white/10 font-bold">Header 1</th>
      <th className="p-3 border border-white/10 font-bold">Header 2</th>
      <th className="p-3 border border-white/10 font-bold">Header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-white/5">
      <td className="p-3 border border-white/10">Row 1, Cell 1</td>
      <td className="p-3 border border-white/10">Row 1, Cell 2</td>
      <td className="p-3 border border-white/10">Row 1, Cell 3</td>
    </tr>
    <tr className="border-b border-white/5">
      <td className="p-3 border border-white/10">Row 2, Cell 1</td>
      <td className="p-3 border border-white/10">Row 2, Cell 2</td>
      <td className="p-3 border border-white/10">Row 2, Cell 3</td>
    </tr>
  </tbody>
</table>
<p><br></p>
`;
		insertHTML(tableHTML);
	};

	const handleInsertChecklist = () => {
		const checklistHTML = `
<ul className="space-y-2 my-4 pl-0 list-none">
  <li className="flex items-center gap-2 text-white">✅ <span>Key Point 1</span></li>
  <li className="flex items-center gap-2 text-white">✅ <span>Key Point 2</span></li>
  <li className="flex items-center gap-2 text-white">✅ <span>Key Point 3</span></li>
</ul>
<p><br></p>
`;
		insertHTML(checklistHTML);
	};

	const handleInsertImage = () => {
		if (!imageUrl) return;
		const imgHTML = `
<figure className="my-6 text-center">
  <img src="${imageUrl}" alt="${imageAlt || "Blog image"}" className="w-full max-h-[500px] object-cover rounded-2xl border border-white/10 shadow-2xl mx-auto" />
  ${imageAlt ? `<figcaption className="text-xs text-neutral-500 mt-2 italic">${imageAlt}</figcaption>` : ""}
</figure>
<p><br></p>
`;
		insertHTML(imgHTML);
		setImageUrl("");
		setImageAlt("");
		setShowImageModal(false);
	};

	const handleInsertLink = () => {
		if (!linkUrl) return;
		const linkHTML = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" className="text-neon-green font-bold underline hover:text-white transition-colors">${linkText || linkUrl}</a>`;
		insertHTML(linkHTML);
		setLinkUrl("");
		setLinkText("");
		setShowLinkModal(false);
	};

	return (
		<div className="border border-white/15 rounded-2xl overflow-hidden bg-neutral-950 shadow-xl">
			{/* Editor Top Control Toolbar */}
			<div className="bg-neutral-900 border-b border-white/10 p-2.5 flex flex-wrap items-center justify-between gap-2 select-none">
				{/* Formatting Group */}
				<div className="flex items-center flex-wrap gap-1">
					{/* Heading Selector Dropdown */}
					<div className="relative">
						<select
							onChange={(e) => applyFormatBlock(e.target.value)}
							className="bg-white/5 border border-white/10 text-white text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-neon-green/50 cursor-pointer"
							defaultValue="p"
						>
							<option value="p" className="bg-neutral-900 text-white">Paragraph (P)</option>
							<option value="h1" className="bg-neutral-900 text-white">Heading 1 (H1)</option>
							<option value="h2" className="bg-neutral-900 text-white">Heading 2 (H2)</option>
							<option value="h3" className="bg-neutral-900 text-white">Heading 3 (H3)</option>
							<option value="h4" className="bg-neutral-900 text-white">Heading 4 (H4)</option>
						</select>
					</div>

					<div className="w-px h-5 bg-white/10 mx-1" />

					{/* Bold / Italic / Underline / Strike */}
					<button
						type="button"
						onClick={() => exec("bold")}
						className="p-1.5 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
						title="Bold (Ctrl+B)"
					>
						<Bold className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => exec("italic")}
						className="p-1.5 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
						title="Italic (Ctrl+I)"
					>
						<Italic className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => exec("underline")}
						className="p-1.5 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
						title="Underline (Ctrl+U)"
					>
						<Underline className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => exec("strikeThrough")}
						className="p-1.5 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
						title="Strikethrough"
					>
						<Strikethrough className="w-4 h-4" />
					</button>

					<div className="w-px h-5 bg-white/10 mx-1" />

					{/* Alignment */}
					<button
						type="button"
						onClick={() => exec("justifyLeft")}
						className="p-1.5 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
						title="Align Left"
					>
						<AlignLeft className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => exec("justifyCenter")}
						className="p-1.5 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
						title="Align Center"
					>
						<AlignCenter className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => exec("justifyRight")}
						className="p-1.5 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
						title="Align Right"
					>
						<AlignRight className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => exec("justifyFull")}
						className="p-1.5 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
						title="Justify"
					>
						<AlignJustify className="w-4 h-4" />
					</button>

					<div className="w-px h-5 bg-white/10 mx-1" />

					{/* Lists */}
					<button
						type="button"
						onClick={() => exec("insertUnorderedList")}
						className="p-1.5 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
						title="Bullet List"
					>
						<List className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => exec("insertOrderedList")}
						className="p-1.5 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
						title="Numbered List"
					>
						<ListOrdered className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={handleInsertChecklist}
						className="p-1.5 text-neon-green hover:bg-neon-green/10 rounded-lg transition-all flex items-center gap-1 text-xs font-bold"
						title="Insert Checkpoint List"
					>
						<CheckSquare className="w-4 h-4" />
						<span className="hidden sm:inline">Checklist</span>
					</button>

					<div className="w-px h-5 bg-white/10 mx-1" />

					{/* Table */}
					<button
						type="button"
						onClick={handleInsertTable}
						className="p-1.5 text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all flex items-center gap-1 text-xs font-bold"
						title="Insert Table"
					>
						<TableIcon className="w-4 h-4" />
						<span className="hidden sm:inline">Table</span>
					</button>

					{/* Inline Image Upload */}
					<button
						type="button"
						onClick={() => setShowImageModal(true)}
						className="p-1.5 text-purple-400 hover:bg-purple-400/10 rounded-lg transition-all flex items-center gap-1 text-xs font-bold"
						title="Upload & Insert Image"
					>
						<ImageIcon className="w-4 h-4" />
						<span className="hidden sm:inline">Add Image</span>
					</button>

					{/* Link */}
					<button
						type="button"
						onClick={() => setShowLinkModal(true)}
						className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
						title="Insert Link"
					>
						<LinkIcon className="w-4 h-4" />
					</button>

					{/* Quote & Code */}
					<button
						type="button"
						onClick={() => exec("formatBlock", "<blockquote>")}
						className="p-1.5 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
						title="Blockquote"
					>
						<Quote className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => exec("formatBlock", "<pre>")}
						className="p-1.5 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
						title="Code Block"
					>
						<Code className="w-4 h-4" />
					</button>
				</div>

				{/* Visual / HTML Switcher */}
				<div className="flex items-center bg-black/50 p-1 rounded-xl border border-white/10">
					<button
						type="button"
						onClick={() => setMode("visual")}
						className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
							mode === "visual" ? "bg-neon-green text-black shadow-md" : "text-neutral-400 hover:text-white"
						}`}
					>
						<Eye className="w-3.5 h-3.5" />
						<span>Visual</span>
					</button>
					<button
						type="button"
						onClick={() => setMode("code")}
						className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
							mode === "code" ? "bg-neon-green text-black shadow-md" : "text-neutral-400 hover:text-white"
						}`}
					>
						<Code2 className="w-3.5 h-3.5" />
						<span>HTML Code</span>
					</button>
				</div>
			</div>

			{/* Main Editor Body Area */}
			{mode === "visual" ? (
				<div
					ref={editorRef}
					contentEditable
					onInput={handleEditorInput}
					className="min-h-[350px] max-h-[600px] overflow-y-auto p-6 text-white text-base leading-relaxed focus:outline-none prose prose-invert max-w-none
						[&_h1]:text-3xl [&_h1]:font-black [&_h1]:text-white [&_h1]:mb-4 [&_h1]:mt-6
						[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mb-3 [&_h2]:mt-6
						[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mb-2 [&_h3]:mt-4
						[&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-neon-green [&_h4]:mb-2
						[&_p]:mb-4 [&_p]:text-neutral-300
						[&_a]:text-neon-green [&_a]:underline [&_a]:font-bold
						[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1
						[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1
						[&_blockquote]:border-l-4 [&_blockquote]:border-neon-green [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:bg-white/5 [&_blockquote]:rounded-r-xl
						[&_pre]:bg-neutral-900 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:font-mono [&_pre]:text-xs [&_pre]:my-4
						[&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_th]:border [&_th]:border-white/20 [&_th]:p-2 [&_td]:border [&_td]:border-white/10 [&_td]:p-2"
				/>
			) : (
				<textarea
					value={value}
					onChange={(e) => onChange(e.target.value)}
					rows={18}
					className="w-full p-6 bg-neutral-950 text-neon-green font-mono text-xs focus:outline-none resize-none leading-relaxed"
					placeholder="<p>HTML formatted post content...</p>"
				/>
			)}

			{/* Insert Image Modal */}
			{showImageModal && (
				<div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
					<div className="bg-neutral-900 border border-white/10 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
						<div className="flex items-center justify-between border-b border-white/10 pb-3">
							<h3 className="text-base font-bold text-white flex items-center gap-2">
								<ImageIcon className="w-5 h-5 text-purple-400" />
								Upload & Insert Image
							</h3>
							<button onClick={() => setShowImageModal(false)} className="text-neutral-400 hover:text-white">✕</button>
						</div>

						<div className="space-y-3">
							<div className="space-y-1.5">
								<label className="text-xs font-bold text-neutral-400">Image URL</label>
								<input
									type="text"
									value={imageUrl}
									onChange={(e) => setImageUrl(e.target.value)}
									placeholder="https://..."
									className="w-full bg-neutral-950 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-neon-green/50"
								/>
							</div>
							<div className="space-y-1.5">
								<label className="text-xs font-bold text-neutral-400">Upload Fresh Image</label>
								<CloudinaryUploadButton
									onUploadSuccess={(url) => setImageUrl(url)}
									resourceType="image"
									label="Choose File to Upload"
								/>
							</div>
							<div className="space-y-1.5">
								<label className="text-xs font-bold text-neutral-400">Alt Text / Caption (Optional)</label>
								<input
									type="text"
									value={imageAlt}
									onChange={(e) => setImageAlt(e.target.value)}
									placeholder="e.g. Infographic diagram"
									className="w-full bg-neutral-950 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-neon-green/50"
								/>
							</div>
						</div>

						<div className="flex justify-end gap-2 pt-2 border-t border-white/10">
							<button onClick={() => setShowImageModal(false)} className="px-4 py-2 text-xs font-bold text-neutral-400 hover:text-white">Cancel</button>
							<button
								onClick={handleInsertImage}
								disabled={!imageUrl}
								className="px-5 py-2 bg-neon-green text-black font-bold text-xs rounded-xl hover:bg-neon-green/90 transition-all disabled:opacity-50"
							>
								Insert Image
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Insert Link Modal */}
			{showLinkModal && (
				<div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
					<div className="bg-neutral-900 border border-white/10 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
						<div className="flex items-center justify-between border-b border-white/10 pb-3">
							<h3 className="text-base font-bold text-white flex items-center gap-2">
								<LinkIcon className="w-5 h-5 text-blue-400" />
								Insert Hyperlink
							</h3>
							<button onClick={() => setShowLinkModal(false)} className="text-neutral-400 hover:text-white">✕</button>
						</div>

						<div className="space-y-3">
							<div className="space-y-1.5">
								<label className="text-xs font-bold text-neutral-400">Link Address (URL)</label>
								<input
									type="text"
									value={linkUrl}
									onChange={(e) => setLinkUrl(e.target.value)}
									placeholder="https://webestone.com/services/..."
									className="w-full bg-neutral-950 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-neon-green/50"
								/>
							</div>
							<div className="space-y-1.5">
								<label className="text-xs font-bold text-neutral-400">Link Display Text</label>
								<input
									type="text"
									value={linkText}
									onChange={(e) => setLinkText(e.target.value)}
									placeholder="e.g. View Shopify SEO Services"
									className="w-full bg-neutral-950 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-neon-green/50"
								/>
							</div>
						</div>

						<div className="flex justify-end gap-2 pt-2 border-t border-white/10">
							<button onClick={() => setShowLinkModal(false)} className="px-4 py-2 text-xs font-bold text-neutral-400 hover:text-white">Cancel</button>
							<button
								onClick={handleInsertLink}
								disabled={!linkUrl}
								className="px-5 py-2 bg-neon-green text-black font-bold text-xs rounded-xl hover:bg-neon-green/90 transition-all disabled:opacity-50"
							>
								Insert Link
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
