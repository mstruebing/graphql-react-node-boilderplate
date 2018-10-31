import {verifyToken} from '../modules/user';

export default {
	info: () => `Query executed at: ${Date.now()}`,
	verifyToken: (parent, args, context, info) => verifyToken(parent, args, context, info)
};
