import React, { Component, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Tracks () {
    const [tracks, setTracks] = React.useState([{}]);
    const fadeMount = useSpring({to: { opacity: 1 }, from:{ opacity: 0 }, config:{duration: 1000}});

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
        console.log(path);
        console.log('Click');
    }

    useEffect(() => {
        fetch('/tracks-data')
        .then(res => {
            return res.json()
        })
        .then(tracks => {
            setTracks(tracks);
        })
        .catch(function(err){
            console.log('Error');
        })

    }, []);

    return (
        <div>
            <h1 class="page-header">
                Your favourite tracks
            </h1>
            <animated.div class="container" style={fadeMount}>
                {tracks.map((track) => (
                    <div class="artist-element" style={{ backgroundImage: `url(${getUrl(track?.album?.images)})`}} onClick={() => redirectToTrack(track)}>
                        <div class="artist-name" text-align="centered">
                            "{track?.name}"<br></br> by <br></br>{getName(track?.artists)}
                        </div>
                        <div class="artist-description">
                            From "{track?.album?.name}"
                        </div>
                    </div>
                ))}
            </animated.div>
        </div>
    );

}

export default Tracks;