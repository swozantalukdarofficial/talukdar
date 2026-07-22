import { Navigate, Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
	LayoutDashboard,
	FileText,
	Settings,
	LogOut,
	Home,
	Phone,
	Briefcase,
	Image,
	HelpCircle,
	MessageSquare,
	Search,
	Menu,
	X,
	Globe,
	ChevronLeft,
	BookOpen,
	Users,
} from "lucide-react";
import { useState } from "react";

const sidebarLinks = [
	{ name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
	{ name: "Hero Section", href: "/admin/hero", icon: Home },
	{ name: "Services", href: "/admin/services", icon: Briefcase },
	{ name: "Service Images", href: "/admin/service-images", icon: Image },
	{ name: "Portfolio", href: "/admin/portfolio", icon: Image },
	{ name: "Team Members", href: "/admin/team", icon: Users },
	{ name: "Blog Posts", href: "/admin/blogs", icon: BookOpen },
	{ name: "Contact Info", href: "/admin/contact", icon: Phone },
	{ name: "Header & Footer", href: "/admin/header-footer", icon: FileText },
	{ name: "Proposals", href: "/admin/proposals", icon: FileText },
	{ name: "FAQ", href: "/admin/faq", icon: HelpCircle },
	{ name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
	{ name: "SEO Settings", href: "/admin/seo", icon: Search },
	{ name: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
	const { user, isLoading, logout } = useAuth();
	const navigate = useNavigate();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	if (isLoading) {
		return (
			<div className="min-h-screen bg-black flex items-center justify-center">
				<div className="w-8 h-8 border-2 border-neon-green/30 border-t-neon-green rounded-full animate-spin" />
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/admin" replace />;
	}

	const handleLogout = async () => {
		await logout();
		navigate("/admin");
	};

	return (
		<div className="min-h-screen bg-neutral-950 flex">
			{/* Mobile overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black/60 z-40 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-neutral-900/95 backdrop-blur-xl border-r border-white/5 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				{/* Logo area */}
				<div className="p-6 border-b border-white/5">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="w-9 h-9 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
								<Globe className="w-5 h-5 text-neon-green" />
							</div>
							<div>
								<p className="text-white font-bold text-sm">WeBestOne</p>
								<p className="text-neutral-500 text-[10px] uppercase tracking-wider font-bold">Admin Panel</p>
							</div>
						</div>
						<button
							onClick={() => setSidebarOpen(false)}
							className="lg:hidden text-neutral-400 hover:text-white"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Nav Links */}
				<nav className="flex-1 p-4 space-y-1 overflow-y-auto">
					{sidebarLinks.map((link) => (
						<NavLink
							key={link.href}
							to={link.href}
							onClick={() => setSidebarOpen(false)}
							className={({ isActive }) =>
								`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
									isActive
										? "bg-neon-green/10 text-neon-green border border-neon-green/20"
										: "text-neutral-400 hover:text-white hover:bg-white/5"
								}`
							}
						>
							<link.icon className="w-4 h-4 shrink-0" />
							<span>{link.name}</span>
						</NavLink>
					))}
				</nav>

				{/* Bottom actions */}
				<div className="p-4 border-t border-white/5 space-y-2">
					<a
						href="/"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
					>
						<ChevronLeft className="w-4 h-4" />
						<span>View Site</span>
					</a>
					<button
						onClick={handleLogout}
						className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
					>
						<LogOut className="w-4 h-4" />
						<span>Sign Out</span>
					</button>
					<div className="px-4 pt-2">
						<p className="text-[10px] text-neutral-600 truncate">{user.email}</p>
					</div>
				</div>
			</aside>

			{/* Main Content */}
			<main className="flex-1 min-h-screen min-w-0 overflow-x-hidden">
				{/* Top bar */}
				<header className="sticky top-0 z-30 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 py-4 flex items-center gap-4">
					<button
						onClick={() => setSidebarOpen(true)}
						className="lg:hidden text-neutral-400 hover:text-white p-1"
					>
						<Menu className="w-5 h-5" />
					</button>
					<div className="flex-1" />
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center text-neon-green text-xs font-bold">
							{user.email?.[0]?.toUpperCase() || "A"}
						</div>
					</div>
				</header>

				{/* Page content */}
				<div className="p-4 sm:p-6 lg:p-8 min-w-0">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
