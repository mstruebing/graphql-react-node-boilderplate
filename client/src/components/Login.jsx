import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';

const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

class Login extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  setEmail(event) {
    this.setState({
      email: event.currentTarget.value,
    });
  }

  setPassword(event) {
    this.setState({
      password: event.currentTarget.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const { client } = this.props;

    client.query({
      query: LOGIN,
      variables: {
        email,
        password,
      },
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="email" onInput={this.setEmail.bind(this)} required />
        <input type="password" onInput={this.setPassword.bind(this)} required />
        <button type="submit">Login</button>
      </form>
    );
  }
}
Login.propTypes = {
  client: PropTypes.shape({
    query: PropTypes.func.isRequired,
  }).isRequired,
};

export default withApollo(Login);
