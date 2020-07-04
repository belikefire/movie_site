
const {ApolloServer,gql} = require('apollo-server') 
const movieType = require('./typeDefs/types/movieType')
const movieResolver = require('./resolvers/movieResolver')
const userType = require('./typeDefs/types/userType')
const _ = require('lodash');
const userResolver = require('./resolvers/userResolver')
const JWT_SECRET = require('./utils')
const jwt = require('jsonwebtoken')

const db = require('../src/dbqueries')

const baseTypeDefs = gql`
  type Query
`

const server = new ApolloServer({
    typeDefs:[baseTypeDefs,movieType,userType],
    resolvers: _.merge(movieResolver,userResolver),
    context: async ({req})=>{
        const auth = req ? req.headers.authorization : null
        if(auth && auth.toLowerCase().startsWith('bearer ')){
            const decodedToken = jwt.verify(
                auth.substring(7),JWT_SECRET
            )

            const currentUser = await db.getUser(decodedToken.username)
           
            return { currentUser }
        }
    }
})

server.listen({ port: process.env.PORT || 4000} ).then(({url})=>{
    console.log(`Server ready at ${url}`)
})
