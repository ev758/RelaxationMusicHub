import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Video from '../video/relaxation_video.mp4';
import Image from '../image/abstract.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './relaxation_music_hub.css';

function audioControls(relaxationAudioId, playButtonId) {
    //declarations
    let relaxationAudio = document.getElementById(relaxationAudioId);
    let playButton = document.getElementById(playButtonId);

    if (relaxationAudio.paused) {
        //plays audio
        relaxationAudio.play();
        playButton.innerHTML = "pause";
    }
    else {
        //pauses audio
        relaxationAudio.pause();
        playButton.innerHTML = "play_arrow";
    }
}

//sets audio loop to true or false
function audioLoop(relaxationAudioId, loopButtonId) {
    //declarations
    let relaxationAudio = document.getElementById(relaxationAudioId);
    let loopButton = document.getElementById(loopButtonId);

    if (!relaxationAudio.loop) {
        relaxationAudio.loop = true;
        loopButton.style.backgroundColor = "#5FFAB8";
    }
    else {
        relaxationAudio.loop = false;
        loopButton.style.backgroundColor = "";
    }
}

//sets audio volume
function audioVolume(relaxationAudioId, audioVolumeId) {
    //declarations
    let relaxationAudio = document.getElementById(relaxationAudioId);
    let volume = document.getElementById(audioVolumeId);

    //calculates audio volume
    relaxationAudio.volume = volume.value * 0.01;
}

//displays audio time
function audioTime(relaxationAudioId, relaxationMusicId, playButtonId, audioTimeId) {
    //declarations
    let relaxationAudio = document.getElementById(relaxationAudioId);
    let relaxationMusic = document.getElementById(relaxationMusicId);
    let playButton = document.getElementById(playButtonId);
    let time = document.getElementById(audioTimeId);

    //sets max and min of slider
    relaxationMusic.max = relaxationAudio.duration;
    relaxationMusic.min = 0;

    //sets value of slider with audio's current time
    relaxationMusic.value = relaxationAudio.currentTime;

    //calculates and displays audio time
    if (relaxationAudio.currentTime % 60 < 10) {
        time.innerHTML = " " + Math.floor(relaxationMusic.value / 60) + ":0"
            + (Math.floor(relaxationMusic.value) - (60 * Math.floor(relaxationMusic.value / 60)));
    }
    else {
        time.innerHTML = " " + Math.floor(relaxationMusic.value / 60) + ":"
            + (Math.floor(relaxationMusic.value) - (60 * Math.floor(relaxationMusic.value / 60)));
    }

    if (relaxationAudio.ended) {
        playButton.innerHTML = "play_arrow";
    }
}

//displays audio time with slider value
function audioTimeUpdate(relaxationAudioId, relaxationMusicId, playButtonId, audioTimeId) {
    //declarations
    let relaxationAudio = document.getElementById(relaxationAudioId);
    let relaxationMusic = document.getElementById(relaxationMusicId);
    let playButton = document.getElementById(playButtonId);
    let time = document.getElementById(audioTimeId);

    //pauses audio
    relaxationAudio.pause();
    playButton.innerHTML = "play_arrow";

    //sets max and min of slider
    relaxationMusic.max = relaxationAudio.duration;
    relaxationMusic.min = 0;

    //sets audio time with slider value
    relaxationAudio.currentTime = relaxationMusic.value;

    //calculates and displays audio time
    time.innerHTML = " " + Math.floor(relaxationAudio.currentTime / 60) + ":"
        + (Math.floor(relaxationAudio.currentTime) - (60 * Math.floor(relaxationAudio.currentTime / 60)));
}

function MusicSearchResults() {
    //declarations
    const location = useLocation();
    const [relaxationMusic, setRelaxationMusic] = useState([]);
    const [keyword, setKeyword] = useState(location.state.keyword);
    const navigation = useNavigate();

    useEffect(() => {
        fetch(`api/relaxationmusic/${keyword}`).then((results) => {
            return results.json();
        }).then(audioData => {
            setRelaxationMusic(audioData);
        })
    }, [keyword]);

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
                        id="relaxationMusicSearch"
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                setKeyword(event.currentTarget.value);
                                navigation(`../musicsearchresults/${event.currentTarget.value}`, { replace: true, state: {keyword} });
                            }
                        }}
                    />
                    <Button onClick={() => {
                        setKeyword(document.getElementById("relaxationMusicSearch").value);
                        navigation(`../musicsearchresults/${document.getElementById("relaxationMusicSearch").value}`, { replace: true, state: {keyword} });
                    }} variant="dark">Search</Button>
                </InputGroup>
                <br/>
                <br/>

                <h2 className="music-search-results">{(relaxationMusic.length > 1) ? (relaxationMusic.length + " results of " + keyword) : (relaxationMusic.length + " result of " + keyword)}</h2>
                <br/>
                <br/>

                {
                    /* displays audio players and data dynamically */
                    relaxationMusic.map((audioData, i) => (
                        <div className="relaxation-music" key={audioData.id}>
                            <figure className="relaxation-music-figure">
                                <img className="relaxation-music-image" src={Image} alt="Abstract cover"/>
                                <figcaption className="relaxation-music-caption">{audioData.title} <br/><br/> {audioData.artist}</figcaption>
                            </figure>

                            <audio id={`relaxationAudio${i}`} onTimeUpdate={() => audioTime(`relaxationAudio${i}`, `relaxationMusic${i}`, `playButton${i}`, `audioTime${i}`)}>
                                <source src={require(`../music/${audioData.title}.mp3`)} type="audio/mpeg"/>
                            </audio>

                            <div className="relaxation-audio">
                                {/* audio slider */}
                                <input className="audio" onInput={() => audioTimeUpdate(`relaxationAudio${i}`, `relaxationMusic${i}`, `playButton${i}`, `audioTime${i}`)} type="range" id={`relaxationMusic${i}`}/>
                                <span id={`audioTime${i}`}></span>
                            </div>

                            <button className="relaxation-music-play-button" onClick={() => audioControls(`relaxationAudio${i}`, `playButton${i}`)}><i className="material-icons" id={`playButton${i}`}>play_arrow</i></button>
                            <button className="relaxation-music-loop-button" onClick={() => audioLoop(`relaxationAudio${i}`, `loopButton${i}`)} id={`loopButton${i}`}><i className="material-icons">loop</i></button>

                            <div className="audio-volume">
                                {/* volume slider */}
                                <input onInput={() => audioVolume(`relaxationAudio${i}`, `audioVolume${i}`)} type="range" id={`audioVolume${i}`}/>
                            </div>

                            <p className="audio-credit">Audio by <a href={audioData.credit[0]}>{audioData.credit[1]}</a> via <a href="https://pixabay.com/">Pixabay</a></p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MusicSearchResults;