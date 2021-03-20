import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import './styles/app.scss';
import { Fragment } from 'react';
import Switch from 'react-bootstrap/esm/Switch';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
	return (
		<Router>
			<Fragment>
				<Switch>
					<Login exact path="/" component={Login} code={code} />
					<Dashboard
						exact
						path="/dashboard"
						code={code}
						component={Dashboard}
					/>
				</Switch>

				{/* <Route
					render={() =>
						code ? (
							<Dashboard code={code} exact path="/dashboard" />
						) : (
							<Login exact path="/" component={Login} />
						)}
				/> */}
			</Fragment>
		</Router>
	);
}

export default App;
