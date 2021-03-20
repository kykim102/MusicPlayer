import React from 'react';

function MusicDetail({ playingTrack }) {
	return (
		<div className="musicDetail">
			<img src={playingTrack.albumUrl} alt={playingTrack.title} />
			<h2>{playingTrack.title}</h2>
			<h3>{playingTrack.artist}</h3>
		</div>
	);
}

export default MusicDetail;
