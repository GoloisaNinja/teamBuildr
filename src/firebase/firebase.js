// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	getDocs,
	doc,
	setDoc,
	where,
	query,
} from 'firebase/firestore/lite';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Functions
async function getRoles() {
	const rolesCol = collection(db, 'role');
	const roleSnapshot = await getDocs(rolesCol);
	const roleList = roleSnapshot.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		};
	});
	return roleList;
}
async function getDepartments() {
	const deptsCol = collection(db, 'department');
	const deptSnapshot = await getDocs(deptsCol);
	const deptList = deptSnapshot.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		};
	});
	return deptList;
}
async function getTeam(reportsToId) {
	const q = query(
		collection(db, 'team_member'),
		where('reportsTo_id', '==', reportsToId)
	);
	const querySnapshot = await getDocs(q);
	const teamList = querySnapshot.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		};
	});
	return teamList;
}

export {
	app as firebase,
	db,
	getRoles,
	getDepartments,
	getTeam,
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	doc,
	setDoc,
};
