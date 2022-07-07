import {NumFormatter, Capitalize} from '../utils';

function SingleArtist({artist}){
    
    // Get high resolution picture url
    const getUrl = (images) => {
        let url = '';
        for (const i in images) {
            url = images[i].url;
            break;
        }
        return url;
    }

    // Get main music genre
    const getGenre = (genres) => {
        let genre = '';
        for (const i in genres) {
            genre = genres[i];
            break;
        }
        return genre;
    }

    const redirectToArtist = (artist) => {
        window.navigator.vibrate(100);
        let path = artist?.external_urls?.spotify;
        const newWindow = window.open(path, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return(
        <div key={artist?.id} class="artist-element" style={{ backgroundImage: `url(${getUrl(artist?.images)})`}} onClick={() => redirectToArtist(artist)}>
            <div class="artist-name" text-align="centered">
                {artist?.name}
            </div>
            <div class="artist-description">
                {NumFormatter(parseInt(artist?.followers?.total))} FOLLOWERS
                <br></br>
                {artist?.popularity} POPULARITY
                <br></br> 
                {getGenre(artist?.genres)}
            </div>
        </div>
    );
}

export default SingleArtist;