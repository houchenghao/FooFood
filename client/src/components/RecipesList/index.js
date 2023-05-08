import React from 'react';
import { Link } from 'react-router-dom';

const RecipeList = ({recipes}) => {
    return(
        recipes.map((recipe) => {
            return (
                <Link to={`/recipe/${recipe._id}`} key = {recipe._id}>
                    <div  className='home-page-recipe'>
                        <img className='home-page-recipe-image' src = {recipe.imageLink} alt = {recipe.recipeName}/>
                        <h2 className='home-page-recipe-name'> {recipe.recipeName} </h2>
                    </div>
                </Link>
            )
        }
        )
    )
};
export default RecipeList;