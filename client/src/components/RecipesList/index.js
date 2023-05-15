import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
const { Meta } = Card;


const RecipeList = ({recipes}) => {
  const currentURL = window.location.href;
  const parts = currentURL.split('/');
  const name = parts[parts.length - 1];
    return(
      <div className='p-3' style={{fontFamily:'cursive'}}>
          <h1>Welcome to {name}'s recipes</h1>
          
          <div className='recipe-container'>
            {recipes.map((recipe) => (
              <Link to={`/recipe/${recipe._id}`} key={recipe._id} className='recipe-card p-2'>        
                <Card cover={<img alt="Example" src={recipe.imageLink} className='card-image'/>}>
                  <Meta title={recipe.recipeName} className='home-page-recipe-name' />
                </Card>
              </Link>
            ))}
        </div>
      </div>

    )
};
export default RecipeList;


