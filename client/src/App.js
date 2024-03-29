import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Recipe from './pages/Recipe';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <div className='app-container'>
            <Header/>
            <div className='viewport-background'>
              <Routes>
                <Route
                  path="/"
                  element={<Home/>}
                ></Route>

                <Route
                  path="/signup"
                  element={<Signup/>}
                  ></Route>

                <Route
                  path="/recipe/:recipeId"
                  element={<Recipe/>}
                ></Route>

                <Route
                  path="/login"
                  element={<Login/>}
                ></Route>

                <Route
                  path="/me"
                  element={<Profile addRecipeList = {true}/>}
                ></Route>

                <Route
                  path="/profile/:username"
                  element={<Profile addRecipeList = {false}/>}
                ></Route>

              </Routes>
            </div>
            <Footer/>
          </div>

      </Router>
      
    </ApolloProvider>
  );
}
export default App;





