import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Header from './components/Header';

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
          <div className = 'container'>
            <Routes>
              <Route
                path="/"
                element={<Home/>}
              />
              {/* <Route
                path="/login"
                element={<Login/>}
              />
              <Route
                path="/signup"
                element={<Signup/>}
              />
              <Route
                path="/me"
                element={<Profile/>}
              />
              <Route
                path="/profiles/:username"
                element={<Profile/>}
              />
              <Route
                path="/recipe/:username"
                element={<Profile/>}
              />         */}
            </Routes>
          </div>
          {/* <Footer/> */}
        </div>   
      </Router>
    </ApolloProvider>
  );
}

export default App;
