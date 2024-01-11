// _app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FirebaseApp } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";

export const auth = getAuth(FirebaseApp);

const MyApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default MyApp;
