import React, { ReactNode, useState } from "react";
import Header from "../Header/Header";
import CustomHead from "../Head/Head";
import styles from "./styles.module.css";
import Footer from "../Footer/Footer";
import Modal from "../Modal/Modal";

import { Roboto } from "next/font/google";

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
});

type PageTemplateType = {
	children: ReactNode;
};

const PageTemplate: React.FC<PageTemplateType> = ({ children }) => {
	const [isShowModal, setIsShowModal] = useState(false);

	const openModal = () => {
		setIsShowModal(true);
	};

	const closeModal = () => {
		setIsShowModal(false);
	};

	return (
		<>
			<CustomHead />
			<div className={`${styles.wrapper} ${roboto.className}`}>
				{/* Pass isLoggedIn and openModal as props to Header */}
				<Header openModal={openModal} />
				{/* Pass closeModal as a prop to Modal */}
				{isShowModal && <Modal closeModal={closeModal} />}
				<div className={styles.main}>{children}</div>
				<Footer />
			</div>
		</>
	);
};

export default PageTemplate;
