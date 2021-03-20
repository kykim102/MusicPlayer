import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = (code) => {
	const [ accessToken, setAcessToken ] = useState();
	const [ refreshToken, setRefreshToken ] = useState();
	const [ expiresIn, setExpiresIn ] = useState();

	const fetchUserInfo = async () => {
		try {
			const res = await axios.post('/login', {
				code,
			});
			setAcessToken(res.data.accessToken);
			setRefreshToken(res.data.refreshToken);
			setExpiresIn(res.data.expiresIn);

			window.history.pushState({}, null, '/');
		} catch (e) {
			window.location = '/';
		}
	};

	const refreshUserToken = async () => {
		try {
			const res = await axios.post('/refresh', {
				refreshToken,
			});
			setAcessToken(res.data.accessToken);
			setRefreshToken(res.data.refreshToken);
			setExpiresIn(res.data.expiresIn);

			// Removing info from url to public
			window.history.pushState({}, null, '/');
		} catch (e) {
			window.location = '/';
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
