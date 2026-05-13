import { motion } from "framer-motion";

export default function BackgroundEffects() {
	return (
		<div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

			{/* Floating Orb 1 - Top Left */}
			<motion.div
				animate={{
					x: [0, 40, 0],
					y: [0, 60, 0],
				}}
				transition={{
					duration: 20,
					repeat: Infinity,
					ease: "linear",
				}}
				className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-neon-green/10 rounded-full blur-[140px] will-change-transform"
			/>

			{/* Floating Orb 2 - Bottom Right */}
			<motion.div
				animate={{
					x: [0, -60, 0],
					y: [0, -40, 0],
				}}
				transition={{
					duration: 25,
					repeat: Infinity,
					ease: "linear",
				}}
				className="absolute -bottom-24 -right-24 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[160px] will-change-transform"
			/>

			{/* Floating Orb 3 - Center */}
			<motion.div
				animate={{
					scale: [1, 1.2, 1],
					opacity: [0.3, 0.5, 0.3]
				}}
				transition={{
					duration: 15,
					repeat: Infinity,
					ease: "easeInOut",
				}}
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-green/[0.03] rounded-full blur-[180px] will-change-transform"
			/>

      {/* Subtle Grid for depth */}
			<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] mix-blend-plus-lighter"></div>
		</div>
	);
}
