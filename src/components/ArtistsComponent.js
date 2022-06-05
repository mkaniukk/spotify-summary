import React, { Component, useEffect, useState } from 'react';
import {NumFormatter, Capitalize} from '../utils';
import { Link } from "react-router-dom";
import axios from 'axios';

function Artists () {
    const [artists, setArtists] = React.useState([{}]);
    console.log("top artists")

    const createChart=(artists)=>{
        let data = {};
        for (const artist in artists) {
            data[artist.name] = artist?.popularity;
        };
        console.log(data);
        return data;
    }

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
        });

    }, [])

    return (
        <div>
            <h1 class="page-header">
                Your favourite artists
            </h1>
            <div class="container">
                {artists.map((artist) => (
                    <div class="artist-element">
                        <div class="artist-name" text-align="centered">
                                {artist?.name}
                        </div>
                        <div>
                            <img src={artist?.images?.pop()?.url}/>
                        </div>
                        <div class="artist-description">
                            {NumFormatter(parseInt(artist?.followers?.total))} FOLLOWERS
                            <br></br>
                            {artist?.popularity} POPULARITY
                            <br></br>
                            {artist?.genres?.pop()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Artists;