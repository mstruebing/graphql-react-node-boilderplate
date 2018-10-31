import {register, login, logout} from '../modules/user';

export default {
	info: () => `Mutation executed at: ${Date.now()}`,
	register: (parent, args, context, info) => register(parent, args, context, info),
	login: (parent, args, context, info) => login(parent, args, context, info),
	logout: (parent, args, context, info) => logout(parent, args, context, info)
};
