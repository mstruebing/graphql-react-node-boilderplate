import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

const LOGOUT = gql`
  mutation logout($token: String!) {
    logout(token: $token)
  }
`;

class Logout extends React.PureComponent {
  render() {
    const handleSubmit = sendMutation => async (event) => {
      event.preventDefault();
      const data = await sendMutation();

      if (data) {
        localStorage.setItem('token', '');
        const { onLogout } = this.props;
        if (typeof onLogout === 'function') {
          onLogout();
        }
      }

      return false;
    };

    const { token } = this.props;

    return (
      <Mutation
        mutation={LOGOUT}
        variables={{ token }}
      >
        {sendMutation => (
          <form onSubmit={handleSubmit(sendMutation)}>
            <button type="submit">Logout</button>
          </form>
        )}
      </Mutation>
    );
  }
}
Logout.propTypes = {
  token: PropTypes.string.isRequired,
  onLogout: PropTypes.func,
};
Logout.defaultProps = {
  // Empty function
  onLogout: () => {},
};

export default Logout;
