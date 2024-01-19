import React, { useState } from "react";

import styles from "./BurgerButton.module.css";
type BurgerButtonType = {
	toggleMobileNav: () => void;
};

const BurgerButton: React.FC<BurgerButtonType> = ({ toggleMobileNav }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleButton = () => {
		setIsOpen(!isOpen);
		toggleMobileNav();
	};

	return (
		<div
			className={`${styles.burgerContainer} ${isOpen ? styles.open : ""}`}
			onClick={toggleButton}
		>
			<div className={styles.burger}>
				<span className={styles.bar}></span>
				<span className={styles.bar}></span>
				<span className={styles.bar}></span>
			</div>
		</div>
	);
};

export default BurgerButton;
