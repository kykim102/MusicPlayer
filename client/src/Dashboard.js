import React, { useState, useEffect } from 'react';
import useAuth from './useAuth';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import MusicDetail from './MusicDetail';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';

const spotifyApi = new SpotifyWebApi({
	clientId: '0ed84cf0a5064c89920a71ef6ac2402a',
});

function Dashboard({ code }) {
	const accessToken = useAuth(code);
	const [ search, setSearch ] = useState('');
	const [ searchResult, setSearchResult ] = useState([]);
	const [ playingTrack, setPlayingTrack ] = useState();
	const [ lyrics, setLyrics ] = useState('');
	const [ showDetail, setShowDetail ] = useState(false);

	const chooseTrack = (track) => {
		setPlayingTrack(track);
		setSearch('');
		setLyrics('');
		setShowDetail(true);
	};

	const searchSongs = async (search, cancel) => {
		if (cancel) return;
		const searchedResult = await spotifyApi.searchTracks(search);
		setSearchResult(
			searchedResult.body.tracks.items.map((track) => {
				const smallestAlbumImage = track.album.images.reduce(
					(smallest, image) => {
						if (image.height < smallest.height) return image;
						return smallest;
					},
					track.album.images[0]
				);

				return {
					artist: track.artists[0].name,
					title: track.name,
					uri: track.uri,
					albumUrl: smallestAlbumImage.url,
				};
			})
		);
	};

	const searchLyrics = async () => {
		const res = await axios.get('http://localhost:3001/lyrics', {
			params: {
				track: playingTrack.title,
				artist: playingTrack.artist,
			},
		});

		setLyrics(res.data.lyrics);
	};

	const toggleDetail = () => {
		if (lyrics !== '') {
			setShowDetail(!showDetail);
		}
	};

	useEffect(
		() => {
			if (!playingTrack) return;

			searchLyrics();
		},
		[ playingTrack ]
	);

	useEffect(
		() => {
			if (!accessToken) return;
			spotifyApi.setAccessToken(accessToken);
		},
		[ accessToken ]
	);

	useEffect(
		() => {
			if (!search) return setSearchResult([]);
			if (!accessToken) return;

			let cancel = false;

			searchSongs(search, cancel);

			return () => (cancel = true);
		},
		[ search, accessToken ]
	);

	return (
		<div className="playerContainer">
			<input
				className="trackSearchBar"
				type="search"
				placeholder="Search Songs/Artists"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div className="searchedResult">
				{searchResult.map((track) => (
					<TrackSearchResult
						track={track}
						key={track.uri}
						chooseTrack={chooseTrack}
					/>
				))}
				<div onClick={() => toggleDetail()}>
					{searchResult.length === 0 &&
						(showDetail ? (
							<MusicDetail playingTrack={playingTrack} />
						) : (
							<div className="musicLyrics">{lyrics}</div>
						))}
				</div>
			</div>
			<div>
				<Player
					accessToken={accessToken}
					trackUri={playingTrack ? playingTrack.uri : undefined}
				/>
			</div>
		</div>
	);
}

export default Dashboard;
