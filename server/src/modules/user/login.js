import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {userExists} from './utils';
import {secret, options} from './jwt-options';

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

	const payload = {user: user.email};
	const token = jwt.sign(payload, secret, options);

	return token;
};

export default login;
