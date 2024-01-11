import React, { useState } from "react";
import styles from "./Modal.module.css";
import {
	getAuth,
	signInWithEmailAndPassword,
	UserCredential,
} from "firebase/auth";

type ModalType = {
	closeModal: () => void;
	setIsLoggedIn: () => void;
};

const Modal: React.FC<ModalType> = ({ closeModal, setIsLoggedIn }) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async () => {
		try {
			const auth = getAuth();
			const userCredential: UserCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			// Handle successful login
			const user = userCredential.user;
			console.log("User logged in");
			setError(null); // Reset error state on successful login
			setIsLoggedIn();
			closeModal();
		} catch (error) {
			// Handle errors
			console.error("Login error:", error);

			// Check if the error is a string or an instance of an error
			if (typeof error === "string") {
				setError(error);
			} else {
				setError("An unexpected error occurred.");
			}
		}
	};

	return (
		<div className={styles.modalWrapper}>
			<div className={styles.modal}>
				<div className={styles.closeBtn} onClick={closeModal}>
					X
				</div>
				<h3>Login</h3>
				<input
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{error && <div className={styles.error}>{error}</div>}
				<button onClick={handleLogin}>Login</button>
			</div>
		</div>
	);
};

export default Modal;
