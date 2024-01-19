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
	deleteObject,
} from "firebase/storage";
import GalleryFolder from "../../components/GalleryFolder/GalleryFolder";

const Admin = () => {
	const [databaseValue, setDatabaseValue] = useState("");
	const [databaseContactsValue, setDatabaseContactsValue] = useState("");

	const [aboutMeText, setAboutMeText] = useState("");
	const [contactsText, setContactsText] = useState("");

	const [selectedFiles, setSelectedFiles] = useState([] as File[]);
	const [galleryfolder, setGalleryFolder] = useState("");

	const [message, setMessage] = useState({ text: "", type: "" });
	const [isShowMessage, setIsShowMessage] = useState(false);

	const storage = getStorage(FirebaseApp);

	const [currentFolder, setCurrentFolder] = useState("");
	const [galleryItems, setGalleryItems] = useState<string[]>([]);

	let deleteList: Array<any> = [];

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
			const newSelectedFiles: File[] = Array.from([...selectedFiles, ...files]);
			setSelectedFiles(newSelectedFiles);
			setGalleryFolder(gallery);
		} else {
			console.log("no files found");
		}
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
		setIsShowMessage(true);
	};
	const listAllItems = async (gallery: any) => {
		try {
			const listRef = ref(storage, gallery);
			const res = await listAll(listRef);

			setGalleryItems([]);
			setCurrentFolder(gallery);

			const sortedItems = res.items.sort((a: any, b: any) =>
				a._location.path_.localeCompare(b._location.path_)
			);

			const downloadPromises = sortedItems.map((itemRef) =>
				getDownloadURL(itemRef)
			);

			const urls = await Promise.all(downloadPromises);

			setGalleryItems(urls);
		} catch (error) {
			console.error("Error getting download URLs:", error);
		}
	};

	function addToDeleteList() {
		let checkboxes = document.querySelectorAll(
			"input[type='checkbox']:checked"
		);
		for (let i = 0; i < checkboxes.length; i++) {
			deleteList.push(checkboxes[i].id);
		}
		console.log("new " + deleteList);
	}

	function cleanDeleteList() {
		deleteList = [];
	}

	const deleteAllPhotos = async () => {
		addToDeleteList();

		for (const item of deleteList) {
			console.log(item);

			const desertRef = ref(storage, item);

			try {
				await deleteObject(desertRef);
				console.log(`Successfully deleted: ${item}`);
			} catch (error) {
				console.error("Uh-oh, an error occurred:", error);
				setMessage({
					text: `Failed to delete files`,
					type: "error",
				});
			}
		}
		setMessage({
			text: `Files deleted successfully`,
			type: "success",
		});

		cleanDeleteList();

		// added refresh
		listAllItems(currentFolder);
		setIsShowMessage(true);
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
									<GalleryFolder
										id="adminGamta"
										galleryName="gamta"
										onFileInputChange={handleFileInputChange}
									/>
									<GalleryFolder
										id="adminSeimos"
										galleryName="seimos"
										onFileInputChange={handleFileInputChange}
									/>
									<GalleryFolder
										id="adminSventes"
										galleryName="sventes"
										onFileInputChange={handleFileInputChange}
									/>
								</div>
							</div>
							{isShowMessage && (
								<div
									className={styles.message}
									style={{
										color:
											message.type === "error" ? "red" : "rgb(11, 208, 142)",
									}}
								>
									{message.text}
									<button
										className={styles.closeBtn}
										onClick={() => {
											setIsShowMessage(false);
										}}
									>
										OK
									</button>
								</div>
							)}
						</div>
						<div className={styles.galleryPhotosButtonContainer}>
							<button
								id="adminGallerybutton"
								onClick={() => {
									listAllItems("gamta/");
								}}
								className={styles.galleryPhotosButton}
							>
								gamta
							</button>
							<button
								id="adminGallerybutton"
								onClick={() => {
									listAllItems("seimos/");
								}}
								className={styles.galleryPhotosButton}
							>
								seimos
							</button>
							<button
								id="adminGallerybutton"
								onClick={() => {
									listAllItems("sventes/");
								}}
								className={styles.galleryPhotosButton}
							>
								sventes
							</button>
						</div>
						<button onClick={deleteAllPhotos} className={styles.deletePhotos}>
							Delete Photos
						</button>
						<div id="adminGalleryphotos" className={styles.adminGalleryphotos}>
							{galleryItems.map((url) => (
								<label key={url} htmlFor={`checkbox_${url}`}>
									<input type="checkbox" id={url} className={styles.myCheck} />

									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src={url} alt={`Gallery Item`} />
								</label>
							))}
						</div>
					</div>
				</>
			)}
		</PageTemplate>
	);
};

export default Admin;
