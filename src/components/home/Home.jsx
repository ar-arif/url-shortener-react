import "./Home.scss";
import GoogleButton from "react-google-button";
import { Button } from "@material-ui/core";
import { BsPhone } from "react-icons/bs";
import { firebase } from "../api/firebase";
import Dashboard from "../dashboard/Dashboard";
import { useState } from "react";

const Home = () => {
	let provider = new firebase.auth.GoogleAuthProvider();
	const [singInHide, setSingInHide] = useState("");
	const [afterLoginRender, setAfterLoginRender] = useState("");

	const googleAuth = () => {
		firebase.auth().signInWithPopup(provider)
			.then((result) => {
				setSingInHide("sing__in__hide");
				setAfterLoginRender(<Dashboard data={result} />);
			})
			.catch((error) => {
				let errorCode = error.code;
				let errorMessage = error.message;
				let email = error.email;
				let credential = error.credential;
				console.log(
					errorCode,
					errorMessage,
					"\n\n",
					email,
					"\n\n",
					credential
				);
			});
	};
	return (
		<>
			<div className={"home " + singInHide}>
				<GoogleButton id="google__btn" onClick={googleAuth} />
				<div className="other__login">
					<p>OR</p>

					<Button
						className="phone__btn"
						variant="contained"
						color="primary"
						startIcon={<BsPhone />}
						onClick={() => {
							console.log("Phone button clicked");
						}}
					>
						<span className="phone__btn__text">
							Sing in with Phone
						</span>
					</Button>
				</div>
			</div>

			{afterLoginRender}
		</>
	);
};

export default Home;
