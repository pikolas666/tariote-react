import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";
import logo from "../../assets/tariotelogo3.png";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useUser } from "../../pages/_app";

type HeaderProps = {
	openModal: () => void;
	handleLogout: () => void;
};

const Header: React.FC<HeaderProps> = ({ handleLogout, openModal }) => {
	const router = useRouter();
	const auth = getAuth();
	const [isAdminPanel, setIsAdminPanel] = useState(false);
	const user = useUser();

	useEffect(() => {
		setIsAdminPanel(router.pathname === "/admin");
	}, [router.pathname, auth]);

	const logOut = () => {
		handleLogout();
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
					<Image
						className={styles.logo}
						src={logo}
						alt="Logo"
						width={200}
						height={100}
						priority
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
			<input className={styles.menuToggle} type="checkbox" />

			<div className={styles.menuButton}></div>

			<ul className={styles.menu}>
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
		</header>
	);
};

export default Header;
