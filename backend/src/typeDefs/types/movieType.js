const {gql} = require('apollo-server')


const movieType = gql`
    type Movie {
        tmdbID:ID!
        title: String!
        description: String!
        imageUrl : String
        releaseDate : String
        budget: Int
        genres : [String!]
    }

    extend type Query{
        getMovie(id: Int!): Movie
        searchMovies(keyword: String!):[Movie!],
        getTrendingMovies:[Movie!]!
    }
`

module.exports = movieType