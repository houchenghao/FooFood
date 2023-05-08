import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query Users {
      users {
      _id
      username
      email
      }
    }
`

export const QUERY_RECIPES = gql`
    query Recipes {
      recipes {
      _id
      recipeName
      recipeDescription
      created_at
      updated_at
      userId {
          _id
          username
          email
      }
      imageLink
      }
    }
`

export const QUERY_SINGLE_RECIPE = gql `
  query Recipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
    _id
    recipeName
    recipeDescription
    created_at
    updated_at
    userId {
        _id
        username
        email
    }
    imageLink
    }
  }    
`
export const QUERY_RECIPE_COMMENTS = gql `
query Recipe($recipeId: ID!) {
    recipeComment(recipeId: $recipeId) {
      commentText
      _id
    }
  }
`
export const QUERY_ME_RECIPES = gql `
  query MeRecipes {
    meRecipes {
      _id
      recipeName
      recipeDescription
      created_at
      updated_at
      userId {
        _id
        username
        email
      }
      imageLink
    }
  }
`

export const QUERY_USER_RECIPES = gql `
query UserRecipes($username: String!) {
  userRecipes(username: $username) {
    _id
    recipeName
    recipeDescription
    created_at
    updated_at
    imageLink
  }
}
`
