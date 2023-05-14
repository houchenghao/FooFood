import React, {useState, useEffect} from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';

import { QUERY_RECIPES, QUERY_SINGLE_RECIPE, QUERY_RECIPE_COMMENTS, QUERY_CHECKOUT  } from '../utils/queries';
import {UPDATE_RECIPE_DESCREPTION, DELETE_RECIPE} from '../utils/mutations'

import Auth from '../utils/auth';

import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList'

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');




const Recipe = () => {
    const [getCheckout , {data:checkoutData}] = useLazyQuery(QUERY_CHECKOUT)

    useEffect(() => {
        if (checkoutData) {
        stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: checkoutData.checkout.session });
        });
        }
    }, [checkoutData]);

    function submitCheckout() {
        // const productIds = [];
    
        // state.cart.forEach((item) => {
        //   for (let i = 0; i < item.purchaseQuantity; i++) {
        //     productIds.push(item._id);
        //   }
        // });
    
        getCheckout({
          variables: { products: recipe._id },
        });
      }


    const[recipeDescription, setRecipeDescription] = useState('');
    const { recipeId: userParam } = useParams(''); 
    const { loading:recipeLoading, data:recipeData } = useQuery(userParam ? QUERY_SINGLE_RECIPE : QUERY_RECIPES, {
        variables: {recipeId: userParam}
    });  
    // const recipe = recipeData?.recipe || {};

    const { loading:commentLoading, data:commentData } = useQuery(QUERY_RECIPE_COMMENTS,{
        variables: {recipeId:userParam}
    });

    const [updateRecipeDescription, { error: updateRecipeDescriptionError}] = useMutation(UPDATE_RECIPE_DESCREPTION);
    const [deleteRecipe, {error: deleteRecipeError} ] = useMutation(DELETE_RECIPE);

    // const comments = commentData?.recipeComment || {};

    if(recipeLoading||commentLoading) {
        return <div>Loading...</div>
    }

    const recipe = recipeData?.recipe || {};
    const comments = commentData?.recipeComment || {};

    const handleChange = (event) => {
        // const { name, value } = event.target;
        setRecipeDescription(event.target.value)
        console.log(recipeDescription)
      };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try{
            const { data } = await updateRecipeDescription({
                variables:{recipeId: recipe._id, recipeDescription}
            })
            
        } catch(err) {
            console.error(err);
        }
    }

    const deleteRecipeHandle = async (event) => {
        event.preventDefault();
        console.log("delete");
        try{
            const { data } = await deleteRecipe({
                variables: { recipeId: recipe._id}
            })
            console.log(data);
            window.location.replace('/me');

        } catch(err) {
            console.error(err);
        }
    }

    return(
        <div>
            <div>
                <div>
                    {Auth.loggedIn() ? (
                    <button onClick={submitCheckout}>Checkout</button>
                    ) : (
                    <span>(log in to check out)</span>
                    )}
                </div>



                <div key = {recipe._id} className='profile-card'>

                    <div className='profile-image-container'>
                        <img className='p-3 col-12 col-md-6 col-lg-4 mb-4' src = {recipe.imageLink} alt = {recipe.recipeName}/>
                    </div>
                    
                    <form onSubmit={handleFormSubmit}>
                        <h2 className='home-page-recipe-name '> Name: {recipe.recipeName} </h2>
                        
                        <textarea 
                            name = 'recipeDescription'
                            className='profile-text'
                            defaultValue={recipe.recipeDescription}
                            onChange={handleChange}
                        ></textarea>

                        <div>
                            <button
                                className="btn btn-primary btn-block py-1"
                                type="submit"
                                style={{backgroundColor: '#948080',border:'none'}}>
                                Update
                            </button>
                        </div>
                    </form>

                    <button 
                        className="btn btn-primary btn-block py-1"
                        onClick={deleteRecipeHandle}
                        type="button"
                        style={{backgroundColor: '#e45454',border:'none', height:'30px'}}>
                        Delete
                    </button>
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