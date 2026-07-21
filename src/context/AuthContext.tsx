import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	type User,
} from "firebase/auth";
import { auth } from "../lib/firebase";

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const isConfigured = Boolean(import.meta.env.VITE_FIREBASE_API_KEY);
		if (!isConfigured) {
			setIsLoading(false);
			return;
		}

		const unsub = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
			setIsLoading(false);
		});
		return () => unsub();
	}, []);

	const login = async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password);
	};

	const logout = async () => {
		await signOut(auth);
	};

	return (
		<AuthContext.Provider value={{ user, isLoading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuth must be used within <AuthProvider>");
	}
	return ctx;
}
