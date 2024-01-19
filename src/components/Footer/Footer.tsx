/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
	return (
		<div className={styles.social}>
			<a
				href="https://www.facebook.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					className={styles.socialFacebook}
					src="/assets/F.png"
					alt="Facebook"
					width={30}
					height={30}
				/>
			</a>
			<a
				href="https://www.instagram.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					className={styles.socialInstagram}
					src="/assets/instagram.png"
					alt="Instagram"
					width={30}
					height={30}
				/>
			</a>
		</div>
	);
};

export default Footer;
