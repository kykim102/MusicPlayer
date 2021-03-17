require('dotenv').config();
const express = require('express');
const cors = require('cors');
const lyricsFinder = require('lyrics-finder');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.post('/refresh', async (req, res) => {
	const refreshToken = req.body.refreshToken;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: process.env.REDIRECT_URI,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		refreshToken,
	});

	try {
		const data = await spotifyApi.refreshAccessToken();
		console.log(data.body);
		// spotifyApi.setAccessToken(data.body['access_token']);
	} catch (err) {
		console.log(err.message);
		res.status(400).send('Server Error');
	}
});

app.post('/login', async (req, res) => {
	const code = req.body.code;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: process.env.REDIRECT_URI,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
	});

	try {
		const data = await spotifyApi.authorizationCodeGrant(code);
		res.send({
			accessToken: data.body.access_token,
			refreshToken: data.body.refresh_token,
			expiresIn: data.body.expires_in,
		});
	} catch (err) {
		console.log(err.message);
		res.status(400).send('Server Error');
	}
});

app.get('/lyrics', async (req, res) => {
	const lyrics =
		(await lyricsFinder(req.query.artist, req.query.track)) ||
		'No Lyrics Found';
	res.json({ lyrics });
});

app.listen(3001);
