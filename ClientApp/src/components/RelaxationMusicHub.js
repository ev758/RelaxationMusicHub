import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Video from '../video/relaxation_video.mp4';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './relaxation_music_hub.css';

function RelaxationMusicHub() {
    const [keyword, setKeyword] = useState("");
    const navigation = useNavigate();

    return (
        <div>
            {/* video background */}
            <video autoPlay muted loop className="nature-background">
                <source src={Video} type="video/mp4"/>
            </video>

            <div className="relaxation-music-search relaxation-music-hub">
                <h1><Link to="/" className="relaxation-music-title">Relaxation Music Hub</Link></h1>
                <br/>

                {/* search bar */}
                <InputGroup className="mb-3">
                    {/* goes to music search results page with keyword input */}
                    <Form.Control
                    placeholder="Enter a nature or relax word"
                    onInput={(event) => setKeyword(event.currentTarget.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            navigation(`musicsearchresults/${keyword}`, { state: {keyword} });
                        }
                    }}
                    />
                    <Button onClick={() => {navigation(`musicsearchresults/${keyword}`, { state: {keyword} })} } variant="dark">Search</Button>
                </InputGroup>
            </div>
        </div>
    )
}

export default RelaxationMusicHub;