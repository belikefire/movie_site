import React from 'react'

const Movie = ({movie})=>{
    return (<div className="movie">
        <img src={movie.imageUrl} alt={`thumbnail-${movie.title}`}/>
        <h3>{movie.title}</h3> {movie.releaseDate}
    </div>)
}

export default Movie