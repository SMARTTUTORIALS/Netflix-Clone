
//Typically this key would be stored in {process.env.API_KEY}
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;


const requests = {
    fetchTrending: `/trending/all/day?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchMovieGenres: `/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    fetchTvGenres: `/genre/tv/list?api_key=${API_KEY}&language=en-US`,
};

export default requests;