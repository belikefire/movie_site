import React from 'react'
import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import {useHistory} from 'react-router-dom'

const GET_MOVIE = gql`
query getMovie($id:Int!){
  getMovie(id:$id){
    tmdbID
    title
    releaseDate
    imageUrl
    genres
    description
  }
}
`

const MovieDetail = () => {

    const id = Number(useParams().id)
    const history = useHistory()

    const result = useQuery(GET_MOVIE, { variables: { id } })

    if (result.loading) return <div>Loading...</div>

    const movie = result.data.getMovie


    return <div>
        <button onClick={() => history.goBack()}>BACK</button>
        <div>
            <img src={movie.imageUrl} alt="pic" />
        </div>
        <div>
            <h1>{movie.title}</h1>
            <h5>{movie.genres.join(', ')}</h5>
            <h3>Overview</h3>
            <h4>{movie.description}</h4>
        </div>
    </div>

}

export default MovieDetail