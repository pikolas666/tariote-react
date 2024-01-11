import React, { useState, useEffect } from "react";
import { getDatabase, ref as dbRef, get } from "firebase/database";
import styles from "./contacts.module.css";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import firebaseApp from "../../../firebaseConfig";

const Contacts = () => {
	const [contactsText, setContactsText] = useState("");

	useEffect(() => {
		showAboutMeText();
	}, []);

	async function showAboutMeText() {
		const database = getDatabase(firebaseApp);
		const firebaseRef = dbRef(database, "contacts");

		try {
			const snapshot = await get(firebaseRef);
			const loginInfo = snapshot.val();

			setContactsText(loginInfo);
		} catch (error) {
			console.error("Error fetching aboutMe text:", error);
		}
	}

	return (
		<PageTemplate>
			<div
				className={styles.aboutMe}
				dangerouslySetInnerHTML={{ __html: contactsText }}
			/>
		</PageTemplate>
	);
};

export default Contacts;
