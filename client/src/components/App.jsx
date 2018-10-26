import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// own-imports
import Register from './Register';
import Login from './Login';
import logo from '../logo.svg';
import '../styles/App.css';

const INFO_QUERY = gql`
  {
    info
  }
`;

const VERIFY_TOKEN_QUERY = gql`
  query verifyToken($token: String!) {
    verifyToken(token: $token)
  }
`;

const validateToken = () => {
  const token = localStorage.getItem('token');

  return (
    <Query query={VERIFY_TOKEN_QUERY} variables={{ token }}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>ERROR: No Valid Token</div>;

        if (data.verifyToken) {
          return (<div>VALID TOKEN, DUDE!</div>);
        }

        return (<div>ERROR: NO VALID TOKEN, PUSSY</div>);
      }}
    </Query>
  );
};

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <Register />
    <Login />
    <Query query={INFO_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        return (<div>{data.info}</div>);
      }}
    </Query>
    {
      validateToken()
    }
  </div>
);

export default App;
