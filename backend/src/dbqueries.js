const Pool = require('pg').Pool

const pool = new Pool({
    user: 'admin',
    host:'localhost',
    database:'movie_site',
    password:'',
    port:5432
})


const getUser = (username) => {
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM users WHERE username = $1',[username],(error,results)=>{
            if(error){
                reject(error)
            }
            
            resolve(results.rows[0])
            
        })
    })
}

const saveUser = (username, password) => {
    return new Promise((resolve,reject)=>{
        pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password], (error, results) => {
            if (error) {
              reject(error)
            }
            resolve(results.rows[0])
          })
    })
   
}

const updateMoviesListForUser = (username,tmdbId,mode) => {
    if(mode === 'append'){
        return new Promise((resolve,reject)=>{
            pool.query('UPDATE users SET favouritemovies = array_append(favouriteMovies,$1) where username = $2 RETURNING *',[tmdbId,username],(error,results)=>{
                if(error){
                    reject(error)
                }
                resolve(results.rows[0])
            })
        })
    }else if(mode === 'remove'){
        return new Promise((resolve,reject)=>{
            pool.query('UPDATE users SET favouritemovies = array_remove(favouriteMovies,$1) where username = $2 RETURNING *',[tmdbId,username],(error,results)=>{
                if(error){
                    reject(error)
                }
                resolve(results.rows[0])
            })
        })
    }
 
  }

module.exports = {
      saveUser,
      getUser,
      updateMoviesListForUser
}