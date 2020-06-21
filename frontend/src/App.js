import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import './styles.css'
import SearchField from './component/SearchField';
import TrendingMovie from './component/TrendingMovie'
import MovieDetail from './component/MovieDetail'
import SearchMovieResult from './component/SearchMovieResult';

const App = ()=>{
  
  return (
    <Router>
      <div className="top-nav-bar">
            <Link className="link" to = "/favourites">Favourite</Link>
            <Link className="link" to = "/login">Login</Link>
      </div>
      <div className="flex-container">
      <div>
          <div className="side-nav-menu">
          <Link className="link" to="/search">Search Movie</Link>
          <Link className="link" to="/trending">Trending Movie</Link>
        </div>
      </div>
     

      <Switch>
        <div className="displayComponent">
          <Route exact path="/search">
            <SearchField/>
         </Route>
         <Route path="/trending">
            <TrendingMovie/>
         </Route>
         <Route path="/movie/:id">
           <MovieDetail/>
         </Route>
         <Route path="/search/:keyword">
           <SearchMovieResult/>
         </Route>
        </div>
       
      </Switch>
      </div>
    </Router>
  )
}

export default App;
