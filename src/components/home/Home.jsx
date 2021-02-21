import "./Home.scss";
import GoogleButton from "react-google-button";
import { Button } from "@material-ui/core";
import { BsPhone } from "react-icons/bs";
import { firebase } from "../api/firebase";
import Dashboard from "../dashboard/Dashboard";
import { useState, useEffect } from "react";
// import GoogleLogin from "react-google-login";

const Home = () => {
	let provider = new firebase.auth.GoogleAuthProvider();
	const [dashboard_component, set_dashboard_component] = useState(null);
	const client_id = localStorage.getItem("client_id");
	const [client_loged, setClient_loged] = useState(false);

	useEffect(() => {
		if (client_id !== null && client_id !== undefined && client_id !== "") {
			setClient_loged(true);
			set_dashboard_component(
				<Dashboard
					client_uid={client_id}
					setClient_loged={setClient_loged}
				/>
			);
		}
	}, [client_id]);

	const googleAuth = () => {
		firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				setClient_loged(true);
				set_dashboard_component(
					<Dashboard
						result={result}
						client_uid={result.user.uid}
						setClient_loged={setClient_loged}
					/>
				);
				localStorage.setItem("client_id", result.user.uid);
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

	const login_component = (
		<div className="home">
			<GoogleButton id="google__btn" onClick={googleAuth} />

			{
				// <GoogleLogin
				// 	clientId="172889057099-4l43ir7rlc6qkd2o5fb8c858naikodif.apps.googleusercontent.com"
				// 	theme="dark"
				// 	onSuccess={res=>console.log(res)}
				// 	onFailure={res=>console.log(res)}
				// 	// cookiePolicy="single_host_origin"
				// />
			}

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
					<span className="phone__btn__text">Sing in with Phone</span>
				</Button>
			</div>
		</div>
	);

	return (
		<>
			{!client_loged ? login_component : null}

			{!client_loged ? null : dashboard_component}
		</>
	);
};

export default Home;
