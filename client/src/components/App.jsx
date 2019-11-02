import React from 'react';
import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

// own-imports
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import logo from '../logo.svg';
import getCurrentToken from '../utils';
import '../styles/App.css';

const INFO_QUERY = gql`
  {
    info
  }
`;

const VERIFY_TOKEN_QUERY = gql`
  query verifyToken($token: String!) {
    verifyToken(token: $token) {
      id
      email
      username
    }
  }
`;

const initialState = {
  loggedIn: false,
  token: '',
  user: {
    id: '',
    email: '',
    username: '',
  },
};

class App extends React.PureComponent {
  static propTypes = {
    client: PropTypes.shape({
      query: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = initialState;

    const token = getCurrentToken();

    this.isTokenValid(token).then((data) => {
      this.setState({
        loggedIn: true,
        token,
        user: {
          username: data.username,
          email: data.email,
          id: data.id,
        },
      });
    }).catch(e => {
      this.setState(initialState);
    });
  }

  handleLogin = (token, username, email, id) => {
    this.setState({
      loggedIn: true,
      token,
      user: {
        username,
        email,
        id,
      },
    });
  }

  handleLogout = () => {
    this.setState(initialState);
  }

  isTokenValid = async (token) => {
    const { client } = this.props;

    const response = await client.query({
      query: VERIFY_TOKEN_QUERY,
      variables: {
        token,
      },
    });

    return response.data.verifyToken;
  }

  render() {
    const { loggedIn, token, user: { username, email, id } } = this.state;

    const printUserData = () => (
      <>
        <p>
          user-id:
          {id}
        </p>
        <p>
          username:
          {username}
        </p>
        <p>
          email:
          {email}
        </p>
        <p>
          token:
          {token}
        </p>
      </>
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {!loggedIn && (
          <>
            <Register />
            <Login
              onLogin={this.handleLogin}
            />
          </>
        )}
        {loggedIn && (
          <>
            <Logout
              onLogout={this.handleLogout}
              token={token}
            />
            {printUserData()}
          </>
        )}
        <Query query={INFO_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>;
            if (error) return <div>Error</div>;

            return (<div>{data.info}</div>);
          }}
        </Query>
      </div>
    );
  }
}

export default withApollo(App);
