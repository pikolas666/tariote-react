import React, { useState, useEffect } from "react";
import { getDatabase, ref as dbRef, get } from "firebase/database";
import styles from "./about-me.module.css";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import firebaseApp from "../../../firebaseConfig";

const About = () => {
	const [aboutMeText, setAboutMeText] = useState("");

	useEffect(() => {
		showAboutMeText();
	}, []);

	async function showAboutMeText() {
		const database = getDatabase(firebaseApp);
		const firebaseRef = dbRef(database, "aboutme");

		try {
			const snapshot = await get(firebaseRef);
			const loginInfo = snapshot.val();

			setAboutMeText(loginInfo);
		} catch (error) {
			console.error("Error fetching aboutMe text:", error);
		}
	}

	return (
		<PageTemplate>
			<div
				className={styles.aboutMe}
				dangerouslySetInnerHTML={{ __html: aboutMeText }}
			/>
		</PageTemplate>
	);
};

export default About;
