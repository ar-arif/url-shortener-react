import { useParams } from "react-router-dom";
import { db } from "../api/firebase";
import { useState, useEffect } from "react";

let idFound = false;
const Redirect = () => {
	const [allUids, setAllUids] = useState([]);
	const [allTables, setAllTables] = useState([]);
	const [centerText, setCenterText] = useState("Chacking your URL ⌛");
	const { id } = useParams();
	// const [idFound, setID_Found] = useState(false);
	const [success, warning, error, info] = [
		"#4caf50",
		"#ff9800",
		"#f44336",
		"#2196f3",
	];
	const [background, setBackground] = useState(warning);
	const style = {
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontFamily: "sans-serif",
		background: background,
		color: "white",
	};

	// useEffect(() => {
	// 	db.collection("users").onSnapshot((snapshot) => {
	// 		const docs = snapshot.docs;
	// 		for (const i in docs) {
	// 			const uid = docs[i].data().uid;
	// 			db.doc("users/" + uid + "/tables/"+ id).onSnapshot((snapshot) => {
	// 				const data = snapshot.data()

	// 				if(!idFound && data!==undefined && data!==null && data!=="" && data.shortID===id){
	// 					setID_Found(true);
	// 					setBackground(success)
	// 					setCenterText("Redirecting to URL ✈️");
	// 					// db.doc("users/" + uid + "/tables/"+ id).update({
	// 					// 	clicked:0
	// 					// })
	// 					break;
	// 				}





	// 			})
	// 		}
	// 	});
	// }, [id, success, idFound]);

	// ###################################################################################

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
				const tables = snapshot.docs;
				setAllTables(tables.map((table) => table.data()));
			});
		});
	}, [allUids]);

	useEffect(() => {
		for (let i = 0; i < allTables.length; i++) {
			if (allTables[i].shortID === id) {
				setBackground(success)
				idFound = true;
				setCenterText("Redirecting to URL ✈️");
				window.location.href = allTables[i].fullLink;
				break;
			} else if (
				allTables.length - 1 === i &&
				allTables[i].shortID !== id &&
				idFound === false
			) {
				setBackground(error)
				setCenterText("Sorry URL not found ☹️");
			}
		}
	}, [allTables, id, success, error]);

	return (
		<div style={style}>
			<h1>{centerText}</h1>
		</div>
	);
};

export default Redirect;
