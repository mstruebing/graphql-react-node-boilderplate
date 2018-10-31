var jwt = require('jsonwebtoken');

import {secret, options} from './jwt-options';

const verifyToken = async (parent, args, context, _ = null) => {
	try {
		const {token} = args;
		const jwtUser = jwt.verify(token, secret, options);
		const dbUser = await context.db.query.user(
			{where: {id: jwtUser.id}},
			' { id activeToken username email } ');

		const {activeToken} = dbUser;

		if (token !== activeToken) {
			return null;
		}

		return {...dbUser};
	} catch (_) {
		return null;
	}
};

export default verifyToken;
