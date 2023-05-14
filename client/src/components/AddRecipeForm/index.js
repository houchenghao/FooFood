import React, { useState, useEffect} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import axios from 'axios';


// import { Upload, Button, Input, Form, Card } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

import { Upload, Button, Input, Form, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import Auth from '../../utils/auth';
import { ADD_RECIPE } from '../../utils/mutations';

const { TextArea } = Input;

const AddrecipeForm = () => {
    const[recipeName, setRecipeName] = useState('');
    const[recipeDescription, setRecipeDescription] = useState('');
    // const[imageLink, setImageLink] = useState('');
    const[image, setImage] = useState('');



    // const[loading, setLoading] = useState(false)
    const[fileInputKey, setFileInputKey] = useState(Date.now())

    const [recipeloading, setRecipeLoading] = useState(false);

    // const [url, setUrl] = useState("");

    // const Host = 'https://sleepy-beach-76530.herokuapp.com'
    const Host = 'http://localhost:3000/'

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

    //   const uploadImage = async (event) => {
    //     const files = event.target.files;
    //     console.log(files.length);
    
    //     if (files.length === 1) {
    //       const base64 = await convertBase64(files[0]);
    //     //   console.log(base64)
    //       uploadSingleImage(base64);
    //       return;
    //     }
    
    //     const base64s = [];
    //     for (var i = 0; i < files.length; i++) {
    //       var base = await convertBase64(files[i]);
    //       base64s.push(base);
    //     }
    //     // uploadMultipleImages(base64s);
    // };

    // useEffect(() => {
    //     console.log(recipeloading);

    //     // const { data } = addRecipe({
    //     //     variables: {
    //     //         recipeName,
    //     //         recipeDescription,
    //     //         imageLink,
    //     //     },
    //     // });

        
    //   }, [recipeloading]);


    function uploadSingleImage(image) {

        setRecipeLoading(true);

        axios
            .post(`/uploadImage`, { image: image })
            .then((res) => {

                const imageLink = res.data;

                console.log(recipeName);
                console.log(recipeDescription)
                console.log(imageLink);

                
                const { data } = addRecipe({
                    variables: {
                        recipeName,
                        recipeDescription,
                        imageLink,
                    },
                });
                setRecipeLoading(false)

                alert("Image uploaded Succesfully");
            })
            .catch(console.log);
    }


    // function uploadMultipleImages(images) {
    // setLoading(true);
    // axios
    //     .post(`${Host}/uploadImage`, { images })
    //     .then((res) => {
    //     setUrl(res.data);
    //     alert("Image uploaded Succesfully");
    //     })
    //     .then(() => setLoading(false))
    //     .catch(console.log);
    // }

    const [addRecipe, { loading:addRecipeLoading }] = useMutation(ADD_RECIPE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            // console.log(image)
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
        // else if (name === 'imageLink') {
        //     setImageLink(value);
        // }
        else if (name === 'image') {
            // setImage(event.target.files[0]);
            const file = event.target.files[0];
            const base64 = await convertBase64(file);
            setImage(base64);
        //     const reader = new FileReader();
        //     reader.readAsDataURL(file);
        //     reader.onloadend = () => {
        //         setImage(reader.result);
        //     }
        //     console.log (reader.result);
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
                        className = "form-input w-100"
                        // style={{ lineHeight: '1.5', resize: 'vertical' }}
                        style={{ height: '300px', lineHeight: '1.5', resize: 'vertical' }}
                        onChange={handleChange}
                    ></textarea>

                    {/* <input
                        name = "imageLink"
                        placeholder="Add your recipe image link"
                        value={imageLink}
                        className="form-input w-100"
                        style={{ lineHeight: '1.5', resize: 'vertical' }}
                        // onChange={handleChange}
                    ></input> */}

                    <label> Upload Image</label>
                    <input
                        type = "file"   
                        name = "image"
                        key = {fileInputKey}
                        className="hidden"
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
        </div>
    )
}

export default AddrecipeForm;





