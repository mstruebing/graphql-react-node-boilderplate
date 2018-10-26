import jwt from 'jsonwebtoken';

import {userExists} from './utils';
import {secret, options} from './jwt-options';

const errorMsg = 'ERROR: User doesnt exists';

const verifyToken = token => {
	try {
		const {user} = jwt.verify(token, secret, options);

		if (!userExists(user)) {
			throw new Error(errorMsg);
		}
	} catch (_) {
		return false;
	}

	return true;
};

export default verifyToken;
