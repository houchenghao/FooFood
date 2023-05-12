import React, { useState, useEffect} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import axios from 'axios';

import Auth from '../../utils/auth';

import { ADD_RECIPE } from '../../utils/mutations';

const AddrecipeForm = () => {

    // useEffect(() => {

    //     <Navigate to= '/me'/>
 
    // })

    const Host = 'https://sleepy-beach-76530.herokuapp.com'

    const[recipeName, setRecipeName] = useState('');
    const[recipeDescription, setRecipeDescription] = useState('');
    const[imageLink, setImageLink] = useState('');
    const[image, setImage] = useState('')
    const[fileInputKey, setFileInputKey] = useState(Date.now())

    

    const [addRecipe, { loading:addRecipeLoading }] = useMutation(ADD_RECIPE);


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
                    imageLink,
                },
            });

            if (!addRecipeLoading){
                
                const recipeData = data?.addRecipe
                const formData = new FormData()
                
                formData.append('recipeId', recipeData._id)
                if(image){
                    formData.append('image', image, `${recipeData._id}.png`)
                }
                

                axios.post(`${Host}/upload`,
                formData,
                {   
                    headers: {'Authorization': localStorage.getItem('token')}
                }
            )
            }
            setRecipeName('');
            setRecipeDescription('');
            setImageLink('');
            setImage(null);
            setFileInputKey(Date.now());

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
        }else if (name === 'image') {
            setImage(event.target.files[0]);
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


                <label> Upload Image</label>
                <input
                    type = "file"   
                    name = "image"
                    key = {fileInputKey}
                    
                    className="form-control"
                    // style={{ lineHeight: '1.5', resize: 'vertical' }}
                    // autoComplete="off"
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

