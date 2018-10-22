import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const REGISTER = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;


export default class Register extends React.PureComponent {
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

  render() {
    const { email, password } = this.state;

    const handleSubmit = sendMutation => (event) => {
      event.preventDefault();
      sendMutation();
      return false;
    };

    return (
      <Mutation
        mutation={REGISTER}
        variables={{ email, password }}
      >
        {sendMutation => (
          <form onSubmit={handleSubmit(sendMutation)}>
            <input type="email" onInput={this.setEmail.bind(this)} required />
            <input type="password" onInput={this.setPassword.bind(this)} required />
            <button type="submit">Register</button>
          </form>
        )}
      </Mutation>
    );
  }
}
