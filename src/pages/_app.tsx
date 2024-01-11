import "@/styles/globals.css";
import type { AppProps } from "next/app";
import firebase from "firebase/app";
import firebaseApp from "../../firebaseConfig";

const MyApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default MyApp;
