import React, { Component, useEffect, useState } from 'react';
import {NumFormatter, Capitalize} from '../utils';
import { useSpring, animated } from 'react-spring'

function Settings () {
    const [user, setUser] = React.useState([{}]);
    const fade = useSpring({to: { opacity: 1 }, from:{ opacity: 0 }, config:{duration: 2000}});

    useEffect(() => {
        console.log("Use effect");

    }, [])

    return (
        <div>
            This is settings component.
        </div>
    );
}

export default Settings;