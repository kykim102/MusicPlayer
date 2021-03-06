import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = (code) => {
	const [ accessToken, setAcessToken ] = useState();
	const [ refreshToken, setRefreshToken ] = useState();
	const [ expiresIn, setExpiresIn ] = useState();

	const fetchUserInfo = async () => {
		try {
			const res = await axios.post('http://localhost:3001/login', {
				code,
			});
			setAcessToken(res.data.accessToken);
			setRefreshToken(res.data.refreshToken);
			setExpiresIn(res.data.expiresIn);

			window.history.pushState({}, null, '/');
		} catch (e) {
			window.location = '/';
			console.log(e.message);
		}
	};

	const refreshUserToken = async () => {
		try {
			const res = await axios.post('http://localhost:3001/refresh', {
				refreshToken,
			});
			setAcessToken(res.data.accessToken);
			setRefreshToken(res.data.refreshToken);
			setExpiresIn(res.data.expiresIn);

			// Removing info from url to public
			window.history.pushState({}, null, '/');
		} catch (e) {
			console.log(e.message);
			// window.location = '/dashboard';
		}
	};

	useEffect(
		() => {
			fetchUserInfo();
		},
		[ code ]
	);

	useEffect(
		() => {
			if (!refreshToken || !expiresIn) return;
			const interval = setInterval(() => {
				refreshUserToken();
			}, (expiresIn - 60) * 1000);

			return () => clearInterval(interval);
		},
		[ refreshToken, expiresIn ]
	);

	return accessToken;
};

export default useAuth;
