import React, { Component, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function Tracks () {
    const [tracks, setTracks] = React.useState([{}]);
    console.log("top tracks")

    useEffect(() => {
        console.log("Use effect");
        
    }, [])

    return (
        <div>
            This is tracks component.
        </div>
    );

}

export default Tracks;