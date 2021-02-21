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
import { CgLogOut } from "react-icons/cg";

const Dashboard = ({ result, client_uid, setClient_loged }) => {
	const [inputValue, setInputValue] = useState("");
	const [alertClass, setAlertClass] = useState("hideAlert");
	const [alertType, setAlertType] = useState("warning");
	const [alertDescription, setAlertDescription] = useState("");
	const [returnTable, setReturnTable] = useState("");
	const [user_data, setUser_data] = useState(null);
	const [user_table, setUser_table] = useState(null);

	useEffect(() => {
		// store user data from db
		db.doc("users/" + client_uid).onSnapshot((snapshot) => {
			const data = snapshot.data();
			setUser_data(data);
		});

		// store user table data from db
		db.collection("users/" + client_uid + "/tables").onSnapshot(
			(snapshot) => {
				const tableLength = snapshot.docs.length;
				setUser_table(snapshot.docs.map((doc) => doc.data()));
				if (tableLength !== 0) {
					setReturnTable(<MyTable userUID={client_uid} />);
				}
			}
		);
	}, [client_uid]);

	// user register on DB
	useEffect(() => {
		db.collection("users").onSnapshot((snapshot) => {
			const docs = snapshot.docs;
			let isUserAvaliableOnDB = false;
			for (let i = 0; i < docs.length; i++) {
				let uid = docs[i].data().uid;
				if (uid === client_uid) {
					isUserAvaliableOnDB = true;
				}
			}
			if (!isUserAvaliableOnDB) {
				db.collection("users").doc(client_uid).set({
					uid: client_uid,
					profile: result.additionalUserInfo.profile,
				});
			}
		});
	}, [client_uid, result]);

	const urlValidation = () => {
		if (
			validator.isURL(inputValue) &&
			(inputValue.startsWith("http://") ||
				inputValue.startsWith("https://"))
		) {
			GenerateLink(inputValue, client_uid);
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

	function two_digit_number_converter(inputValue) {
		return inputValue < 10
			? "0" + inputValue.toString()
			: inputValue.toString();
	}

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
				<div className="profile__section">
					<div className="profile">
						<div className="user__pic"></div>
						<img
							src={
								!user_data
									? "https://ui-avatars.com/api/?name=&bold=true&background=000"
									: user_data.profile.picture
							}
							alt="user_picture"
							id="avatar"
						/>
						<div className="user__details">
							<h4>{!user_data ? "" : user_data.profile.name}</h4>
							<h6>
								Total Shorted:{" "}
								{!user_table
									? "∞"
									: two_digit_number_converter(
											user_table.length
									  )}
							</h6>
						</div>
					</div>
					<div
						className="sing-out__section"
						onClick={() => {
							localStorage.removeItem("client_id");
							setClient_loged(false)
						}}
					>
						<CgLogOut />
					</div>
				</div>
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
