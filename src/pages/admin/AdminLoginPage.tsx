import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";

export default function AdminLoginPage() {
	const { user, isLoading, login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	if (isLoading) {
		return (
			<div className="min-h-screen bg-black flex items-center justify-center">
				<div className="w-8 h-8 border-2 border-neon-green/30 border-t-neon-green rounded-full animate-spin" />
			</div>
		);
	}

	if (user) {
		return <Navigate to="/admin/dashboard" replace />;
	}

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await login(email, password);
		} catch (err: unknown) {
			const errorMessage = err instanceof Error ? err.message : "Login failed";
			if (errorMessage.includes("invalid-credential") || errorMessage.includes("wrong-password")) {
				setError("Invalid email or password.");
			} else if (errorMessage.includes("user-not-found")) {
				setError("No admin account found with this email.");
			} else if (errorMessage.includes("too-many-requests")) {
				setError("Too many attempts. Please try again later.");
			} else {
				setError("Login failed. Please check your credentials.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
			{/* Background effects */}
			<div className="absolute top-1/4 -left-24 w-96 h-96 bg-neon-green/5 blur-[120px] rounded-full pointer-events-none" />
			<div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

			<div className="w-full max-w-md relative z-10">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neon-green/10 border border-neon-green/20 mb-4">
						<Shield className="w-8 h-8 text-neon-green" />
					</div>
					<h1 className="text-3xl font-black text-white mb-2">Admin Panel</h1>
					<p className="text-neutral-500 text-sm">Sign in to manage your website content</p>
				</div>

				{/* Form Card */}
				<form
					onSubmit={handleLogin}
					className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-6 shadow-2xl"
				>
					{error && (
						<div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm flex items-center gap-2">
							<span className="shrink-0">⚠️</span>
							<span>{error}</span>
						</div>
					)}

					{/* Email */}
					<div className="space-y-2">
						<label htmlFor="admin-email" className="text-sm font-bold text-neutral-300 block">Email</label>
						<div className="relative">
							<Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
							<input
								id="admin-email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="admin@webestone.com"
								required
								className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neon-green/50 transition-colors text-sm"
							/>
						</div>
					</div>

					{/* Password */}
					<div className="space-y-2">
						<label htmlFor="admin-password" className="text-sm font-bold text-neutral-300 block">Password</label>
						<div className="relative">
							<Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
							<input
								id="admin-password"
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								required
								className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neon-green/50 transition-colors text-sm"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
							>
								{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
							</button>
						</div>
					</div>

					{/* Submit */}
					<button
						type="submit"
						disabled={loading}
						className="w-full py-3.5 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(135,230,92,0.2)]"
					>
						{loading ? (
							<>
								<div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
								<span>Signing in...</span>
							</>
						) : (
							<span>Sign In</span>
						)}
					</button>

					<p className="text-center text-neutral-600 text-xs">
						Protected admin area. Unauthorized access is prohibited.
					</p>
				</form>
			</div>
		</main>
	);
}
