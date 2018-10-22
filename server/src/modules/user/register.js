import bcrypt from 'bcrypt';
import {saveUser, userExists} from './utils';

const register = (email, password) => {
	if (userExists(email)) {
		throw new Error(`ERROR: User with email ${email} already exists`);
	}

	const saltRounds = 10;
	const hash = bcrypt.hashSync(password, saltRounds);
	saveUser(email, hash);
	return true;
};

export default register;
