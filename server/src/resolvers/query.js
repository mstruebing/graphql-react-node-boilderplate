import {login} from '../modules/user';

export default {
	info: () => `Query executed at: ${Date.now()}`,
	login: (_, {email, password}) => login(email, password)
};
