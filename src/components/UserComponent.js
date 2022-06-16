import React, { Component, useEffect, useState } from 'react';
import {NumFormatter, Capitalize} from '../utils';
import { useSpring, animated } from 'react-spring'

function User () {
    const [user, setUser] = React.useState([{}]);
    const fade = useSpring({to: { opacity: 1 }, from:{ opacity: 0 }, config:{duration: 2000}});

    const getUrl = (images) => {
        let url = '';
        for (const i in images) {
            url = images[i].url;
            break;
        }
        return url;
    }

    useEffect(() => {
        fetch('/user-data')
        .then(res => {
            return res.json()
        })
        .then(user => {
            setUser(user);
        })
        .catch(function(err){
            console.log('Error');
        })

    }, []);

    return (
        <div>
            <h1 class="page-header">
                Logged in as
            </h1>
            <div class="user-element">
                <span class="artist-name">{user.display_name}</span>            
                
                <img src={getUrl(user?.images)}></img>
                
                <div class="artist-description">
                    {user?.followers?.total} FOLLOWERS
                </div>
            </div>
        </div>
    );

}

export default User;