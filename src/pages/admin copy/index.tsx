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
	const [galleryfolder, setGalleryFolder] = useState("");

	const [message, setMessage] = useState({ text: "", type: "" });

	const storage = getStorage(FirebaseApp);

	const user = useUser();
	useEffect(() => {
		if (selectedFiles.length > 0) {
			// Delay the upload if needed
			const delayUpload = async () => {
				await new Promise((resolve) => setTimeout(resolve, 2000));
				uploadImage(galleryfolder); // Replace "gamta" with the appropriate gallery
			};

			delayUpload();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedFiles]);

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
		event: React.ChangeEvent<HTMLInputElement>,
		gallery: string
	) => {
		// Access the selected files from the event
		const files = event.target.files;

		if (files) {
			// Log the current value of selectedFiles
			console.log("Before state update - Selected files:", selectedFiles);

			// Explicitly specify the type of newSelectedFiles
			const newSelectedFiles: File[] = Array.from([...selectedFiles, ...files]);

			// Update the state with the new array
			setSelectedFiles(newSelectedFiles);
			setGalleryFolder(gallery);

			// Log the updated value of selectedFiles
			console.log("After state update - Selected files:", newSelectedFiles);

			// Your additional logic for handling the selected files goes here
			console.log("Selected files:", newSelectedFiles);

			// Use setTimeout to delay the uploadImage function
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
					console.log(`Processing file: ${file.name}`);

					const storageRef = ref(storage, gallery + "/" + file.name);

					try {
						await uploadBytes(storageRef, file);
						console.log(`${file.name} uploaded successfully`);
					} catch (uploadError) {
						console.error(`Error uploading ${file.name}:`, uploadError);
					}
				})
			);

			setMessage({ text: "Files uploaded successfully", type: "success" });
		} catch (error) {
			console.error(`Error during file upload:`, error);
			setMessage({ text: "Failed to upload files", type: "error" });
		} finally {
			setSelectedFiles([]);
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
												triggerFileInput("gamtaInput");
											}}
										>
											<input
												type="file"
												id="gamtaInput"
												className={styles.inputFile}
												onChange={(event) =>
													handleFileInputChange(event, "gamta")
												}
												accept="image/png, image/jpeg, image.jpg"
												multiple
												disabled={selectedFiles.length > 0}
											/>
											+
										</button>
									</div>
									<div id="adminSeimos" className={styles.adminGalleryFolder}>
										{" "}
										{/* eslint-disable */}"seimos/"{/* eslint-enable */}
										<button
											className={styles.uploadPlus}
											onClick={() => {
												triggerFileInput("seimos");
											}}
										>
											<input
												type="file"
												id="seimos"
												className={styles.inputFile}
												onChange={(event) =>
													handleFileInputChange(event, "seimos")
												}
												accept="image/png, image/jpeg, image.jpg"
												multiple
												disabled={selectedFiles.length > 0}
											/>
											+
										</button>
									</div>
									<div id="adminSventes" className={styles.adminGalleryFolder}>
										{" "}
										{/* eslint-disable */}"sventes/"{/* eslint-enable */}
										<button
											className={styles.uploadPlus}
											onClick={() => {
												triggerFileInput("sventes");
											}}
										>
											<input
												type="file"
												id="sventes"
												className={styles.inputFile}
												onChange={(event) =>
													handleFileInputChange(event, "sventes")
												}
												accept="image/png, image/jpeg, image.jpg"
												multiple
												disabled={selectedFiles.length > 0}
											/>
											+
										</button>
									</div>
								</div>
							</div>
							<div
								className={styles.message}
								style={{
									color: message.type === "error" ? "red" : "rgb(11, 208, 142)",
								}}
							>
								{message.text}
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

export default Admin;
