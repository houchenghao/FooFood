import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import RecipesList from '../components/RecipesList'

import { QUERY_USER_RECIPES, QUERY_ME_RECIPES } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER_RECIPES : QUERY_ME_RECIPES, {
    variables: { username: userParam },
  });

  const recipes = data?.meRecipes || data?.userRecipes || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  
  console.log(recipes)
  console.log(recipes)

  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
        <RecipesList recipes = {recipes}/>
      hello
    </div>
  );
};

export default Profile;
