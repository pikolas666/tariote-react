// firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyBidJFiC6aO6aEX2LRfszOr_Wuyt7Lmrq0",
	authDomain: "tariote2.firebaseapp.com",
	databaseURL: "https://tariote2-default-rtdb.firebaseio.com",
	projectId: "tariote2",
	storageBucket: "tariote2.appspot.com",
	messagingSenderId: "953123613057",
	appId: "1:953123613057:web:45bc602c9470ab639ee080",
	measurementId: "G-VNEMJ27GJG",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
