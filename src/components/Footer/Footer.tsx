import React from "react";
import styles from "./Footer.module.css";
import facebook from "../../assets/F.png";
import instagram from "../../assets/instagram.png";
import Image from "next/image";

const Footer = () => {
	return (
		<div className={styles.social}>
			<a
				href="https://www.facebook.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image
					className={styles.socialFacebook}
					src={facebook}
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
				<Image
					className={styles.socialInstagram}
					src={instagram}
					alt="Instagram"
					width={30}
					height={30}
				/>
			</a>
		</div>
	);
};

export default Footer;
