const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
        _id: ID
        username: String
        email: String
    }

    type Recipe {
        _id: ID
        recipeName: String
        recipeDescription: String
        created_at: String
        updated_at: String
        userId: User
        imageLink: String
    }

    type Comment {
        _id: ID
        commentText: String
        created_at: String
        updated_at: String
        userId: User
        recipeId: Recipe
    }

    type Auth {
        token: ID!
        user:User
    }

    type Query{
        meRecipes:[Recipe]
        users:[User]
        recipes:[Recipe]
        recipe(recipeId:ID!):Recipe
        comments:[Comment]
        recipeComment(recipeId:ID!): [Comment]
        userRecipes(username:String!):[Recipe]
    }

    type Mutation{
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addComment(recipeId: ID!, commentText: String!): Comment
        addRecipe(recipeName: String!, recipeDescription: String! imageLink: String!): Recipe
        updateRecipeDescription(recipeId: ID!, recipeDescription: String!): Recipe

        removeRecipe(recipeId: ID!): Recipe
    }

`

module.exports = typeDefs;