// Gallery.js
import React, { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import styles from "./gallery.module.css";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import firebaseApp from "../../../firebaseConfig";
import Image from "next/image";

const Gallery = () => {
	const [gallery, setGallery] = useState("gamta/");
	const [galleryItems, setGalleryItems] = useState<string[]>([]);
	const [showScrollButton, setShowScrollButton] = useState(false);

	useEffect(() => {
		const initializeFirebaseApp = async () => {
			const storage = getStorage(firebaseApp);

			const storageRef = ref(storage);

			const listAllItems = async (gallery: any) => {
				try {
					const listRef = ref(storage, gallery);
					const res = await listAll(listRef);

					setGalleryItems([]);

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

			// Initial gallery listing
			listAllItems(gallery);

			// Scroll event listener
			const handleScroll = () => {
				if (
					document.body.scrollTop > 10 ||
					document.documentElement.scrollTop > 10
				) {
					setShowScrollButton(true);
				} else {
					setShowScrollButton(false);
				}
			};

			window.addEventListener("scroll", handleScroll);

			// Cleanup the event listener
			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
		};

		initializeFirebaseApp();
	}, [gallery]);

	// When the user clicks on the button, scroll to the top of the document
	const topFunction = () => {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
	};

	return (
		<PageTemplate>
			<div className={styles.categories}>
				<button
					className={styles.catButton}
					onClick={() => setGallery("gamta/")}
				>
					Gamta
					<span className={styles.first}></span>
					<span className={styles.second}></span>
					<span className={styles.third}></span>
					<span className={styles.fourth}></span>
				</button>
				<button
					className={styles.catButton}
					onClick={() => setGallery("seimos/")}
				>
					Šeimos
					<span className={styles.first}></span>
					<span className={styles.second}></span>
					<span className={styles.third}></span>
					<span className={styles.fourth}></span>
				</button>
				<button
					className={styles.catButton}
					onClick={() => setGallery("sventes/")}
				>
					Šventės
					<span className={styles.first}></span>
					<span className={styles.econd}></span>
					<span className={styles.third}></span>
					<span className={styles.fourth}></span>
				</button>
			</div>

			<div id="gallery" className={styles.gallery}>
				{galleryItems.map((url) => (
					<a key={url} href={url} target="_blank">
						<Image
							src={url}
							alt="gallery-item"
							width={200}
							height={150}
							priority
						/>
					</a>
				))}
			</div>

			{showScrollButton && (
				<button
					onClick={topFunction}
					className={styles.myBtn}
					title="Go to top"
				>
					Į viršų
				</button>
			)}
		</PageTemplate>
	);
};

export default Gallery;
