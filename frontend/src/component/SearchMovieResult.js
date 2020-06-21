import React,{useEffect} from 'react'
import {gql,useLazyQuery} from '@apollo/client'
import Movie from './Movie'
import {useParams} from 'react-router-dom'
import SearchField from './SearchField'

const SEARCH_MOVIE = gql`
query findMovieByKeyword($keyword:String!){
  searchMovies(keyword:$keyword){
    tmdbID
    title
    releaseDate
    imageUrl
  }
}
`

const SearchMovieResult = ()=>{
    const keyword = useParams().keyword
    const [getMovies,result] = useLazyQuery(SEARCH_MOVIE)

  useEffect(()=>{
      getMovies({variables:{keyword}})
  },[keyword,getMovies])


  if(result.loading){
    return  <div>Loading...</div>
  }else if(result.data){
    return <div>
      <SearchField/>
       <div className="movie-container">
           {result.data.searchMovies.length === 0 ? 
           "No Search Result Found" : 
           result.data.searchMovies.map(movie=> <Movie key={movie.imageUrl} movie={movie}/>)
           }
       </div>
     </div>
  }
  
  return <div></div>
  
}

export default SearchMovieResult;