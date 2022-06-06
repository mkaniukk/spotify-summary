import { Link } from 'react-router-dom'

function Topbar () {
    
    return (
        <div class="topnav">
            <Link to="/" class="active">Home</Link>
            <Link to="/artists">Artists</Link>
            <Link to="/tracks">Tracks</Link>
            <div class="topnav-right">
                <Link to="/settings">Settings</Link>
                <a class="login" href="/login">Log in</a>
            </div>
        </div>
    )
}

export default Topbar