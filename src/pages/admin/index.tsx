import React, { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import styles from "./admin.module.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUser } from "../../pages/_app";

const Admin = () => {
	const auth = getAuth();

	const [aboutMeText, setAboutMeText] = useState("");
	const [contactsText, setContactsText] = useState("");

	const user = useUser();

	// Now, 'user' will be either the user object if logged in or null if logged out

	const showAboutMeText = () => {
		// Fetch aboutMe text and update the state
	};

	const updateAboutMeText = (e: any) => {
		e.preventDefault();
		// Update aboutMe text in the database
	};

	const showContactsText = () => {
		// Fetch contacts text and update the state
	};

	const updateContactsText = (e: any) => {
		e.preventDefault();
		// Update contacts text in the database
	};

	const handleFileUpload = (folder: any) => {
		// Handle file upload logic for the specified folder
	};

	const listAllPhotos = (folder: any) => {
		// Fetch and list all photos in the specified folder
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
						<form onSubmit={updateAboutMeText}>
							<textarea
								value={aboutMeText}
								onChange={(e) => setAboutMeText(e.target.value)}
							/>

							<button type="submit" className={styles.applybutton}>
								{/* eslint-disable */}
								Uzkrauti "apie mane" teksta
								{/* eslint-enable */}
							</button>
							<button onClick={showAboutMeText} className={styles.applybutton}>
								Keisti teksta
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

export default Admin;
