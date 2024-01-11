// _app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { FirebaseApp } from "../../firebaseConfig";

// Create a context for the user
const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

export const auth = getAuth(FirebaseApp);

const MyApp = ({ Component, pageProps }: AppProps) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (authUser) => {
			if (authUser) {
				setUser(authUser);
			} else {
				setUser(null);
			}
		});

		// Clean up the subscription when the component unmounts
		return () => unsubscribe();
	}, []);

	return (
		<UserContext.Provider value={user}>
			<Component {...pageProps} />
		</UserContext.Provider>
	);
};

export default MyApp;
