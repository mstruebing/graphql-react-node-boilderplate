import users from '../../mock-data';

const userExists = email => users.filter(user => user.email === email)[0];

const saveUser = (email, hash) => users.push({email, password: hash});

export {
	userExists,
	saveUser
};

