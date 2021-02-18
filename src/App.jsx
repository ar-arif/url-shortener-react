import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Redirect from "./components/functional_logics/Redirect";

const App = () => {
	return (
		<div className="app">
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/:id" component={Redirect} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
