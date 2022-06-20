import { Link } from 'react-router-dom'
import home_icon from '../icons/home_icon.png'
import artists from '../icons/artists.png'
import tracks from '../icons/tracks.png'
import user from '../icons/user.png'
import settings from '../icons/settings.png'

function Topbar () {
    
    return (
        <div class="topnav">
            <Link to="/" class="active"><img src={home_icon} class="icon"/><br></br>Home</Link>
            <Link to="/artists"><img src={artists} class="icon"/><br></br>Artists</Link>
            <Link to="/tracks"><img src={tracks} class="icon"/><br></br>Tracks</Link>
            <div class="topnav-right">
                <Link to="/settings"><img src={settings} class="icon"/><br></br>Settings</Link>
                <a class="login" href="/login"><img src={user} class="icon"/><br></br>Log in</a>
            </div>
        </div>
    )
}

export default Topbar