import axios from '../utils/axios';
import React, { useEffect, useState } from 'react';
import './Row.css';

function Row({ title, fetchUrl, isLargeRow = false }) {

    const [movies, setMovies] = useState([]);

    const baseUrl = process.env.REACT_APP_BASE_URL_TMDB_IMG;

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(fetchUrl);
            setMovies(response.data.results);
            return response;
        }

        fetchData();

    }, [fetchUrl]);

    return (
        <div className='row'>
            <h2 className='row_title'>{title}</h2>

            <div className='row_posters'>

                {movies.map(movie => {
                    return (
                        ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                            <div className='poster_card' key={movie.id}>
                                <div className={`poster_overlay ${isLargeRow && "poster_overlay-large"}`}>
                                    <img
                                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                                        src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                        alt={movie.name} />
                                    
                                </div>
                                {/*The below movie title will only appear if the row is not a large poster row*/}
                                {(!isLargeRow && <h5 className='row_posterTitle'>{movie.title || movie.name || movie.original_name}</h5>)}


                            </div>
                        )

                    )
                })}
            </div>
        </div>
    )
}

export default Row;