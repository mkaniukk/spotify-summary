import React, { Component, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function Artists () {
    const [artists, setArtists] = React.useState([{}]);
    console.log("top artists")

    useEffect(() => {
        console.log("Use effect");
        
        fetch('/artists')
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
        
    }, [])

    return (
        <div>
            <div class="page-header">
                Your favourite artists:
            </div>
            <div class="container">
                {artists.map((artist) => (
                    <div class="artist-element">
                        <ol>
                            {artist.name}, followers {artist?.followers?.total}, popularity {artist?.popularity}
                        </ol>
                        <img border-radius="20px" width="75%" src={artist?.images?.pop()?.url}/>
                    </div>
                ))
                }
            </div>
        </div>
    );

}

export default Artists;