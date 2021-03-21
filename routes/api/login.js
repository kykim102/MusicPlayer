require('dotenv').config();
const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

router.post('/', async (req, res) => {
	console.log(req.body);
	console.log(res.body);
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

module.exports = router;
