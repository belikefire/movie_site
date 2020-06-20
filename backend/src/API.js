const axios = require('axios');

const API_KEY = '550ea1ca3a15bdae8333716d5757c1f0'

const generateUrlForSearches = (keyword)=>{
    return `https://api.themoviedb.org/3/search/movie/?api_key=${API_KEY}&query=${keyword}`
}

const generateUrlForMovie = (id)=>{
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
}

const generateUrlForGenres = ()=>{
    return `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
}

const generateUrlForTrendingMovies = ()=>{
    return `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
} 

module.exports = {
    axios,
    API_KEY,
    generateUrlForMovie,
    generateUrlForSearches,
    generateUrlForGenres,
    generateUrlForTrendingMovies
}


