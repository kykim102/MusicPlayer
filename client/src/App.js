import {
	BrowserRouter,
	Router,
	Route,
	Switch,
	useLocation,
} from 'react-router-dom';
import { Fragment } from 'react';

import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
	const location = useLocation();

	return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
