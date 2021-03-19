import React from 'react';
import { Image } from 'react-bootstrap';

function MusicDetail({ playingTrack }) {
	return (
		<div className="d-flex justify-content-center h-100">
			<div className="row  align-items-center">
				<Image
					src={playingTrack.albumUrl}
					alt={playingTrack.title}
					roundedCircle
				/>
				<h2>{playingTrack.title}</h2>
				<h3 className="text-muted">{playingTrack.artist}</h3>
			</div>
		</div>
	);
}

export default MusicDetail;
