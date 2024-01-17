import Video from '../video/relaxation_video.mp4';
import { Link, } from 'react-router-dom';
import './relaxation_music_hub.css';

function Page404() {
    return (
        <div>
            <video autoPlay muted loop className="nature-background">
                <source src={Video} type="video/mp4"/>
            </video>

            <div className="relaxation-music-search relaxation-music-hub">
                <h1><Link to="/" className="relaxation-music-title">Relaxation Music Hub</Link></h1>
                <br/>
                <br/>

                <h1 className="page-404">404</h1>
                <p className="page-404-description">Page not found</p>
            </div>
        </div>
    )
}

export default Page404;