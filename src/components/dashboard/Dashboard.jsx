import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./Dashboard.scss";
import MyTable from "./table/MyTable";
import { useState, useEffect } from "react";
import validator from "validator";
import { AiFillCloseCircle } from "react-icons/ai";
import GenerateLink from "../functional_logics/GenerateLink";
import { db } from "../api/firebase";

const Dashboard = ({ data }) => {
	const [inputValue, setInputValue] = useState("");
	const [alertClass, setAlertClass] = useState("hideAlert");
	const [alertType, setAlertType] = useState("warning");
	const [alertDescription, setAlertDescription] = useState("");
	const [returnTable, setReturnTable] = useState("");
	const [userData] = useState(data);

	// user register on DB
	useEffect(() => {
		db.collection("users").onSnapshot((snapshot) => {
			const docs = snapshot.docs;
			let isUserAvaliableOnDB = false;
			for (let i = 0; i < docs.length; i++) {
				let uid = docs[i].data().uid;
				if (uid === userData.user.uid) {
					isUserAvaliableOnDB = true;
				}
			}
			if (!isUserAvaliableOnDB) {
				db.collection("users").doc(userData.user.uid).set({
					uid: userData.user.uid,
					profile: userData.additionalUserInfo.profile,
				});
			}
		});
	}, [userData]);

	// get table data
	useEffect(() => {
		db.collection(`users/${userData.user.uid}/tables`).onSnapshot((snapshot) => {
			const tableLength = snapshot.docs.length;
			if (tableLength === 0) {
				setReturnTable("");
			} else {
				setReturnTable(<MyTable userUID={userData.user.uid} />);
			}
		});
	}, [userData]);

	const urlValidation = () => {
		if (
			validator.isURL(inputValue) &&
			(inputValue.startsWith("http://") ||
				inputValue.startsWith("https://"))
		) {
			GenerateLink(inputValue, userData.user.uid);
			setAlertClass("");
			setAlertType("success");
			setAlertDescription("Short link Generat Successfully");
		} else {
			setAlertClass("");
			setAlertType("error");
			setAlertDescription("Please enter a valid URL");
		}
		setInputValue("");
	};

	const theme = createMuiTheme({
		palette: {
			type: "dark",
		},
	});

	return (
		<div className="dashboard">
			<ThemeProvider theme={theme}>
				<Alert
					className={alertClass}
					variant="filled"
					severity={alertType}
				>
					{alertDescription}
					<AiFillCloseCircle
						className="closeAlert"
						onClick={() => setAlertClass("hideAlert")}
					/>
				</Alert>
				<br />
				<div className="input__area">
					<TextField
						id="filled-basic"
						className="input__fild"
						label="Enter URL"
						type="url"
						variant="filled"
						placeholder="https://example.com"
						value={inputValue}
						onChange={(event) => setInputValue(event.target.value)}
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={() => urlValidation()}
					>
						Short Link
					</Button>
				</div>
				<br />
				<div className="table__area">{returnTable}</div>
			</ThemeProvider>
		</div>
	);
};

export default Dashboard;
