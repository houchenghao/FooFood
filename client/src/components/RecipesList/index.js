import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
const { Meta } = Card;


const RecipeList = ({recipes}) => {
    return(
        <div className='home-page-recipe-container'>
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe._id}`} key={recipe._id} className='p-1 col-12 col-md-6 col-lg-4 mb-4'>
            <Card cover={<img alt="Example" src={recipe.imageLink} />}>
              <Meta title={recipe.recipeName} className='home-page-recipe-name' />
            </Card>
          </Link>
        ))}
      </div>
    )
};
export default RecipeList;


