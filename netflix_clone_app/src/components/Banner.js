import axios from '../utils/axios';
import React, { useState, useEffect } from 'react';
import './Banner.css';
import requests from '../utils/Requests';
import genres from '../utils/genres';
import VideoPlayer from './VideoPlayer';


function Banner() {

    const [movie, setMovie] = useState([]);
    const [genreIds, setGenreIds] = useState([]);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const [youtubeID, setYoutubeID] = useState("");
    const [innerHeight, setInnerHeight] = useState((window.innerWidth * 0.7) * 9 / 16);

    const baseBannerUrl = process.env.REACT_APP_BASE_URL_TMDB_IMG;

    const truncateDescription = (text, n) => {
        return text?.length > n ? text.substr(0, n - 1) + "..." : text;
    }

    //below useEffect is to fetch the banner movie in random
    useEffect(() => {
        async function fetchData() {
            const rand = Math.random();
            const selectFetch = Math.abs(Math.floor(rand * 15)) > 5;
            const response = await axios.get(selectFetch ? requests.fetchTrending : requests.fetchNetflixOriginals)
            .catch((err)=>{
                return err.message;
            });

            //abs is used since there is sometimes a bug which returns a -ve value
            const index = Math.abs(Math.floor(rand * response.data.results.length - 1))

            //set the movie from the results.
            setMovie(response.data.results[index])

            //set the genres
            setGenreIds([...response.data.results[index].genre_ids])

            //return the response to complete the promise chain
            return response;
        }

        //calling the async function
        fetchData();
    }, []);

    // below useEffect is to fetch the movie trailers
    useEffect(() => {
        async function getYoutubeID() {
            if (movie.id) {
                const response = await axios.get(`/${movie.media_type ? movie.media_type : "tv"}/${movie.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
                    .catch((err) => {
                        return err.message;
                    });
                const rand = Math.random();
                const index = Math.abs(Math.floor(rand * response.data.results.length - 1))
                setYoutubeID(response.data.results[index].key);
                return response;
            }


        }

        getYoutubeID();
    }, [movie])

    //below use effect is for resizing the video playback close button
    useEffect(() => {
        const handleResize = () => {
            setInnerHeight((window.innerWidth * 0.5) * 9 / 16);
        };

        window.addEventListener('resize', handleResize);

        //returning an anonymous method to complete the useEffect promise hook
        //and also detach the listener on exit.
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const myListButtonHandler = () => {
        console.log("This feature is under construction..");
    }

    const addToMyListHandler = () => {
        console.log("This feature is under construction..");
    }

    return (
        <header className='banner' style={{
            backgroundSize: "cover", backgroundImage:
                `url("${baseBannerUrl}${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
        }}>
            <div className='banner_contents'>
                <h1 className='banner_title'>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className='banner_buttons'>
                    <button className='banner_button' onClick={() => setShowVideoPlayer(true)}>
                        <i className="fa-sharp fa-solid fa-play" /> Play
                    </button>
                    <button className='banner_button' onClick={myListButtonHandler}>
                        <i className="fa-sharp fa-solid fa-list" /> My List
                    </button>
                    <button className='banner_button' onClick={addToMyListHandler}>
                        <i className="fa-sharp fa-solid fa-list" /> Add To My List
                    </button>
                </div>
                <h2 className='banner_description'>
                    {truncateDescription(movie?.overview, 200)}
                </h2>
                <h4 className='banner_genre'>Genres: {genreIds.reduce(
                    (result, genreId) => result + genres[genreId] + " | "
                    , " | ")}</h4>
            </div>
            <div className='banner--fadeBottom' />
            <div>
                {showVideoPlayer && (
                    <div className='videoPlayer_container'>
                        <VideoPlayer youtubeID={youtubeID} />
                        <button className='close-button' style={{ height: innerHeight }}>
                            <i className="fa-sharp fa-solid fa-xmark fa-2xl"
                                onClick={() => setShowVideoPlayer(false)}
                            /></button>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Banner