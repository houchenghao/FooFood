import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($recipeId: ID!, $commentText: String!) {
    addComment(recipeId: $recipeId, commentText: $commentText) {
      _id
      commentText
      created_at
      updated_at
    }
  }
`;

export const ADD_RECIPE = gql`
mutation AddRecipe($recipeName: String!, $recipeDescription: String!, $imageLink: String!) {
  addRecipe(recipeName: $recipeName, recipeDescription: $recipeDescription, imageLink: $imageLink) {
    _id
    recipeDescription
    recipeName
  }
}
`;
export const UPDATE_RECIPE_DESCREPTION = gql`
mutation UpdateRecipeDescription($recipeId: ID!, $recipeDescription: String!) {
  updateRecipeDescription(recipeId: $recipeId, recipeDescription: $recipeDescription) {
    recipeDescription
    _id
  }
}
`;

export const DELETE_RECIPE = gql`
mutation RemoveRecipe($recipeId: ID!) {
  removeRecipe(recipeId: $recipeId) {
    _id
  }
}
`;