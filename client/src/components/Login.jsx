import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id,
        email,
        username
      }
    }
  }
`;

export default class Login extends React.PureComponent {
  static propTypes = {
    onLogin: PropTypes.func,
  };

  static defaultProps = {
    onLogin: () => {},
  };

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  setEmail = (event) => {
    this.setState({
      email: event.currentTarget.value,
    });
  }

  setPassword = (event) => {
    this.setState({
      password: event.currentTarget.value,
    });
  }

  render() {
    const handleSubmit = sendMutation => async (event) => {
      event.preventDefault();

      const response = await sendMutation();
      const { onLogin } = this.props;

      const {
        token,
        user: { id, email, username },
      } = response.data.login;

      localStorage.setItem('token', token);
      onLogin(token, username, email, id);

      return false;
    };

    const { email, password } = this.state;

    return (
      <Mutation
        mutation={LOGIN}
        variables={{ email, password }}
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
              type="password"
              onInput={this.setPassword}
              placeholder="password"
              required
            />
            <button type="submit">Login</button>
          </form>
        )}
      </Mutation>
    );
  }
}
