const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        recipes: [Recipe]
    }

    type Recipe {
        _id: ID
        recipeName: String
        description: String
        createdAt: String
        updated_at: String
        recipeUser: User
    }

    type Comment {
        _id: ID
        commentText: String
        commentAuthor: User
        CreatedAt: String
        updated_at: String
    }

    type Auth {
        token: ID!
        user:User
    }

    type Query{
        user:[User]
        allrecipes:[Recipe]
        recipes (username: String): [Recipe]
        recipe (recipesId: ID!): Recipe
        comments (recipeId: ID!): [Comment]
    }

    type Mutation{
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addRecipe(recipeName: String!, recipeDescription: String!): Recipe
        addComment(recipeId: ID!, commentText: String!,): Comment
        removeRecipe(recipeId: ID!): Recipe
        removeComment(commentId: ID!): Comment
    }

`

module.exports = typeDefs;