// _app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FirebaseApp } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

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

	return <Component {...pageProps} user={user} />;
};

export default MyApp;
