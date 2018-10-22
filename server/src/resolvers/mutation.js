import {register} from '../modules/user';

export default {
	info: () => `Mutation executed at: ${Date.now()}`,
	register: (_, {email, password}) => register(email, password)
};
