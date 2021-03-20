import React from 'react';

function TrackSearchResult({ track, chooseTrack }) {
	function handlePlay() {
		chooseTrack(track);
	}

	return (
		<div className="resultContainer" onClick={handlePlay}>
			<img src={track.albumUrl} alt={track.artist} />
			<div className="trackTitle">
				<div>{track.title}</div>
			</div>
			<div className="artistName">{track.artist}</div>
		</div>
	);
}

export default TrackSearchResult;
