/* eslint-disable react/jsx-filename-extension */
/* This is needed because I use jsx in a non-jsx file */
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// own-imports
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';
import App from './components/App';

// code
const httpLink = createHttpLink({
  uri: `http://localhost:${process.env.PORT || 4000}/graphql`,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
