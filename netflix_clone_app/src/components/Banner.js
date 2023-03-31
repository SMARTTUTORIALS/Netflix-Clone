import axios from '../utils/axios';
import React, { useState, useEffect } from 'react';
import './Banner.css';
import requests from '../utils/Requests';
import genres from '../utils/genres';

function Banner() {

    const [movie, setMovie] = useState([]);
    const [genreIds, setGenreIds] = useState([]);

    const baseBannerUrl = process.env.REACT_APP_BASE_URL_TMDB_IMG;

    const truncateDescription = (text, n) => {
        return text?.length > n ? text.substr(0, n - 1) + "..." : text;
    }

    useEffect(() => {
        async function fetchData() {
            const rand = Math.random();
            const selectFetch = Math.abs(Math.floor(rand * 15) ) > 5;
            const response = await axios.get( selectFetch ? requests.fetchTrending : requests.fetchNetflixOriginals);
            
            const index = Math.abs( Math.floor(rand * response.data.results.length - 1) )
            
            setMovie(
                response.data.results[index]    
            )

            setGenreIds([...response.data.results[index].genre_ids])
            
            return response;
        }

        fetchData();

    }, []);


    const playButtonHandler = () => {
        console.log("This feature is under construction..");
    }

    const myListButtonHandler = () => {
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
                    <button className='banner_button' onClick={playButtonHandler}>Play</button>
                    <button className='banner_button'>My List</button>
                </div>
                <h2 className='banner_description'>
                    {truncateDescription(movie?.overview, 200)}
                </h2>
                <h4 className='banner_genre'>Genres: {genreIds.reduce(
            (result, genreId) => result + genres[genreId] + " | "
            , " | ")}</h4>
            </div>
            <div className='banner--fadeBottom' />
        </header>
    )
}

export default Banner