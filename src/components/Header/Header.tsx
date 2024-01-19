/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useUser } from "../../pages/_app";
import BurgerButton from "../BurgerButton/BurgerButton";

type HeaderProps = {
	openModal: () => void;
};

const Header: React.FC<HeaderProps> = ({ openModal }) => {
	const router = useRouter();
	const auth = getAuth();

	const user = useUser();

	const [isAdminPanel, setIsAdminPanel] = useState(false);
	const [showMobileNav, setShowMobileNav] = useState(false);

	const toggleMobileNav = () => {
		setShowMobileNav(!showMobileNav);
	};

	useEffect(() => {
		setIsAdminPanel(router.pathname === "/admin");
	}, [router.pathname, auth]);

	const logOut = () => {
		auth.signOut();
		console.log("user logged out");
	};
	const capitalizeFirstLetter = (text: string) => {
		return text.charAt(0).toUpperCase() + text.slice(1);
	};

	return (
		<header className={styles.header}>
			<div>
				<Link href="/">
					<img
						className={styles.logo}
						src="/assets/tariotelogo3.png"
						alt="Logo"
						width={200}
						height={100}
					/>
				</Link>
			</div>
			{user && (
				<p className={styles.welcome}>
					Labas,{" "}
					{user.email && user.email.includes(".")
						? capitalizeFirstLetter(user.email.split(".")[0])
						: "No email available"}
					!
				</p>
			)}

			<BurgerButton toggleMobileNav={toggleMobileNav} />

			<ul className={styles.nav}>
				<li>
					<Link href="/">Pagrindinis</Link>
				</li>
				<li>
					<Link href="/gallery">Galerija</Link>
				</li>
				<li>
					<Link href="/about-me">Apie mane</Link>
				</li>
				<li>
					<Link href="/contacts">Kontaktai</Link>
				</li>
				{isAdminPanel && !user ? (
					<li>
						<Link
							className={styles.loginBtn}
							href="#"
							onClick={() => {
								openModal();
							}}
						>
							Login
						</Link>
					</li>
				) : (
					user && (
						<li>
							<Link onClick={logOut} className={styles.logoutBtn} href="#">
								Logout
							</Link>
						</li>
					)
				)}
			</ul>
			{showMobileNav && (
				<ul className={styles.mobileNav}>
					<li>
						<Link href="/">Pagrindinis</Link>
					</li>
					<li>
						<Link href="/gallery">Galerija</Link>
					</li>
					<li>
						<Link href="/about-me">Apie mane</Link>
					</li>
					<li>
						<Link href="/contacts">Kontaktai</Link>
					</li>
					{isAdminPanel && !user ? (
						<li>
							<Link
								className={styles.loginBtn}
								href="#"
								onClick={() => {
									openModal();
								}}
							>
								Login
							</Link>
						</li>
					) : (
						user && (
							<li>
								<Link onClick={logOut} className={styles.logoutBtn} href="#">
									Logout
								</Link>
							</li>
						)
					)}
				</ul>
			)}
		</header>
	);
};

export default Header;
