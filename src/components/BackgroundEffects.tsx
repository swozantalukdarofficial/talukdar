export default function BackgroundEffects() {
	return (
		<div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
			{/* Floating Orb 1 - Top Left (Vibrant Neon Green Glow) */}
			<div
				className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-neon-green/15 rounded-full blur-[150px] will-change-transform animate-float-orb-1"
			/>

			{/* Floating Orb 2 - Bottom Right (Electric Cyan Glow) */}
			<div
				className="absolute -bottom-32 -right-32 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[170px] will-change-transform animate-float-orb-2"
			/>

			{/* Floating Orb 3 - Center (Deep Indigo / Violet Ambient Accent) */}
			<div
				className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-indigo-600/[0.04] rounded-full blur-[190px] will-change-transform animate-float-orb-3"
			/>

			{/* Floating Orb 4 - Subtle Center Light */}
			<div
				className="absolute top-2/3 left-1/3 w-[500px] h-[500px] bg-neon-green/[0.05] rounded-full blur-[140px] will-change-transform animate-pulse-slow"
			/>

			{/* Subtle Grid overlay for depth */}
			<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.025] mix-blend-plus-lighter pointer-events-none"></div>
		</div>
	);
}
