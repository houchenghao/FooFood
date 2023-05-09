import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';



import Auth from '../../utils/auth';

import { ADD_RECIPE } from '../../utils/mutations';

const AddrecipeForm = () => {
    const[recipeName, setRecipeName] = useState('');
    const[recipeDescription, setRecipeDescription] = useState('');
    const[imageLink, setImageLink] = useState('');


    const [addRecipe, { error }] = useMutation(ADD_RECIPE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        console.log(recipeName);
        console.log(recipeDescription);
        console.log(imageLink);

        try {
        const { data } = await addRecipe({
            variables: {
                recipeName,
                recipeDescription,
                imageLink
            },
            });
            setRecipeName('');
            setRecipeDescription('');
            setImageLink('');
        } catch (err) {
        console.error(err);
        };
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'recipeName') {
            setRecipeName(value);
        }else if (name === 'recipeDescription') {
            setRecipeDescription(value);
        }else if (name === 'imageLink') {
            setImageLink(value);
        }

    };

    return (
        <form className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}>

            <div className="col-12 col-lg-9">
                <input
                    name = "recipeName"
                    placeholder="Add your recipe name"
                    value={recipeName}
                    className="form-input w-100"
                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                    onChange={handleChange}
                ></input>

                <textarea
                    name = "recipeDescription"
                    placeholder = "Add you Description"
                    value = {recipeDescription}
                    className = "form-input w-100"
                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                    onChange={handleChange}
                ></textarea>

                <input
                    name = "imageLink"
                    placeholder="Add your recipe image link"
                    value={imageLink}
                    className="form-input w-100"
                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                    onChange={handleChange}
                ></input>

            </div>

            <div className="col-12 col-lg-3">
                <button className="btn btn-primary btn-block py-3" type="submit">
                    Add TO MY RECIPE LIST
                </button>
            </div>
        </form>

    )

    
}

export default AddrecipeForm;

