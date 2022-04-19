function Topbar () {
    
    return (
        <div class="topnav">
            <a class="active" href="/">Home</a>
            <a href="/top-artists">Artists</a>
            <a href="/top-tracks">Tracks</a>
            <div class="topnav-right">
                <a href="/settings">Settings</a>
                <a class="login" href="/login">Log in</a>
            </div>
        </div>
    )
}

export default Topbar