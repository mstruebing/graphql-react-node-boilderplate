import {login, logout, register} from "../modules/user";

export default {
    info: () => `Mutation executed at: ${Date.now()}`,
    login: (parent, args, context, info) => login(parent, args, context, info),
    logout: (parent, args, context, info) => logout(parent, args, context, info),
    register: (parent, args, context, info) => register(parent, args, context, info),
};
