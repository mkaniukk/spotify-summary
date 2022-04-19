import React, { Component, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function TopTracks () {
    const [tracks, setTracks] = React.useState([{}]);
    console.log("top tracks")

    useEffect(() => {
        console.log("Use effect");
        
        fetch('/tracks')
        .then(res => {
            return res.json()
        })
        .then(tracks => {
            console.log(tracks);
            setArtists(tracks);
        })
        .catch(function(err){
            console.log('Error');
        })
        
    }, [])

    return (
        <div>
            <div class="page-header">
                Your favourite tracks:
            </div>
            <div class="container">
                {tracks.map((track) => (
                    <div class="artist-element">
                        <ol>
                            {artist.name}, followers {artist?.followers?.total}, popularity {artist?.popularity}
                        </ol>
                        <img src={artist?.images?.pop()?.url} width="200"/>
                    </div>
                ))
                }
            </div>
        </div>
    );

}

export default TopTracks;