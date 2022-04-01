import React, { Component, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function TopArtists () {
    const [data, setData] = React.useState([{}]);
    console.log("top artists")

    useEffect(() => {
        console.log("Use effect");
        
        // const fetchArtists = async () => {
        //     const response = await axios.get('http://localhost:3000/artists').catch(err => console.log(err))
        //     console.log(response);
        //     setArtists(response.data).catch(err => console.log(err));
        // }
        // fetchArtists();
        
        fetch('/artists')
        .then(res => {
            console.log(res);
            return res.json()
        })
        .then(artists => {
            console.log(artists);
            setData({data: artists})
        })
        .catch(function(err){
            console.log('Error');
        })
        
    }, [])

    return (
        <div>
            
        </div>
    );

}

export default TopArtists;