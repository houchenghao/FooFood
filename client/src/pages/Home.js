import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

// import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';


import { QUERY_RECIPES } from '../utils/queries';


const Home = () => {
    const { loading, data } = useQuery(QUERY_RECIPES);
    const recipes = data?.recipes || [];
    return (
        <main>
            <div>
                popular food see recipe
                
            </div>
            <div className='home-page-recipe-card'>
                {loading ? (
                    <div> Loading...</div>
                ) : (
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
                )}
            </div>
        </main>
    );
};

export default Home;