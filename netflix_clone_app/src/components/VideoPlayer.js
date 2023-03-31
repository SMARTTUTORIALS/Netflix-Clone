import React, { useState, useEffect } from 'react';
import './VideoPlayer.css';
import YouTube from 'react-youtube';

function VideoPlayer({ youtubeID }) {

    const [innerWidth, setInnerWidth] = useState(window.innerWidth * 0.5);
    const [innerHeight, setInnerHeight] = useState( (window.innerWidth * 0.5) * 9/16 );

    useEffect(() => {
        const handleResize = () => {

          setInnerWidth(window.innerWidth * 0.5);
          setInnerHeight((window.innerWidth * 0.5) * 9/16);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    const opts = {
        height: innerHeight,
        width: innerWidth,
        playerVars: {
            autoplay: 1,
        },
    }

    const onPlayerReady = (event) => {
        event.target.playVideo();
    }

    return (
        <div className='videoPlayer'>
            
                <YouTube videoId={youtubeID} opts={opts} onReady={onPlayerReady} className='videoPlayer_video'/>
            
        </div>
    )
}

export default VideoPlayer;