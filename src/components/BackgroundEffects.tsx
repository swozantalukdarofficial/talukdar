export default function BackgroundEffects() {
	return (
		<div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

			{/* Floating Orb 1 - Top Left */}
			<div
				className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-neon-green/10 rounded-full blur-[140px] will-change-transform animate-float-orb-1"
			/>

			{/* Floating Orb 2 - Bottom Right */}
			<div
				className="absolute -bottom-24 -right-24 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[160px] will-change-transform animate-float-orb-2"
			/>

			{/* Floating Orb 3 - Center */}
			<div
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-green/[0.03] rounded-full blur-[180px] will-change-transform animate-float-orb-3"
			/>

      {/* Subtle Grid for depth */}
			<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] mix-blend-plus-lighter"></div>
		</div>
	);
}
