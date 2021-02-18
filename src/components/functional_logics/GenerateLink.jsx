import { nanoid } from "nanoid";
import { db } from "../api/firebase";

const GenerateLink = (fullLink, uid) => {
	const shortID = nanoid(10);
	const date = new Date().toDateString();
	const timestamp = Date.now();
	const formatDate =
		date.slice(8, 10) + "-" + date.slice(4, 7) + "-" + date.slice(11);
	db.collection(`users/${uid}/tables`).add({
		shortID,
		fullLink,
		timestamp,
		time: new Date().toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		}),
		date: formatDate,
	});
};

export default GenerateLink;
