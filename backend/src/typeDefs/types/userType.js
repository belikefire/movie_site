const {gql} = require('apollo-server')

const userType = gql `
    type User{
        id:ID!
        username:String!
        password:String!
        favouriteMovies : [Int!]
    }

    type Token {
        value:String!
    }

    extend type Query{
        me : User
    }

    type Mutation{
        createUser(username:String!,password:String!):User
        login(username:String!,password:String!):Token 
        updateFavouriteMovies(username:String!,tmdbId:Int!):User
    }
`

module.exports = userType