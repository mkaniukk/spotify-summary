import React, { Component, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring'
import SingleArtist from './SingleArtistComponent';

function Artists () {
    const [artists, setArtists] = React.useState([{}]);
    const fadeMount = useSpring({to: { opacity: 1 }, from:{ opacity: 0 }, config:{duration: 1000}});

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
                    <SingleArtist artist={artist}/>
                ))}
            </animated.div>
        </div>
    );

}

export default Artists;