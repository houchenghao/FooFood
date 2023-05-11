// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Header from './components/Header';
import Recipe from './pages/Recipe';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header/>
          <div>
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


        </div>

      </Router>

    </ApolloProvider>
  );
}

export default App;





