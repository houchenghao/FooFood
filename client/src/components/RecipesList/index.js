import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
const { Meta } = Card;


const RecipeList = ({recipes}) => {
    return(
        <div className='home-page-recipe-container'>
            {   
                  recipes.map((recipe) => {
                    return (
                        // <Link to={`/recipe/${recipe._id}`} key = {recipe._id} className='p-3 '>
                        //     <div  >
                        //         <img className='home-page-recipe-image' src = {recipe.imageLink} alt = {recipe.recipeName}/>
                        //         {/* <img className='home-page-recipe-image' src = {`/uploads/${recipe._id}.png`} alt = {recipe.recipeName}/> */}
                        //         <h2 className='home-page-recipe-name'> {recipe.recipeName} </h2>
                        //     </div>
                        // </Link>

                        <Link to={`/recipe/${recipe._id}`} key = {recipe._id} className='p-3 col-12 col-md-6 col-lg-4 mb-4'>
                            <Card cover={ <img alt="Example" src = {recipe.imageLink}/> } >
                                <Meta title={recipe.recipeName} className='home-page-recipe-name' />
                            </Card>
                        </Link>
                    )
                    }
                )
            }
        </div>
    )
};
export default RecipeList;


