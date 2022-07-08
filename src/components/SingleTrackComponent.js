

function SingleTrack(track){

        // Get high resolution picture url
        const getUrl = (images) => {
            let url = '';
            for (const i in images) {
                url = images[i].url;
                break;
            }
            return url;
        }
    
        // Get high resolution picture url
        const getName = (artists) => {
            let name = '';
            for (const i in artists) {
                name = artists[i].name;
                break;
            }
            return name;
        }
    
        const redirectToTrack = (track) => {
            window.navigator.vibrate(100);
            let path = track?.external_urls?.spotify;
            const newWindow = window.open(path, '_blank', 'noopener,noreferrer')
            if (newWindow) newWindow.opener = null
        }
    
        const preview = (track) => {
            window.navigator.vibrate(100);
            try {
                if (!track?.preview_url)
                    return
                // Pause the track that is already being played
                if (track?.preview_url === previewRef.current?.src) {
                    previewRef.current.pause();
                    setTrackPlaying(previewRef.current.src, false);
                    previewRef.current = null;
                } else {
                    // Pause previous track
                    if (previewRef.current !== null) {
                        previewRef.current.pause();
                        setTrackPlaying(previewRef.current.src, false);
                        previewRef.current = null;
                    }
                    // No track is playing 
                    let url = track?.preview_url;
                    let audio = new Audio(url);
                    previewRef.current = audio;
                    audio.play();
                    setTrackPlaying(track?.preview_url, true);
                }
                showIsPlaying();
            } catch (error) {
                console.log(error.message);
            }
        }
    
        const setTrackPlaying = (preview_url, state) => {
            let newTracks = [...tracks];
            for(let track in newTracks){
                if(newTracks[track].preview_url === preview_url)
                    newTracks[track].isPlaying = state;
            }
            setTracks(newTracks);
        }
    
        const showIsPlaying = () => {
            tracks.forEach(track => console.log(track.isPlaying));
        }
    
        const getIcon = (track) => {
            if (track.isPlaying){
                return pause;
            }else{
                return play;
            }
        }

    return(
        <div class="artist-element" style={{ backgroundImage: `url(${getUrl(track?.album?.images)})` }}>
            <div class="artist-name" text-align="centered" onClick={() => redirectToTrack(track)}>
                "{track?.name}"<br></br> by <br></br>{getName(track?.artists)}
            </div>
            <div class="artist-description">
                From "{track?.album?.name}"
            </div>
            <img src={getIcon(track)} class="icon-preview"
                onClick={() => preview(track)}
            />
        </div>
    )

}

export default SingleTrack;