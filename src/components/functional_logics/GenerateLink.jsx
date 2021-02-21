import { nanoid } from "nanoid";
import { db, firebase } from "../api/firebase";

const GenerateLink = (fullLink, uid) => {
	const shortID = nanoid(10);
	const date = new Date().toDateString();
	const formatDate =
		date.slice(8, 10) + "-" + date.slice(4, 7) + "-" + date.slice(11);
	db.collection(`users/${uid}/tables`).doc(shortID).set({
		shortID,
		fullLink,
		timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		time: new Date().toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		}),
		date: formatDate,
		uid,
		clicked: 0,
	});
};

export default GenerateLink;
