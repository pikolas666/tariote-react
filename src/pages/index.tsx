import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useRouter } from "next/router";
import backgroundImage from "../assets/background.jpg";
import Image from "next/image";

export default function Home() {
	const router = useRouter();
	return (
		<>
			<Image
				className={styles.backgroundImage}
				alt="Responsive image"
				src={backgroundImage}
				width={2000}
				height={2000}
			/>
			<PageTemplate>
				<Link className={styles.adminShortcut} href="/admin"></Link>
			</PageTemplate>
		</>
	);
}
