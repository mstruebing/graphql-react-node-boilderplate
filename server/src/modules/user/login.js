import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

	const payload = {user: user.email};
	const options = {expiresIn: '2d', issuer: 'http://localhost:4000'};
	const secret = process.env.JWT_SECRET;
	const token = jwt.sign(payload, secret, options);

	return token;
};

export default login;
