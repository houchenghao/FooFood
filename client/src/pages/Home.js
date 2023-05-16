import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { QUERY_RECIPES } from '../utils/queries';
import RecipeList from '../components/RecipesList';

const Home = () => {
    const { loading, data } = useQuery(QUERY_RECIPES);
    const recipes = data?.recipes || [];

    if (loading) {
        return <div> Loading...</div>
    }

    if (!recipes) {
        return(
            <p> Add you recipes</p>
        )
    }

    if (!Auth.loggedIn()) {
        return (
            <div className='viewport-background'>
                    <h4 className='viewport-background p-5'>
                         You need to be logged in to see this.
                    </h4>

            </div>

        );
    }

    return (
        <main >
            <div >
                <RecipeList recipes = {recipes}/>
            </div>
        </main>
    );
};

export default Home;