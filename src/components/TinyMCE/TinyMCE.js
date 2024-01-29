// Import necessary modules
import React from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(
	() => import("@tinymce/tinymce-react").then((module) => module.Editor),
	{
		ssr: false,
	}
);

const TinyMCEModule = ({ initialValue, onEditorChange }) => {
	const Tidio = process.env.NEXT_PUBLIC_FIREBASE_TIDIO_API_KEY;
	return (
		<Editor
			apiKey={Tidio}
			init={{
				// Your initialization options
				selector: "#myTextarea",
				plugins: "",
				toolbar:
					"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
				tinycomments_mode: "embedded",
				tinycomments_author: "Author name",
				mergetags_list: [
					{ value: "First.Name", title: "First Name" },
					{ value: "Email", title: "Email" },
				],
				ai_request: (request, respondWith) =>
					respondWith.string(() =>
						Promise.reject("See docs to implement AI Assistant")
					),
			}}
			initialValue={initialValue}
			onEditorChange={onEditorChange}
		/>
	);
};

export default TinyMCEModule;
