import React from "react";
import styles from "./GalleryFolder.module.css";

type GalleryFolderProps = {
	id: string;
	galleryName: string;
	onFileInputChange: (
		event: React.ChangeEvent<HTMLInputElement>,
		gallery: string
	) => void;
};

const GalleryFolder: React.FC<GalleryFolderProps> = ({
	id,
	galleryName,
	onFileInputChange,
}) => {
	return (
		<div className={styles.adminGalleryFolder}>
			{`"${galleryName}/"`}
			<button
				className={styles.uploadPlus}
				onClick={() => {
					const input = document.getElementById(id) as HTMLInputElement;
					if (input) {
						input.click();
					}
				}}
			>
				<input
					type="file"
					id={id}
					className={styles.inputFile}
					onChange={(event) => onFileInputChange(event, galleryName)}
					accept="image/png, image/jpeg, image.jpg"
					multiple
				/>
				+
			</button>
		</div>
	);
};

export default GalleryFolder;
