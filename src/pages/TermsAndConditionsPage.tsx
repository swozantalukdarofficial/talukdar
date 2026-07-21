import { Link } from "react-router-dom";
import { Scale, ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { useEffect } from "react";
import SEO from "../components/SEO";

type Section = {
	id: number;
	title: string;
	content: string;
	bullets?: string[];
	afterBullets?: string;
};

const sections: Section[] = [
	{
		id: 1,
		title: "Introduction",
		content: `This document serves as a formal agreement between WeBestOne and any individual, business, or organization using our services or platforms. Using our website or requesting our services indicates that you understand and accept the policies and conditions outlined within this agreement. Anyone who does not accept these conditions should avoid using the website, platforms, or related services provided by WeBestOne.`,
	},
	{
		id: 2,
		title: "Services Provided",
		content: `WeBestOne delivers a broad range of digital and creative services, including marketing strategy, website development, branding, automation systems, content production, and AI supported business solutions. The scope, timeline, and pricing of each project will be clearly defined in an official written agreement or proposal before the commencement of work.`,
	},
	{
		id: 3,
		title: "Intellectual Property Rights",
		content: `All content, materials, graphics, logos, text, designs, concepts, and software created or displayed on this website are the exclusive intellectual property of WeBestOne unless otherwise stated. No content from this website or any of our deliverables may be reproduced, distributed, modified, transmitted, or used for commercial purposes without prior written consent from WeBestOne. Any client materials provided to WeBestOne for project purposes remain the intellectual property of the client.`,
	},
	{
		id: 4,
		title: "Payment Terms",
		content: `All projects and services require a signed proposal or agreement before work begins. Payment schedules, methods, and deadlines will be clearly defined in each contract. Payments are due according to the agreed schedule. Late payments may result in delayed project timelines or temporary suspension of services until outstanding balances are cleared. All deposits and completed milestone payments are considered non-refundable unless otherwise specified in writing.`,
	},
	{
		id: 5,
		title: "Client Responsibilities",
		content: `The client agrees to provide accurate, complete, and timely information required for the successful execution of the project. The client is responsible for reviewing all deliverables within the given review period and providing clear feedback. Failure to provide necessary content, approvals, or information may delay project delivery and affect timelines.`,
	},
	{
		id: 6,
		title: "Confidentiality",
		content: `WeBestOne agrees to treat all information shared by the client as confidential and to use it solely for project purposes. Confidential information will not be disclosed to any third party without the client’s written consent, unless required by law. Similarly, the client agrees not to disclose any confidential business information, processes, or proprietary materials belonging to WeBestOne.`,
	},
	{
		id: 7,
		title: "Limitation of Liability",
		content: `Although WeBestOne works to maintain reliable and professional service standards, we cannot be held liable for indirect losses, financial interruption, data issues, or business impacts connected to the use of our services, platforms, or digital materials. Any liability connected to a specific project or service will remain limited to the amount directly paid for that individual service agreement.`,
	},
	{
		id: 8,
		title: "Revisions and Modifications",
		content: `Project revisions or modifications are allowed only as per the terms mentioned in the signed agreement. Additional revisions or expanded project requirements outside the approved scope may involve updated timelines, revised pricing, and confirmation from both parties before implementation.`,
	},
	{
		id: 9,
		title: "Termination Policy",
		content: `Either party may terminate a project or agreement with written notice under the following circumstances:`,
		bullets: [
			"Breach of contract by either party",
			"Non-payment or consistent delay in payments",
			"Mutual consent between the client and WeBestOne",
		],
		afterBullets: "Upon termination, the client will be responsible for payment for all work completed up to the termination date.",
	},
	{
		id: 10,
		title: "External Platforms, Software, and Integrations",
		content: `WeBestOne may integrate third party tools, plugins, software, or services into a client’s project when necessary. We do not hold responsibility for the functionality, pricing, or policy changes of any external service provider.`,
	},
	{
		id: 11,
		title: "Policy Revisions and Future Changes",
		content: `WeBestOne may revise, expand, or adjust these terms whenever operational, legal, or service-related updates become necessary. All updates will be published on this page, and the revised date will indicate the effective version. Ongoing use of the website or related services after updates are published will be interpreted as acceptance of the revised terms.`,
	},
	{
		id: 12,
		title: "Governing Law",
		content: `This agreement will operate under the applicable laws and legal regulations of Western Australia, Australia. Any legal matter connected to these terms will be handled through the courts and legal authorities located in Perth, Western Australia.`,
	},
	{
		id: 13,
		title: "Contact Information",
		content: `For any questions or clarifications regarding these Terms and Conditions, please contact us through:`,
	},
];

export default function TermsAndConditionsPage() {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return (
		<main className="relative min-h-screen pt-32 pb-24 bg-black text-white">
			<SEO 
				title="Terms and Conditions - WeBestOne" 
				description="Read the terms and conditions for using WeBestOne's digital marketing and web development services." 
			/>
			{/* Background glows */}
			<div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

			<div className="relative z-10 max-w-4xl mx-auto px-6">
				{/* Back link */}
				<Link
					to="/"
					className="inline-flex items-center gap-2 text-neutral-400 hover:text-neon-green transition-colors text-sm mb-10 group"
				>
					<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
					Back to Home
				</Link>

				{/* Header */}
				<div className="mb-12">
					<div className="inline-flex items-center gap-2 text-neon-green text-sm font-medium bg-neon-green/10 border border-neon-green/20 rounded-full px-4 py-1.5 mb-6">
						<Scale className="w-4 h-4" />
						Legal Document
					</div>
					<h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
						Terms &amp; Conditions
					</h1>
					<p className="text-neutral-400">
						<span className="font-semibold text-neutral-300">
							Effective Date:
						</span>{" "}
						June 20, 2026
					</p>
					<p className="text-neutral-400 mt-4 leading-relaxed">
						Welcome to WeBestOne. These terms outline the rules, responsibilities, and conditions connected to the use of the WeBestOne website, digital platforms, and professional services. Accessing our website or working with our services confirms your acceptance of the conditions, responsibilities, and policies described below. We encourage you to review all sections carefully before continuing to use the platform or services. 
					</p>
				</div>

				{/* Divider */}
				<div className="border-t border-white/5 mb-12" />

				{/* Sections */}
				<div className="space-y-10">
					{sections.map((section) => (
						<section key={section.id} className="group">
							<div className="flex items-start gap-4">
								<span className="flex-shrink-0 w-8 h-8 rounded-lg bg-neon-green/10 border border-neon-green/20 text-neon-green text-xs font-bold flex items-center justify-center mt-1">
									{section.id}
								</span>
								<div className="flex-1">
									<h2 className="text-xl font-bold text-white mb-3 group-hover:text-neon-green transition-colors">
										{section.title}
									</h2>
									<p className="text-neutral-400 leading-relaxed">
										{section.content}
									</p>

									{/* Custom details for Section 13 (Contact Information) */}
									{section.id === 13 && (
										<div className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-4 max-w-lg">
											<a
												href="mailto:webestone@gmail.com"
												className="flex items-center gap-3 text-neutral-300 hover:text-neon-green transition-colors"
											>
												<Mail className="w-5 h-5 text-neon-green" />
												<span>webestone@gmail.com</span>
											</a>
											<a
												href="tel:+8801815025322"
												className="flex items-center gap-3 text-neutral-300 hover:text-neon-green transition-colors"
											>
												<Phone className="w-5 h-5 text-neon-green" />
												<span>+880 1815-025322</span>
											</a>
											<div className="flex items-center gap-3 text-neutral-300">
												<MapPin className="w-5 h-5 text-neon-green" />
												<span>25 The Avenue, Crawley, Perth, WA</span>
											</div>
										</div>
									)}

									{/* Simple bullets */}
									{section.bullets && (
										<ul className="mt-3 space-y-2">
											{section.bullets.map((bullet, i) => (
												<li
													key={i}
													className="flex items-start gap-2 text-neutral-400"
												>
													<span className="mt-2 w-1.5 h-1.5 rounded-full bg-neon-green flex-shrink-0" />
													{bullet}
												</li>
											))}
										</ul>
									)}

									{section.afterBullets && (
										<p className="text-neutral-400 leading-relaxed mt-3">
											{section.afterBullets}
										</p>
									)}
								</div>
							</div>
							<div className="mt-8 border-b border-white/5" />
						</section>
					))}
				</div>
			</div>
		</main>
	);
}
