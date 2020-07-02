import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from 'react-router-dom'
import './styles.css'
import SearchField from './component/SearchField';
import MovieList from './component/MovieList'
import MovieDetail from './component/MovieDetail'
import SearchMovieResult from './component/SearchMovieResult';
import LoginForm from './component/LoginForm'
import { useApolloClient,gql,useQuery, useLazyQuery} from '@apollo/client';
import Register from './component/Register';
import FavouriteMovie from './component/FavouriteMovie';

const GET_CURRENT_USER = gql`
query{
  me{
    username
    id
    favouriteMovies
  }
}
`

const App = (props)=>{
  const [,setToken] = useState(null)
  const [user,setUser] = useState(null)

  const result = useQuery(GET_CURRENT_USER,{onCompleted:()=>{
    setUser(result.data.me)
  }})
 

  const client = useApolloClient()


  const logout = ()=>{
    setToken(null)
    setUser(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <Router>
      <div className="top-nav-bar">
      <Link className="link" to="/favourites">Favourite</Link>
            {user === null ? <Link className="link" to = "/login">Login</Link> : <p className="link" style={{color:'blue'}}>{user.username}</p>}
            {user && <button className="logout-button" onClick={logout}>Logout</button>}
      </div>
      <div className="flex-container">
      <div>
          <div className="side-nav-menu">
          <Link className="link" to="/search">Search</Link>
          <Link className="link" to="/trending/page=1">Trending</Link>
          <Link className="link" to="/popular/page=1">Popular</Link>


        </div>
      </div>
     

      <Switch>
        <div className="displayComponent">
          <Route exact path="/search" >
            <SearchField/>
         </Route>
         <Route exact path="/popular/page=:pageNumber">
            <MovieList mode="popular"/>
         </Route>
         <Route exact path="/trending/page=:pageNumber">
            <MovieList mode="trending"/>
         </Route>
         <Route exact  path="/movie/:id"  >
           <MovieDetail user={user} />
         </Route>
         <Route exact path="/search/k=:keyword&page=:pageNumber">
           <SearchMovieResult/>
         </Route>
         <Route exact path="/login" render={()=>
            user ? <Redirect to="/"/> :<LoginForm setToken={setToken} setUser={setUser}/>
         }/>
          <Route exact path="/register" >
            <Register/>
         </Route>
         <Route exact path ="/favourites">
            <FavouriteMovie user={user}/>
         </Route>
        </div>
       
      </Switch>
      </div>
    </Router>
  )
}

export default App;
