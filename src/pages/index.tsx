/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Home.module.css";
import Link from "next/link";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();
	return (
		<>
			<img
				className={styles.backgroundImage}
				alt="Responsive image"
				src="/assets/background.jpg"
				width={2000}
				height={2000}
			/>
			<PageTemplate>
				<Link className={styles.adminShortcut} href="/admin"></Link>
			</PageTemplate>
		</>
	);
}
