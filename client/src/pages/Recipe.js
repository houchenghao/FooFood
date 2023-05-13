import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_RECIPES, QUERY_SINGLE_RECIPE, QUERY_RECIPE_COMMENTS } from '../utils/queries';
import Auth from '../utils/auth';


import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList'

const Recipe = () => {
    const { recipeId: userParam } = useParams();

    const { loading:recipeLoading, data:recipeData } = useQuery(userParam ? QUERY_SINGLE_RECIPE : QUERY_RECIPES, {
        variables: {recipeId: userParam}
    });  
    const recipe = recipeData?.recipe || {};

    const { loading:commentLoading, data:commentData } = useQuery(QUERY_RECIPE_COMMENTS,{
        variables: {recipeId:userParam}
    });

    const comments = commentData?.recipeComment || {};

    


    if(recipeLoading||commentLoading) {
        return <div>Loading...</div>
    }

    // console.log(recipe.userId.username)

    return(
        <div>
            <div>
                <div key = {recipe._id} className='profile-card'>
                    <div className='profile-image-container'>
                        <img className='p-3 col-12 col-md-6 col-lg-4 mb-4' src = {recipe.imageLink} alt = {recipe.recipeName}/>

                    </div>

                    <div>
                        <h2 className='home-page-recipe-name '> Name: {recipe.recipeName} </h2>
                        <p className='profile-text'>{recipe.recipeDescription}</p>
                    </div>
                </div>   


                <div>
                    <Link to = {`/profile/${recipe.userId.username}`} className='p-5 text-decoration-none'>
                        <h2 className='others-profile-text' > See {recipe.userId.username}'s recipes</h2>
                    </Link>
                </div>
            </div>

            <div>
                <CommentList comments = {comments}/>
                
            </div>

            
                
            <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
                <CommentForm recipeId={recipe._id} />
            </div>

            
        </div>
    )

    
};

export default Recipe;