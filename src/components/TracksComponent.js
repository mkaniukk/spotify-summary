import React, { Component, useEffect, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import play from '../icons/play.png'
import pause from '../icons/pause.png'
import { useForceUpdate } from 'framer-motion';

function Tracks() {
    const [tracks, setTracks] = React.useState([{}]);
    const [isPlaying, setIsPlaying] = React.useState([{}]);
    const previewRef = React.useRef(null);

    const fadeMount = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, config: { duration: 1000 } });

    // Get high resolution picture url
    const getUrl = (images) => {
        let url = '';
        for (const i in images) {
            url = images[i].url;
            break;
        }
        return url;
    }

    // Get high resolution picture url
    const getName = (artists) => {
        let name = '';
        for (const i in artists) {
            name = artists[i].name;
            break;
        }
        return name;
    }

    const redirectToTrack = (track) => {
        let path = track?.external_urls?.spotify;
        const newWindow = window.open(path, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const preview = (track) => {
        try {
            if (!track?.preview_url)
                return
            // Pause the track that is already being played
            if (track?.preview_url === previewRef.current?.audio?.src) {
                previewRef.current?.audio.pause();
                previewRef.current = null;
                setTracks(
                    tracks.map(item =>
                        item.id === track.id
                            ? { ...item, isPlaying: false }
                            : item
                    ))
                console.log("stop playing");
                console.log(tracks);
            } else {
                // Pause previous track
                if (previewRef.current !== null) {
                    previewRef.current?.audio.pause();
                    setTracks(
                        tracks.map(item =>
                            item.id === previewRef.current.id
                                ? { ...item, isPlaying: false }
                                : item
                        ))
                    console.log("stop playing previous");
                    console.log(tracks);
                    previewRef.current = null;
                }
                // No track is playing 
                let url = track?.preview_url;
                let audio = new Audio(url);
                previewRef.current = { audio: audio, id: track?.id };
                audio.play();
                setTracks(
                    tracks.map(item =>
                        item.id === track.id
                            ? { ...item, isPlaying: true }
                            : item
                    ))
                console.log("start playing");
                console.log(tracks);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const getIcon = (track) => {
        if (track.isPlaying)
            return pause;
        else
            return play;
    }

    const createPlaylist = () => {
        fetch('/create-playlist')
            .then(res => {
                console.log("Playlist created");
                console.log(res);
            })
            .catch(err => {
                console.log("Playlist error");
                console.log(err);
            })
    };

    useEffect(() => {
        fetch('/tracks-data')
            .then(res => {
                return res.json()
            })
            .then(tracks => {
                tracks.forEach(track => track.isPlaying = false);
                setTracks(tracks);
                console.log(tracks);
            })
            .catch(function (err) {
                console.log(err);
            })

    }, []);

    useEffect(() => {



    }, [tracks]);

    return (
        <div>
            <h1 class="page-header">
                Your favourite tracks
            </h1>
            <animated.div class="container" style={fadeMount}>
                {tracks.map((track) => (
                    <div class="artist-element" style={{ backgroundImage: `url(${getUrl(track?.album?.images)})` }}>
                        <div class="artist-name" text-align="centered" onClick={() => redirectToTrack(track)}>
                            "{track?.name}"<br></br> by <br></br>{getName(track?.artists)}
                        </div>
                        <div class="artist-description">
                            From "{track?.album?.name}"
                        </div>
                        <img src={getIcon(track)} class="icon-preview"
                            onClick={() => preview(track)}
                        />
                    </div>
                ))}
            </animated.div>
            <div>
                <button onClick={createPlaylist}>Create All Time Favourites playlist.</button>
            </div>
        </div>
    );

}

export default Tracks;