import React, { Component, useEffect, useState } from 'react';
import {NumFormatter, Capitalize} from '../utils';
import { useSpring, animated } from 'react-spring'
import themeSlice from '../options/themeSlice';

function Settings () {
    const [user, setUser] = React.useState([{}]);
    const fade = useSpring({to: { opacity: 1 }, from:{ opacity: 0 }, config:{duration: 2000}});

    useEffect(() => {
        console.log("Use effect");

    }, [])

    return (
        <div class="page-header">
            <input type="checkbox" id="switch" class="checkbox" />
            <label for="switch" class="toggle" />
        </div>
    );
}

export default Settings;