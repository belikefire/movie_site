import React,{useEffect,useState} from 'react'
import {gql,useLazyQuery} from '@apollo/client'
import Movie from './Movie'

const SEARCH_MOVIE = gql`
query findMovieByKeyword($keyword:String!){
  searchMovies(keyword:$keyword){
    title
    releaseDate
    imageUrl
  }
}
`

const SearchMovieResult = ({keyword})=>{
    const [getMovies,result] = useLazyQuery(SEARCH_MOVIE)

  useEffect(()=>{
    if(keyword !== ""){
      getMovies({variables:{keyword}})
    }
  },[keyword])

 

  if(result.loading){
    return  <div>Loading...</div>

  }else if(result.data){
    return <div>
       <div className="movie-container">
           {result.data.searchMovies.length === 0 ? 
           "No Search Result Found" : 
           result.data.searchMovies.map(movie=> <Movie movie={movie}/>)
           }
       </div>
     </div>
  }

  return <div></div>
  
  
  
}

export default SearchMovieResult;