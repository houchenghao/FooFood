import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

// import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';


import { QUERY_RECIPES } from '../utils/queries';
import RecipeList from '../components/RecipesList';


const Home = () => {
    const { loading, data } = useQuery(QUERY_RECIPES);
    const recipes = data?.recipes || [];

    if (loading) {
        return <div> Loading...</div>
    }

    return (
        <main>
            <div>
                popular food see recipe
                
            </div>
            <div className='home-page-recipe-card'>

                <RecipeList recipes = {recipes}/>

            </div>
        </main>
    );
};

export default Home;