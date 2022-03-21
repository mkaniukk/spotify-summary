import {useState} from 'react'
import reactDom from 'react-dom'

function Greeting (props) {
    const [greeting, setGreeting] = useState("Hello User");

    return <button onMouseMoveCapture = {() => setGreeting("Hello Michal")}>{greeting}</button>
}

export default Greeting