const bcrypt = require('bcrypt')
const db = require('../dbqueries')
const jwt = require('jsonwebtoken')

const JWT_SECRET = require('../utils')


const userResolver = {
    Query:{
        me:(root,args,context)=>{
            return context.currentUser
        }
    },
    Mutation:{
        createUser : async (root,args)=>{
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(args.password,saltRounds)
            const newUser = await db.saveUser(args.username,passwordHash)
            return newUser
        },
        login: async (root,args)=>{
            const user = await db.getUser(args.username).catch((error)=>{
                throw new Error("Can't get user")
            })

            const passwordMatch = user === undefined ? false : await bcrypt.compare(args.password,user.password)

            if(!(user && passwordMatch)){
                throw new Error("Wrong user credentials")
            }

            const userToken = {
                username: user.username,
                id: user.id
            }

            return {value:jwt.sign(userToken,JWT_SECRET)}
        },
        updateFavouriteMovies: async (root,args,context) =>{
            const movieId = args.tmdbId
            const currentUser = context.currentUser

            if(!currentUser){
                throw new Error("Please log in before your add to favourite")
            }

            let updatedUser = null
            if(currentUser.favouritemovies !== null && currentUser.favouritemovies.includes(movieId)){
                console.log('remove')
                updatedUser = await db.updateMoviesListForUser(args.username,movieId,'remove')
            }else{
                console.log('append')
                updatedUser = await db.updateMoviesListForUser(args.username,movieId,'append')

            }
            context.currentUser = updatedUser
            return updatedUser
        }
        
    },
    User:{
        favouriteMovies : (root)=> root.favouritemovies
    }
}

module.exports = userResolver