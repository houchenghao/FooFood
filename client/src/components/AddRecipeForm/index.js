import React, { useState, useEffect} from 'react';
import { Link, Navigate, useNavigate  } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import axios from 'axios';
import Auth from '../../utils/auth';
import { ADD_RECIPE } from '../../utils/mutations';


const AddrecipeForm = () => {
    const[recipeName, setRecipeName] = useState('');
    const[recipeDescription, setRecipeDescription] = useState('');
    const[image, setImage] = useState('');
    const[fileInputKey, setFileInputKey] = useState(Date.now())
    const [recipeloading, setRecipeLoading] = useState(false);
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

    function uploadSingleImage(image) {
        const username = Auth.getProfile().data.username;
        setRecipeLoading(true);
        axios
            .post(`/uploadImage`, { image: image })
            .then((res) => {
                const imageLink = res.data;

                const { data } = addRecipe({
                    variables: {
                        recipeName,
                        recipeDescription,
                        imageLink,
                    },
                });

                setRecipeLoading(false)
            })
            .then((res) => {
                // window.location.href = `/`;
                window.location.reload();
            })
            .catch(console.log);
    }

    const [addRecipe, { loading:addRecipeLoading }] = useMutation(ADD_RECIPE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            uploadSingleImage(image);
            setRecipeName('');
            setRecipeDescription('');
            setFileInputKey(Date.now());
            setImage(null);
            setRecipeLoading(false);
            
        } catch (err) {
        console.error(err);
        };
    };

    const handleChange = async (event) => {
        const { name, value } =  event.target;

        if (name === 'recipeName') {
            setRecipeName(value);
        }else if (name === 'recipeDescription') {
            setRecipeDescription(value);
        }
        else if (name === 'image') {
            // setImage(event.target.files[0]);
            const file = event.target.files[0];
            const base64 = await convertBase64(file);
            setImage(base64);

        }
    };

    if (!Auth.loggedIn()) {
        return (
          <h4>
            You need to be logged in to see this.
          </h4>
        );
    }

    return (
        <div className='add-recipe-form-container' >
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
                            className = "form-input w-100 add-recipe-form"
                            style={{ height: '300px', lineHeight: '1.5', resize: 'vertical' }}
                            onChange={handleChange}
                        ></textarea>
                        <label style = {{fontWeight:'bolder'}}> Upload Image</label>
                        <input
                            type = "file"   
                            name = "image"
                            key = {fileInputKey}
                            className="hidden"
                            onChange={handleChange}
                        ></input>
                    </div>

                    <div className="col-12 col-lg-3">
                        <button className="btn btn-primary btn-block py-3" type="submit" style={{padding:'2px', backgroundColor:'#332e53'}}>
                            Add TO MY LIST
                        </button>
                    </div>
            </form>
        </div>
    )
}

export default AddrecipeForm;





