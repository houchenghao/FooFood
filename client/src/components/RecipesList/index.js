import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
const { Meta } = Card;


const RecipeList = ({recipes}) => {
    return(
        <div className='recipe-container'>
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe._id}`} key={recipe._id} className='recipe-card p-2'>        
            <Card cover={<img alt="Example" src={recipe.imageLink} className='card-image'/>}>
              <Meta title={recipe.recipeName} className='home-page-recipe-name' />
            </Card>
          </Link>
        ))}
      </div>
    )
};
export default RecipeList;


