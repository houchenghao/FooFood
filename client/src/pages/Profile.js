import React from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import RecipesList from '../components/RecipesList'
import AddRecipeForm from '../components/AddRecipeForm'

import { QUERY_USER_RECIPES, QUERY_ME_RECIPES } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = ({addRecipeList}) => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER_RECIPES : QUERY_ME_RECIPES, {
    variables: { username: userParam },
  });

  const recipes = data?.meRecipes || data?.userRecipes || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this.
      </h4>
    );
  }

  console.log(recipes)
  if (recipes.length ===0) {
    return(
        <div>
          <h1> Add You Recipes</h1>
          <div>
            <AddRecipeForm/>
          </div>
        </div>

    )
  }

  return (
    <div>
        <div>
            <RecipesList recipes = {recipes}/>
        </div>

        {(addRecipeList) ? (
          <div>
              <AddRecipeForm/>
          </div>
        ) :(
          <div></div>
        )}
    </div>
  );
};

export default Profile;
