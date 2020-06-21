import React from 'react'
import {gql,useQuery} from '@apollo/client'
import Movie from './Movie'

const TRENDING_MOVIE = gql`
query {
    getTrendingMovies{
        tmdbID
        title
        releaseDate
        imageUrl
    }
}
`

const TrendingMovie = ()=>{
    const result = useQuery(TRENDING_MOVIE)

    if(result.loading){
        return <div>Loading...</div>
    }else if(result.error){
        return <div>Error occured!</div>
    }
    
    return <div>
                <h2 className="title-banner">Trending Today</h2>
                <div className="movie-container">
                    {result.data.getTrendingMovies.map(movie=> <Movie movie={movie}/>)}
                </div>
            </div>
    
}

export default TrendingMovie