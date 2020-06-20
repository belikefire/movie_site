import React,{useState, useEffect} from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import './styles.css'
import SearchMovie from './component/SearchMovie';
import TrendingMovie from './component/TrendingMovie'

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
          <Route path="/search">
            <SearchMovie/>
         </Route>
         <Route path="/trending">
            <TrendingMovie/>
         </Route>
        </div>
       
      </Switch>
      </div>
    </Router>
  )
}

export default App;
