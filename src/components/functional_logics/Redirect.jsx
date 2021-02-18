import { useParams } from "react-router-dom";
import { db } from "../api/firebase";
import { useState, useEffect } from "react";

const Redirect = () => {
	const [allUids, setAllUids] = useState([]);
	const [allTables, setAllTables] = useState([]);
	const [centerText, setCenterText] = useState("Chacking your URL ⌛");
	const { id } = useParams();
	const style = {
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontFamily: "sans-serif",
	};

	// get uid of every user then setUids
	useEffect(() => {
		db.collection("users").onSnapshot((snapshot) => {
			const users = snapshot.docs;
			setAllUids(users.map((user) => user.data().uid));
		});
	}, []);

	// get tables data of every user then setUrls
	useEffect(() => {
		allUids.forEach((uid) => {
			db.collection(`users/${uid}/tables`).onSnapshot((snapshot) => {
				const tables = snapshot.docs
				setAllTables(tables.map((table) => table.data()))
			});
		});
	}, [allUids]);

	useEffect(() => {
		for (let i = 0; i < allTables.length; i++) {
			if (allTables[i].shortID === id) {
				setCenterText("Redirecting to URL ✈️")
				window.location.href = allTables[i].fullLink;
				break;
			} else if (
				allTables.length - 1 === i &&
				allTables[i].shortID !== id
			) {
				setCenterText("Sorry, your URL not found 😓");
			}
		}
	}, [allTables, id]);

	return (
		<div style={style}>
			<h1>{centerText}</h1>
		</div>
	);
};

export default Redirect;
