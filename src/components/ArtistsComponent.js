import React, { Component, useEffect, useState } from 'react';
import {NumFormatter, Capitalize} from '../utils';
import { useSpring, animated } from 'react-spring'
import { Link } from "react-router-dom";
import axios from 'axios';
import { render } from '@testing-library/react';


function Artists () {
    const [artists, setArtists] = React.useState([{}]);
    const [fade, setFade] = useState(false);

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

    // Get main music genre
    const getGenre = (genres) => {
        let genre = '';
        for (const i in genres) {
            genre = genres[i];
            break;
        }
        return genre;
    }

    const redirectToArtist = (artist) => {
        let path = artist?.external_urls?.spotify;
        const newWindow = window.open(path, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    useEffect(() => {
        const getData = async () => {
            await fetch('/artists-data')
            .then(res => {
                return res.json()
            })
            .then(artists => {
                setArtists(artists);
            })
            .catch(function(err){
                console.log('Error');
            })
        }
        getData();
    }, []);

    return (
        <div>
            <h1 class="page-header">
                Your favourite artists
            </h1>
            <animated.div class="container" style={fadeMount}>
                {artists.map((artist) => (
                    <div key={artist?.id} class="artist-element" style={{ backgroundImage: `url(${getUrl(artist?.images)})`}} onClick={() => redirectToArtist(artist)}>
                        <div class="artist-name" text-align="centered">
                            {artist?.name}
                        </div>
                        <div class="artist-description">
                            {NumFormatter(parseInt(artist?.followers?.total))} FOLLOWERS
                            <br></br>
                            {artist?.popularity} POPULARITY
                            <br></br> 
                            {getGenre(artist?.genres)}
                        </div>
                    </div>
                ))}
            </animated.div>
        </div>
    );

}

export default Artists;