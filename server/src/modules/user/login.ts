import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import {options, secret} from "./jwt-options";

const login = async (parent, args, context, _) => {
    const user = await context.db.query.user({where: {email: args.email}}, " { id password username email } ");

    if (!user) {
        throw new Error("No such user found");
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new Error("Invalid password");
    }

    const token = jwt.sign({id: user.id}, secret, options);

    await context.db.mutation.updateUser({
        data: {activeToken: token},
        where: {email: user.email},
    }, "{ activeToken }");

    return {
        token,
        user,
    };
};

export default login;
