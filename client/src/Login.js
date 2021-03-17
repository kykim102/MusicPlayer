import React from 'react';

import { Container } from 'react-bootstrap';

const AUTH_URL =
	'https://accounts.spotify.com/authorize?client_id=0ed84cf0a5064c89920a71ef6ac2402a&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

const Login = () => {
	return (
		<Container
			className="d-flex justify-content-center align-items-center"
			style={{ minHeight: '100vh' }}
		>
			<a className="btn btn-success btn-lg" href={AUTH_URL}>
				Login With Spotify
			</a>
		</Container>
	);
};

export default Login;
