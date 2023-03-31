import React from 'react';
import './VideoPlayer.css';
import YouTube from 'react-youtube';

function VideoPlayer({ youtubeID }) {

    const opts = {
        playerVars: {
            autoplay: 1,
        },
    }

    const onPlayerReady = (event) => {
        event.target.playVideo();
    }

    return (
        <div className='videoPlayer'>
            
                <YouTube videoId={youtubeID} opts={opts} onReady={onPlayerReady}/>
            
        </div>
    )
}

export default VideoPlayer