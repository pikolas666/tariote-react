// Import necessary modules
import React, { useEffect, useState } from "react";
import { getDatabase, ref as dbRef, get, set } from "firebase/database";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import styles from "./admin.module.css";
import { useUser } from "../../pages/_app";
import TinyMCEModule from "../../components/TinyMCE/TinyMCE";
import { FirebaseApp } from "../../../firebaseConfig";

const Admin = () => {
	const [databaseValue, setDatabaseValue] = useState("");
	const [aboutMeText, setAboutMeText] = useState("");
	const [contactsText, setContactsText] = useState("");
	const user = useUser();

	useEffect(() => {
		showAboutMeText();
	}, []);

	const showAboutMeText = async () => {
		try {
			const database = getDatabase(FirebaseApp);
			const firebaseRef = dbRef(database, "aboutme");

			const snapshot = await get(firebaseRef);
			const firebaseAboutMeText = snapshot.val();
			console.log(firebaseAboutMeText[0]);

			setDatabaseValue(firebaseAboutMeText);
		} catch (error) {
			console.error("Error fetching aboutMe text:", error);
		}
	};

	const updateAboutMeText = async (e: any) => {
		e.preventDefault();

		try {
			const database = getDatabase(FirebaseApp);
			const firebaseRef = dbRef(database, "aboutme");

			await set(firebaseRef, aboutMeText);
			console.log("About Me text updated successfully.");
		} catch (error) {
			console.error("Error updating About Me text:", error);
		}
	};

	const updateContactsText = (e: any) => {
		e.preventDefault();
		// Update contacts text in the database or perform other actions
	};

	const showContactsText = () => {
		// Fetch contacts text and update the state or perform other actions
	};

	const deleteAllPhotos = () => {
		// Handle logic to delete all photos
	};

	return (
		<PageTemplate>
			{user && (
				<div className={styles.paragTiny}>
					{/* About Me */}
					<div className={styles.tinyContacts}>
						<h2 className={styles.titleh2}>Apie mane</h2>
						<TinyMCEModule
							initialValue={
								databaseValue !== undefined ? JSON.stringify(databaseValue) : ""
							}
							onEditorChange={(value: any) => setAboutMeText(value)}
						/>
						<form onSubmit={updateAboutMeText}>
							<button type="submit" className={styles.applybutton}>
								{/* eslint-disable */}
								Uzkrauti "apie mane" teksta
								{/* eslint-enable */}
							</button>
						</form>
					</div>

					{/* Contacts */}
					<div className={styles.tinyContacts}>
						<h2 className={styles.titleh2}>Kontaktai</h2>
						<form onSubmit={updateContactsText}>
							<textarea
								value={contactsText}
								onChange={(e) => setContactsText(e.target.value)}
							/>
							<button type="submit" className={styles.applybutton}>
								{/* eslint-disable */}
								Uzkrauti "kontaktai" teksta
								{/* eslint-enable */}
							</button>
							<button onClick={showContactsText} className={styles.applybutton}>
								Keisti teksta
							</button>
						</form>
					</div>
				</div>
			)}

			{/* Gallery */}
			<div className={styles.Adminform}>
				<div className={styles.adminGallery}>{/* Gallery components */}</div>
				<div className={styles.galleryFoldercontainer}>
					{/* Gallery folder components */}
				</div>
				<div className={styles.galleryPhotosButtonContainer}>
					{/* Gallery photo buttons */}
				</div>
				<button onClick={deleteAllPhotos} className={styles.deletePhotos}>
					Delete Photos
				</button>
				<div className={styles.adminGalleryphotos}></div>
			</div>
		</PageTemplate>
	);
};

const parseJSON = (jsonString: string) => {
	try {
		return JSON.parse(jsonString);
	} catch (error) {
		console.error("Error parsing JSON:", error);
		return null;
	}
};

export default Admin;
