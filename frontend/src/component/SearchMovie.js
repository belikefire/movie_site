import React,{useState} from 'react'
import SearchMovieResult from './SearchMovieResult'

const SearchMovie = ()=>{
    const [keyword,setKeyword] = useState("")


  const inputChange = (event)=>{
    if(event.key === 'Enter'){
      setKeyword(event.target.value)
    }
  }

  return <div>
    <input type="text" 
          placeholder="keyword" 
          className="keyword-input"
          onKeyDown = {inputChange}
          ></input>
          <SearchMovieResult keyword={keyword}/>
  </div>
}

export default SearchMovie