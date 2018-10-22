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
  </div>
);

export default App;
