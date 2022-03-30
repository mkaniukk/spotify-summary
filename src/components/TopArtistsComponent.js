import React, { Component, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function TopArtists () {
    const [artists, setArtists] = React.useState([]);
    console.log("top artists")

    useEffect(() => {
        console.log("Use effect");
        fetch('./artists')
        .then(res => {
            console.log(res);
            return res.json()
        })
        .then(users => {
            console.log(users);
            setArtists({users})
        })
    })

    return (
        <div>
            <div>
                Hello
            </div>
            <div>
                {this.state.users.map(user =>
                <div key={user.id}>user: {user.name} Password: {user.password}</div>
            )}
            </div>
        </div>
    );

}

export default TopArtists;