require('dotenv').config();
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
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

module.exports = router;
