import {IUser} from "./interfaces";

const user = (parent, args, context, info) => {
    return context.db.query.user({where: {id: parent.user.id}}, info);
};

export default {
    user,
};
