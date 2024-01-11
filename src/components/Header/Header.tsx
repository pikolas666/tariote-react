import { use, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";
import logo from "../../assets/tariotelogo3.png";
import { useRouter } from "next/router";
import Modal from "../Modal/Modal";

const Header = () => {
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdminPanel, setIsAdminPanel] = useState(false);
	const [isShowModal, setIsSHowModal] = useState(false);

	useEffect(() => {
		if (router.pathname === "/admin") {
			setIsAdminPanel(true);
		} else {
			setIsAdminPanel(false);
		}
	}, [router.pathname]);

	return (
		<header className={styles.header}>
			{isShowModal && (
				<Modal
					hideModal={() => {
						setIsSHowModal(false);
					}}
				></Modal>
			)}
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
				{isAdminPanel && !isLoggedIn ? (
					// Show login link in the admin panel
					<li>
						<Link
							className={styles.loginBtn}
							href="#"
							onClick={() => {
								setIsSHowModal(true);
							}}
						>
							Login
						</Link>
					</li>
				) : (
					// Show logout button on other pages when isLoggedIn is true
					isLoggedIn && (
						<li>
							<Link className={styles.logoutBtn} href="#">
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
