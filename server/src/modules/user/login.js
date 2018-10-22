import bcrypt from 'bcrypt';
import {userExists} from './utils';

const errorMsg = 'ERROR: Wrong email or user doesnt exist';

const login = (email, password) => {
	const user = userExists(email);

	if (!user) {
		throw new Error(errorMsg);
	}

	const isCorrectPassword = bcrypt.compareSync(password, user.password);

	if (!isCorrectPassword) {
		throw new Error(errorMsg); // To not let ppl know the user exists
	}

	return 'LOGGED IN';
};

export default login;
