const express = require('express');
const router = express.Router();
const lyricsFinder = require('lyrics-finder');

router.get('/', async (req, res) => {
	const lyrics =
		(await lyricsFinder(req.query.artist, req.query.track)) ||
		'No Lyrics Found';
	res.json({ lyrics });
});

module.exports = router;
