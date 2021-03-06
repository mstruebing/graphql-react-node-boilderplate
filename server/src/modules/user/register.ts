import {hash} from "bcrypt";
import * as jwt from "jsonwebtoken";

import {options, secret} from "./jwt-options";

const register = async (parent, args, context, _) => {
    const password = await hash(args.password, 10);
    const user = await context.db.mutation.createUser({
        data: {...args, password},
    }, "{ id username email }");

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

export default register;
