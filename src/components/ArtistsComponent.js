import React, { Component, useEffect, useState } from 'react';
import {NumFormatter, Capitalize} from '../utils';
import { useSpring, animated } from 'react-spring'
import { AnimateSharedLayout } from "framer-motion"
import { Link } from "react-router-dom";
import axios from 'axios';
import { render } from '@testing-library/react';

function Artists () {
    const [artists, setArtists] = React.useState([{}]);
    const [show, setShow] = React.useState(false);
    const [element, setElement] = useState("artist-element");

    const fadeMount = useSpring({to: { opacity: 1 }, from:{ opacity: 0 }, config:{duration: 1000}});
    const fadeClick = useSpring({to: { opacity: 0.5 }, from:{ opacity: 1 }, config:{duration: 1000}});

    const showDescription = () => {
        setShow(!show);
        console.log(show);
    }
    
    const getUrl = (images) => {
        let url = '';
        for (const i in images) {
            url = images[i].url;
            break;
        }
        return url;
    }

    const getGenre = (genres) => {
        let genre = '';
        for (const i in genres) {
            genre = genres[i];
            break;
        }
        return genre;
    }

    useEffect(() => {
        fetch('/top-artists')
        .then(res => {
            return res.json()
        })
        .then(artists => {
            console.log(artists);
            setArtists(artists);
        })
        .catch(function(err){
            console.log('Error');
        })
        
    }, []);

    return (
        <div>
            <h1 class="page-header">
                Your favourite artists
            </h1>
            <animated.div style={fadeMount} class="container">
                {artists.map((artist) => (
                    <div class="artist-element" onClick={setElement} style={{ backgroundImage: `url(${getUrl(artist?.images)})`}}>
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