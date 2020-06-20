const API = require('../API')
const movieGenresMap = require('../../genres')

const movieResolver = {
    Query:{
        getMovie: async (root,args)=>{
            const response = await API.axios.get(API.generateUrlForMovie(args.id))
            return response.data
        },
        searchMovies: async (root,args)=>{
            const response = await API.axios.get(API.generateUrlForSearches(args.keyword))
            const responseWithPoster = response.data.results.filter(result=>result.poster_path !== null)
            return responseWithPoster
        },
        getTrendingMovies : async (root,args)=>{
            const response = await API.axios.get(API.generateUrlForTrendingMovies())
            return response.data.results
        }
    },
    Movie:{
        tmdbID:(root)=> root.id,
        title:(root)=> root.original_title,
        imageUrl:(root)=> `https://image.tmdb.org/t/p/w300${root.poster_path}`,
        description:(root)=> root.overview,
        releaseDate : (root)=>root.release_date,
        budget: (root)=>root.budget,
        genres: (root) => {
            let arr = []
            if (root.genre_ids){
                arr = root.genre_ids.map(id=>movieGenresMap.get(id))
            }else if (root.genres){
                arr = root.genres.map(root=>movieGenresMap.get(root.id))
            }
            return arr
        }
    }  
}

module.exports = movieResolver