import React, { useState } from "react";
import styles from "./Modal.module.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseApp from "../../../firebaseConfig";

type ModalType = {
	onClick: () => void;
};

const Modal: React.FC<ModalType> = ({ onClick }) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async () => {
		try {
			const userCredential = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password);
			// Handle successful login
			const user = userCredential.user;
			console.log("User logged in:", user);
			setError(null); // Reset error state on successful login
		} catch (error) {
			// Handle errors
			console.error("Login error:", error.message);
			setError(error.message);
		}
	};

	return (
		<div className={styles.modalWrapper}>
			<div className={styles.modal}>
				<div className={styles.closeBtn} onClick={onClick}>
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
