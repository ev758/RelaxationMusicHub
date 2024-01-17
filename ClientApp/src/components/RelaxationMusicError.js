import Video from '../video/relaxation_video.mp4';
import { Link, } from 'react-router-dom';
import './relaxation_music_hub.css';

function RelaxationMusicError() {
    return (
        <div>
            <video autoPlay muted loop className="nature-background">
                <source src={Video} type="video/mp4"/>
            </video>

            <div className="relaxation-music-search relaxation-music-hub relaxation-music-error">
                <h1><Link to="/" className="relaxation-music-title">Relaxation Music Hub</Link></h1>
                <br/>
                <br/>

                <h1 className="page-error">Error</h1>
                <br/>
                <p className="page-error-description">Return to the Home page</p>
            </div>
        </div>
    )
}

export default RelaxationMusicError;