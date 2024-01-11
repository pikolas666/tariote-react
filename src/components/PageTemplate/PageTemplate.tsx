import React, { ReactNode } from "react";
import Header from "../Header/Header";
import CustomHead from "../Head/Head";
import styles from "./styles.module.css";

import Footer from "../Footer/Footer";

import { Roboto } from "next/font/google";

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
});

type PageTemplateType = {
	children: ReactNode;
};

const PageTemplate: React.FC<PageTemplateType> = ({ children }) => {
	return (
		<>
			<CustomHead />
			<div className={`${styles.wrapper} ${roboto.className}`}>
				<Header />
				<div className={styles.main}>{children}</div>
				<Footer />
			</div>
		</>
	);
};

export default PageTemplate;
