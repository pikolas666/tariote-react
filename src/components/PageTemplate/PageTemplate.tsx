// Import necessary modules
import React, { ReactNode, useState } from "react";
import Header from "../Header/Header";
import CustomHead from "../Head/Head";
import styles from "./styles.module.css";
import Footer from "../Footer/Footer";
import Modal from "../Modal/Modal"; // Import the Modal component

import { Roboto } from "next/font/google";

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
});

type PageTemplateType = {
	children: ReactNode;
};

const PageTemplate: React.FC<PageTemplateType> = ({ children }) => {
	// State for login status and modal visibility
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isShowModal, setIsShowModal] = useState(false);

	// Function to open the modal
	const openModal = () => {
		setIsShowModal(true);
	};

	// Function to close the modal
	const closeModal = () => {
		setIsShowModal(false);
	};
	const handleLogout = () => {
		setIsLoggedIn(false);
	};

	return (
		<>
			<CustomHead />
			<div className={`${styles.wrapper} ${roboto.className}`}>
				{/* Pass isLoggedIn and openModal as props to Header */}
				<Header handleLogout={handleLogout} openModal={openModal} />
				{/* Pass closeModal as a prop to Modal */}
				{isShowModal && (
					<Modal
						setIsLoggedIn={() => setIsLoggedIn(true)}
						closeModal={closeModal}
					/>
				)}
				<div className={styles.main}>{children}</div>
				<Footer />
			</div>
		</>
	);
};

export default PageTemplate;
