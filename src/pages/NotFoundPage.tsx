import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";

export default function NotFoundPage() {
	return (
		<main className="min-h-screen flex items-center justify-center text-white px-6 relative">
			<SEO 
				title="Page Not Found - WeBestOne" 
				description="The page you are looking for does not exist." 
			/>
			<div className="absolute inset-0 z-0 pointer-events-none">
				<div className="absolute top-1/3 left-1/3 w-64 h-64 bg-neon-green/10 rounded-full blur-[100px]" />
				<div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
			</div>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				className="relative z-10 text-center space-y-8 max-w-2xl"
			>
				<div className="text-9xl font-black bg-gradient-to-r from-neon-green to-blue-400 bg-clip-text text-transparent">
					404
				</div>
				<h1 className="text-4xl font-bold">Page Not Found</h1>
				<p className="text-neutral-400 text-lg">
					The page you're looking for doesn't exist or has been moved.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link
						to="/"
						className="flex items-center justify-center gap-2 px-8 py-4 bg-neon-green text-black font-bold rounded-full hover:scale-105 transition-transform"
					>
						<Home className="w-5 h-5" />
						Go Home
					</Link>
					<button
						onClick={() => window.history.back()}
						className="flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-colors"
					>
						<ArrowLeft className="w-5 h-5" />
						Go Back
					</button>
				</div>
			</motion.div>
		</main>
	);
}
