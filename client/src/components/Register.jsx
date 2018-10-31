import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const REGISTER = gql`
  mutation register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      token
      user {
        id
      }
    }
  }
`;


export default class Register extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      password: '',
    };
  }

  setEmail = (event) => {
    this.setState({
      email: event.currentTarget.value,
    });
  }

  setUsername = (event) => {
    this.setState({
      username: event.currentTarget.value,
    });
  }

  setPassword = (event) => {
    this.setState({
      password: event.currentTarget.value,
    });
  }

  render() {
    const { email, password, username } = this.state;

    const handleSubmit = sendMutation => (event) => {
      event.preventDefault();
      sendMutation();
      return false;
    };

    return (
      <Mutation
        mutation={REGISTER}
        variables={{ email, username, password }}
      >
        {sendMutation => (
          <form onSubmit={handleSubmit(sendMutation)}>
            <input
              type="email"
              onInput={this.setEmail}
              placeholder="email"
              required
            />
            <input
              type="text"
              onInput={this.setUsername}
              placeholder="username"
              required
            />
            <input
              type="password"
              onInput={this.setPassword}
              placeholder="password"
              required
            />
            <button type="submit">Register</button>
          </form>
        )}
      </Mutation>
    );
  }
}
