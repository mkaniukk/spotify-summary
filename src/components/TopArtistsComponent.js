import React, { Component, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function TopArtists () {
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
            <div>
                {artists.map((artist) => (
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

export default TopArtists;