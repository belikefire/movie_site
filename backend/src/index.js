
const {ApolloServer,gql} = require('apollo-server') 
const movieType = require('./typeDefs/types/movieType')
const movieResolver = require('./resolvers/movieResolver')

const baseTypeDefs = gql`
  type Query
`

const server = new ApolloServer({
    typeDefs:[baseTypeDefs,movieType],
    resolvers:movieResolver
})

server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`)
})
