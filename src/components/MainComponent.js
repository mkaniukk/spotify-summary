import Login from './LoginComponent'
import Topbar from './TopbarComponent'
import TopArtistsComponent from './TopArtistsComponent'

function MainComponent () {
    return(
        <div>
            <div>
                <Topbar />
            </div>
            <div>
                <Login />
            </div>
            <div>
                <TopArtistsComponent />
            </div>
        </div>
    );
}

export default MainComponent