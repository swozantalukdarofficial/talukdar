import { useState, useEffect } from "react";
import { db } from "../../../lib/firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { Mail, Globe, Clock, Trash2, RefreshCw, MessageSquare, ShieldCheck, Download, User, ExternalLink, Phone, PhoneCall, MessageCircle, CheckSquare, Square, CheckCircle2 } from "lucide-react";

interface Lead {
	id: string;
	name?: string;
	email: string;
	website?: string;
	extractedPhone?: string;
	preferredTime?: string;
	hasRequestedContact?: boolean;
	status?: "pending" | "contacted";
	country?: string;
	countryCode?: string;
	city?: string;
	language: string;
	timestamp: string;
	messages?: { sender: string; text: string; timestamp: string }[];
}

import { useModal } from "../../../context/ModalContext";

function getExtractedPhone(lead: Lead): string {
	if (lead.extractedPhone) return lead.extractedPhone;
	if (!lead.messages) return "";
	const userText = lead.messages.map((m) => (m.sender === "user" ? m.text : "")).join(" ");
	const match = userText.match(/(\+?\d{1,4}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/g);
	return match ? match[0] : "";
}

function getExtractedTime(lead: Lead): string {
	if (lead.preferredTime) {
		const parts = lead.preferredTime.split(", ");
		return parts[parts.length - 1] || lead.preferredTime;
	}
	if (!lead.messages) return "";
	const userText = lead.messages
		.filter((m) => m.sender === "user")
		.map((m) => m.text)
		.join(" ");
	const match = userText.match(/(\b\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)\b|\b(?:morning|afternoon|evening|tonight|tomorrow)\b)/gi);
	if (!match) return "";
	const uniqueTimes = Array.from(new Set(match));
	return uniqueTimes[uniqueTimes.length - 1] || uniqueTimes[0];
}

function isContactRequested(lead: Lead): boolean {
	if (lead.hasRequestedContact) return true;
	if (getExtractedPhone(lead)) return true;
	if (getExtractedTime(lead)) return true;
	if (!lead.messages) return false;
	const userText = lead.messages.map((m) => (m.sender === "user" ? m.text : "")).join(" ").toLowerCase();
	return (
		userText.includes("contact") ||
		userText.includes("call") ||
		userText.includes("phone") ||
		userText.includes("whatsapp") ||
		userText.includes("reach out") ||
		userText.includes("mail")
	);
}

export default function LeadsEditor() {
	const { showConfirm } = useModal();
	const [leads, setLeads] = useState<Lead[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

	const toggleContactStatus = async (leadToToggle: Lead) => {
		const newStatus = leadToToggle.status === "contacted" ? "pending" : "contacted";

		setLeads((prev) =>
			prev.map((l) => (l.id === leadToToggle.id || l.email.toLowerCase() === leadToToggle.email.toLowerCase() ? { ...l, status: newStatus } : l))
		);
		if (selectedLead && (selectedLead.id === leadToToggle.id || selectedLead.email.toLowerCase() === leadToToggle.email.toLowerCase())) {
			setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
		}

		try {
			const localSaved = localStorage.getItem("webestone_chatbot_leads");
			if (localSaved) {
				const localLeads: Lead[] = JSON.parse(localSaved);
				const updated = localLeads.map((l) =>
					l.email.toLowerCase() === leadToToggle.email.toLowerCase() ? { ...l, status: newStatus } : l
				);
				localStorage.setItem("webestone_chatbot_leads", JSON.stringify(updated));
			}
		} catch (e) {
			console.warn("LocalStorage status update error:", e);
		}

		if (db && leadToToggle.id) {
			try {
				await updateDoc(doc(db, "chatbot_leads", leadToToggle.id), { status: newStatus });
			} catch (fsErr) {
				console.warn("Firestore status update error:", fsErr);
			}
		}
	};

	const fetchLeads = async () => {
		setIsLoading(true);
		try {
			const localSaved = localStorage.getItem("webestone_chatbot_leads");
			let localLeads: Lead[] = localSaved ? JSON.parse(localSaved) : [];

			if (db) {
				try {
					const q = query(collection(db, "chatbot_leads"), orderBy("timestamp", "desc"));
					const querySnapshot = await getDocs(q);
					const fsLeads: Lead[] = [];
					querySnapshot.forEach((docSnap) => {
						fsLeads.push({ id: docSnap.id, ...docSnap.data() } as Lead);
					});

					// Merge Firestore and LocalStorage leads without duplicates
					const leadMap = new Map<string, Lead>();
					[...fsLeads, ...localLeads].forEach((l) => {
						if (l.email) leadMap.set(l.email.toLowerCase(), l);
					});
					setLeads(Array.from(leadMap.values()));
				} catch (fsErr) {
					console.warn("Firestore fetch fallback to localStorage:", fsErr);
					setLeads(localLeads);
				}
			} else {
				setLeads(localLeads);
			}
		} catch (error) {
			console.error("Error fetching leads:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchLeads();
	}, []);

	const handleDelete = (leadId: string, email: string) => {
		showConfirm({
			title: "Delete Chatbot Lead?",
			message: `Are you sure you want to delete lead: ${email}?`,
			confirmText: "Delete",
			type: "danger",
			onConfirm: async () => {
				try {
					if (db) {
						try {
							await deleteDoc(doc(db, "chatbot_leads", leadId));
						} catch (e) {
							console.warn("Firestore delete fallback:", e);
						}
					}
					const localSaved = localStorage.getItem("webestone_chatbot_leads");
					if (localSaved) {
						const localLeads: Lead[] = JSON.parse(localSaved);
						const filtered = localLeads.filter((l) => l.email.toLowerCase() !== email.toLowerCase());
						localStorage.setItem("webestone_chatbot_leads", JSON.stringify(filtered));
					}
					setLeads((prev) => prev.filter((l) => l.email.toLowerCase() !== email.toLowerCase()));
					if (selectedLead?.id === leadId) setSelectedLead(null);
				} catch (err) {
					console.error("Delete lead error:", err);
				}
			},
		});
	};

	const exportCSV = () => {
		if (leads.length === 0) return;
		const headers = ["Name", "Email", "Website URL", "Language", "Timestamp", "Total Messages"];
		const rows = leads.map((l) => [
			`"${l.name || 'Visitor'}"`,
			`"${l.email}"`,
			`"${l.website || 'N/A'}"`,
			`"${l.language}"`,
			`"${l.timestamp}"`,
			`"${l.messages?.length || 0}"`,
		]);
		const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", `webestone_chatbot_leads_${new Date().toISOString().slice(0, 10)}.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="space-y-6">
			{/* Top Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-xl">
				<div>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-neon-green">
							<MessageSquare className="w-5 h-5" />
						</div>
						<div>
							<h1 className="text-xl font-bold text-white tracking-tight">AI Chatbot Captured Leads</h1>
							<p className="text-neutral-400 text-xs mt-0.5">
								Names, Emails, Website URLs, and Chat Logs captured by WeBestOne AI Assistant.
							</p>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<button
						onClick={fetchLeads}
						className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
					>
						<RefreshCw className="w-4 h-4" />
						Refresh
					</button>
					<button
						onClick={exportCSV}
						disabled={leads.length === 0}
						className="px-4 py-2.5 bg-neon-green hover:bg-neon-green/90 disabled:opacity-50 text-black rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-neon-green/20"
					>
						<Download className="w-4 h-4" />
						Export CSV
					</button>
				</div>
			</div>

			{/* Main Grid: Leads List & Conversation Log View */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				
				{/* Leads Table List */}
				<div className="lg:col-span-2 bg-neutral-900/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl">
					<div className="p-4 border-b border-white/5 flex items-center justify-between">
						<h2 className="text-white font-bold text-sm flex items-center gap-2">
							<ShieldCheck className="w-4 h-4 text-neon-green" />
							Total Captured Leads ({leads.length})
						</h2>
					</div>

					{isLoading ? (
						<div className="p-12 text-center text-neutral-400 text-xs">
							<div className="w-6 h-6 border-2 border-neon-green/30 border-t-neon-green rounded-full animate-spin mx-auto mb-3" />
							Loading chatbot leads...
						</div>
					) : leads.length === 0 ? (
						<div className="p-12 text-center text-neutral-500 text-xs">
							No AI chatbot leads captured yet. Visitors will appear here when they complete onboarding.
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full text-left text-xs">
								<thead className="bg-neutral-900/80 text-neutral-400 uppercase tracking-wider text-[10px] border-b border-white/5">
									<tr>
										<th className="py-3 px-4">Visitor Details</th>
										<th className="py-3 px-4">Website URL</th>
										<th className="py-3 px-4">Language</th>
										<th className="py-3 px-4">Captured Date</th>
										<th className="py-3 px-4 text-right">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-white/5 text-neutral-300">
									{leads.map((lead) => {
										const phone = getExtractedPhone(lead);
										const requested = isContactRequested(lead);

										return (
											<tr
												key={lead.id}
												onClick={() => setSelectedLead(lead)}
												className={`hover:bg-white/5 transition-colors cursor-pointer ${
													selectedLead?.id === lead.id ? "bg-neon-green/5 border-l-2 border-neon-green" : ""
												}`}
											>
												<td className="py-3.5 px-4">
													<div className="space-y-1">
														<div className="flex items-center gap-2 flex-wrap">
															<p className="font-bold text-white flex items-center gap-1.5">
																<User className="w-3.5 h-3.5 text-neon-green shrink-0" />
																{lead.name || "Visitor"}
															</p>

															{requested && (
																lead.status === "contacted" ? (
																	<button
																		onClick={(e) => {
																			e.stopPropagation();
																			toggleContactStatus(lead);
																		}}
																		className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 hover:bg-emerald-500/30 transition-colors cursor-pointer"
																		title="Click to mark as Pending"
																	>
																		<CheckCircle2 className="w-3 h-3 text-emerald-400" />
																		CONTACTED
																	</button>
																) : (
																	<button
																		onClick={(e) => {
																			e.stopPropagation();
																			toggleContactStatus(lead);
																		}}
																		className="inline-flex items-center gap-1 bg-neon-green/15 text-neon-green border border-neon-green/30 px-2 py-0.5 rounded-md text-[10px] font-bold animate-pulse shrink-0 hover:bg-neon-green/30 transition-colors cursor-pointer"
																		title="Click to mark as Contacted"
																	>
																		<Phone className="w-3 h-3" />
																		CONTACT REQUESTED
																	</button>
																)
															)}
														</div>

														<p className="text-neutral-400 text-[11px] flex items-center gap-1.5 pl-5">
															<Mail className="w-3 h-3 text-neutral-500 shrink-0" />
															{lead.email}
														</p>

														{phone && (
															<p className="text-neon-green text-[11px] font-bold flex items-center gap-1.5 pl-5">
																<PhoneCall className="w-3 h-3 text-neon-green shrink-0" />
																{phone}
															</p>
														)}

														{getExtractedTime(lead) && (
															<p className="text-amber-400 text-[11px] font-bold flex items-center gap-1.5 pl-5">
																<Clock className="w-3 h-3 text-amber-400 shrink-0" />
																Call Time: {getExtractedTime(lead)}
															</p>
														)}
													</div>
												</td>
											<td className="py-3.5 px-4 text-neutral-300">
												{lead.website && lead.website !== "N/A" ? (
													<a
														href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
														target="_blank"
														rel="noopener noreferrer"
														onClick={(e) => e.stopPropagation()}
														className="text-neon-green hover:underline inline-flex items-center gap-1 font-medium"
													>
														{lead.website.replace(/^https?:\/\//, "")}
														<ExternalLink className="w-3 h-3" />
													</a>
												) : (
													<span className="text-neutral-500 italic text-[11px]">N/A</span>
												)}
											</td>
											<td className="py-3.5 px-4">
												<span className="inline-flex items-center gap-1 bg-neutral-800 border border-white/10 px-2.5 py-1 rounded-full text-[11px] text-neutral-200 font-medium">
													<Globe className="w-3 h-3 text-neon-green shrink-0" />
													{lead.country && lead.country !== "Unknown"
														? `${lead.country}${lead.city ? ` (${lead.city})` : ""}`
														: lead.language || "Global"}
												</span>
											</td>
											<td className="py-3.5 px-4 text-neutral-400">
												<div className="flex items-center gap-1 text-[11px]">
													<Clock className="w-3 h-3 text-neutral-500" />
													{lead.timestamp}
												</div>
											</td>
											<td className="py-3.5 px-4 text-right">
												<button
													onClick={(e) => {
														e.stopPropagation();
														handleDelete(lead.id, lead.email);
													}}
													className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
													title="Delete Lead"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</td>
										</tr>
									);
								})}
								</tbody>
							</table>
						</div>
					)}
				</div>

				{/* Selected Lead Conversation Detail View */}
				<div className="bg-neutral-900/40 border border-white/5 rounded-2xl p-4 backdrop-blur-xl flex flex-col h-[520px]">
					<h3 className="text-white font-bold text-sm border-b border-white/5 pb-3 mb-3 flex items-center gap-2">
						<MessageSquare className="w-4 h-4 text-neon-green" />
						Lead Details & Chat Log
					</h3>

					{selectedLead ? (
						<div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs custom-scrollbar">
							{/* High Intent Contact Request Card */}
							{isContactRequested(selectedLead) && (
								<div className="p-3.5 bg-neon-green/10 border border-neon-green/30 rounded-xl space-y-2.5 shadow-sm">
									<div className="flex items-center justify-between">
										<span className="font-extrabold text-xs text-neon-green flex items-center gap-1.5 uppercase tracking-wide">
											<PhoneCall className="w-4 h-4 animate-pulse shrink-0" />
											High Intent Contact Request
										</span>
										<button
											onClick={() => toggleContactStatus(selectedLead)}
											className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
												selectedLead.status === "contacted"
													? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
													: "bg-neon-green hover:bg-neon-green/90 text-black shadow-md shadow-neon-green/20"
											}`}
											title="Toggle contact status"
										>
											{selectedLead.status === "contacted" ? (
												<>
													<CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
													<span>Contacted ✅</span>
												</>
											) : (
												<>
													<Square className="w-3.5 h-3.5 text-black shrink-0" />
													<span>Mark as Contacted</span>
												</>
											)}
										</button>
									</div>

									{getExtractedPhone(selectedLead) && (
										<div className="p-2 bg-neutral-950 rounded-lg border border-neon-green/20 flex items-center justify-between text-xs">
											<span className="text-neutral-400 text-[11px]">Extracted Phone:</span>
											<span className="text-neon-green font-mono font-bold text-xs">{getExtractedPhone(selectedLead)}</span>
										</div>
									)}

									{getExtractedTime(selectedLead) && (
										<div className="p-2 bg-neutral-950 rounded-lg border border-amber-500/20 flex items-center justify-between text-xs">
											<span className="text-neutral-400 text-[11px] flex items-center gap-1">
												<Clock className="w-3.5 h-3.5 text-amber-400" />
												Preferred Call Time:
											</span>
											<span className="text-amber-400 font-bold text-xs">{getExtractedTime(selectedLead)}</span>
										</div>
									)}

									{!getExtractedPhone(selectedLead) && !getExtractedTime(selectedLead) && (
										<p className="text-neutral-300 text-[11px] leading-snug">
											Visitor requested contact in chat. Email: <strong className="text-white">{selectedLead.email}</strong>
										</p>
									)}

									<div className="flex items-center gap-2 pt-1">
										{getExtractedPhone(selectedLead) && (
											<a
												href={`https://wa.me/${getExtractedPhone(selectedLead).replace(/[^0-9+]/g, "")}`}
												target="_blank"
												rel="noopener noreferrer"
												className="flex-1 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-black text-[11px] font-extrabold rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
											>
												<MessageCircle className="w-4 h-4" />
												WhatsApp
											</a>
										)}
										<a
											href={`mailto:${selectedLead.email}`}
											className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 border border-white/10 transition-all cursor-pointer"
										>
											<Mail className="w-3.5 h-3.5 text-neon-green" />
											Send Email
										</a>
									</div>
								</div>
							)}

							<div className="p-3 bg-neutral-900 rounded-xl border border-white/5 space-y-1.5 text-[11px]">
								<p className="text-neutral-400 flex items-center justify-between">
									<strong className="text-white">Visitor Name:</strong>
									<span className="text-neon-green font-bold">{selectedLead.name || "Visitor"}</span>
								</p>
								<p className="text-neutral-400 flex items-center justify-between">
									<strong className="text-white">Email Address:</strong>
									<span className="text-white font-medium">{selectedLead.email}</span>
								</p>
								<p className="text-neutral-400 flex items-center justify-between">
									<strong className="text-white">Website URL:</strong>
									{selectedLead.website && selectedLead.website !== "N/A" ? (
										<a
											href={selectedLead.website.startsWith("http") ? selectedLead.website : `https://${selectedLead.website}`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-neon-green hover:underline inline-flex items-center gap-1 font-semibold"
										>
											{selectedLead.website}
											<ExternalLink className="w-3 h-3" />
										</a>
									) : (
										<span className="text-neutral-500 italic">Not provided</span>
									)}
								</p>
								<p className="text-neutral-400 flex items-center justify-between">
									<strong className="text-white">Detected Location:</strong>
									<span className="text-neon-green font-semibold">
										{selectedLead.country && selectedLead.country !== "Unknown"
											? `${selectedLead.country}${selectedLead.city ? ` (${selectedLead.city})` : ""}`
											: "Global / Unknown"}
									</span>
								</p>
								<p className="text-neutral-400 flex items-center justify-between">
									<strong className="text-white">Captured Time:</strong>
									<span className="text-neutral-400 text-[10px]">{selectedLead.timestamp}</span>
								</p>
							</div>

							<div className="pt-2">
								<p className="text-neutral-400 font-bold text-[11px] mb-2">Conversation Log:</p>
								{selectedLead.messages && selectedLead.messages.length > 0 ? (
									<div className="space-y-2">
										{selectedLead.messages.map((m, idx) => (
											<div
												key={idx}
												className={`p-3 rounded-xl ${
													m.sender === "user"
														? "bg-neon-green/10 border border-neon-green/20 text-white ml-4"
														: "bg-neutral-900 border border-white/5 text-neutral-300 mr-4"
												}`}
											>
												<p className="font-bold text-[10px] text-neon-green mb-1">
													{m.sender === "user" ? (selectedLead.name || "Visitor") : "WeBestOne AI"}
												</p>
												<p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
											</div>
										))}
									</div>
								) : (
									<p className="text-neutral-500 text-center text-xs py-8">
										No messages logged yet for this lead.
									</p>
								)}
							</div>
						</div>
					) : (
						<div className="flex-1 flex items-center justify-center text-neutral-500 text-xs text-center p-6">
							Click any lead from the left table to inspect their complete profile and conversation log.
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
