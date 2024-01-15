// Import necessary modules
import React, { useEffect, useState } from "react";
import { getDatabase, ref as dbRef, get, set } from "firebase/database";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import styles from "./admin.module.css";
import { useUser } from "../../pages/_app";
import TinyMCEModule from "../../components/TinyMCE/TinyMCE";
import { FirebaseApp } from "../../../firebaseConfig";
import {
	getStorage,
	ref,
	uploadBytes,
	listAll,
	getDownloadURL,
} from "firebase/storage";

const Admin = () => {
	const [databaseValue, setDatabaseValue] = useState("");
	const [databaseContactsValue, setDatabaseContactsValue] = useState("");

	const [aboutMeText, setAboutMeText] = useState("");
	const [contactsText, setContactsText] = useState("");

	const [selectedFiles, setSelectedFiles] = useState([] as File[]);

	const storage = getStorage(FirebaseApp);

	const user = useUser();

	useEffect(() => {
		showAboutMeText();
		showContactsText();
		console.log("ALL Selected files:", selectedFiles);
	}, [selectedFiles]);

	const showAboutMeText = async () => {
		try {
			const database = getDatabase(FirebaseApp);
			const firebaseRef = dbRef(database, "aboutme");

			const snapshot = await get(firebaseRef);
			const firebaseAboutMeText = snapshot.val();

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

	const updateContactsText = async (e: any) => {
		e.preventDefault();
		try {
			const database = getDatabase(FirebaseApp);
			const firebaseRef = dbRef(database, "contacts");

			await set(firebaseRef, contactsText);
			console.log("contacts text updated successfully.");
		} catch (error) {
			console.error("Error updating About Me text:", error);
		}
	};

	const showContactsText = async () => {
		try {
			const database = getDatabase(FirebaseApp);
			const firebaseRef = dbRef(database, "contacts");

			const snapshot = await get(firebaseRef);
			const firebaseContactsText = snapshot.val();

			setDatabaseContactsValue(firebaseContactsText);
		} catch (error) {
			console.error("Error fetching contacts text:", error);
		}
	};
	const handleFileInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		console.log("hit");

		// Access the selected files from the event
		const files = event.target.files;

		if (files) {
			// Explicitly specify the type of newSelectedFiles
			const newSelectedFiles: File[] = Array.from([...selectedFiles, ...files]);

			// Update the state with the new array
			setSelectedFiles(newSelectedFiles);

			// Your additional logic for handling the selected files goes here
			console.log("Selected files:", newSelectedFiles);
		} else {
			console.log("no files found");
		}
	};

	const triggerFileInput = (name: string) => {
		// Programmatically trigger a click event on the file input
		const input = document.getElementById(name) as HTMLInputElement;
		input.click();
	};

	const uploadImage = async (gallery: string) => {
		try {
			await Promise.all(
				selectedFiles.map(async (file) => {
					const storageRef = ref(storage, gallery + "/" + file.name);
					await uploadBytes(storageRef, file);
					console.log(`${file.name} uploaded successfully`);
				})
			);

			alert(`All files uploaded successfully`);
		} catch (error) {
			console.error(`Failed to upload files`, error);
			alert(`Failed to upload files`);
		}
	};

	const deleteAllPhotos = () => {
		// Handle logic to delete all photos
	};

	return (
		<PageTemplate>
			{user && (
				<>
					<div className={styles.tinyMceContainer}>
						{/* About Me */}
						<div className={styles.tinyContent}>
							<h2 className={styles.titleh2}>Apie mane</h2>
							<TinyMCEModule
								initialValue={
									databaseValue !== undefined
										? JSON.stringify(databaseValue)
										: ""
								}
								onEditorChange={(value: any) => setAboutMeText(value)}
							/>
							<form onSubmit={updateAboutMeText}>
								<button type="submit" className={styles.applybutton}>
									{/* eslint-disable */}
									pakeisti "apie mane" teksta
									{/* eslint-enable */}
								</button>
							</form>
						</div>

						{/* Contacts */}
						<div className={styles.tinyContent}>
							<h2 className={styles.titleh2}>Kontaktai</h2>
							<TinyMCEModule
								initialValue={
									databaseValue !== undefined
										? JSON.stringify(databaseContactsValue)
										: ""
								}
								onEditorChange={(value: any) => setContactsText(value)}
							/>
							<form onSubmit={updateContactsText}>
								<button type="submit" className={styles.applybutton}>
									{/* eslint-disable */}
									Keisti "kontaktai" teksta
									{/* eslint-enable */}
								</button>
							</form>
						</div>
					</div>
					<div className={styles.adminGallery}>
						<div className={styles.Adminform}>
							<div className={styles.adminGallery}>
								<h2 className={styles.titleh2}>Galerija</h2>
								<div className={styles.galleryFoldercontainer}>
									<div id="adminGamta" className={styles.adminGalleryFolder}>
										{" "}
										{/* eslint-disable */}"gamta/"{/* eslint-enable */}
										<button
											className={styles.uploadPlus}
											onClick={() => {
												triggerFileInput("fileInput");
											}}
										>
											<input
												type="file"
												id="fileInput"
												className={styles.inputFile}
												onChange={handleFileInputChange}
												accept="image/png, image/jpeg, image.jpg"
												multiple
											/>
											+
										</button>
										<button
											onClick={() => {
												uploadImage("gamta");
											}}
											className={styles.uploadButton}
										>
											upload
										</button>
									</div>
									<div id="adminGamta" className={styles.adminGalleryFolder}>
										{" "}
										{/* eslint-disable */}"seimos/"{/* eslint-enable */}
										<button
											className={styles.uploadPlus}
											onClick={() => {
												triggerFileInput("fileInput");
											}}
										>
											<input
												type="file"
												id="fileInput"
												className={styles.inputFile}
												onChange={handleFileInputChange}
												accept="image/png, image/jpeg, image.jpg"
												multiple
											/>
											+
										</button>
										<button
											onClick={() => {
												uploadImage("seimos");
											}}
											className={styles.uploadButton}
										>
											upload
										</button>
									</div>
									<div id="adminGamta" className={styles.adminGalleryFolder}>
										{" "}
										{/* eslint-disable */}"gamta/"{/* eslint-enable */}
										<button
											className={styles.uploadPlus}
											onClick={() => {
												triggerFileInput("fileInput");
											}}
										>
											<input
												type="file"
												id="fileInput"
												className={styles.inputFile}
												onChange={handleFileInputChange}
												accept="image/png, image/jpeg, image.jpg"
												multiple
											/>
											+
										</button>
										<button
											onClick={() => {
												uploadImage("sventes");
											}}
											className={styles.uploadButton}
										>
											upload
										</button>
									</div>
								</div>
							</div>
							<div className={styles.galleryPhotosButtonContainer}>
								{/* Gallery photo buttons */}
							</div>
							<button onClick={deleteAllPhotos} className={styles.deletePhotos}>
								Delete Photos
							</button>
							<div className={styles.adminGalleryphotos}></div>
						</div>
					</div>
				</>
			)}
		</PageTemplate>
	);
};

// const parseJSON = (jsonString: string) => {
// 	try {
// 		return JSON.parse(jsonString);
// 	} catch (error) {
// 		console.error("Error parsing JSON:", error);
// 		return null;
// 	}
// };

export default Admin;
