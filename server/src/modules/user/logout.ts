// tslint:disable-next-line
const jwt = require("jsonwebtoken");

import {options, secret} from "./jwt-options";
import verifyToken from "./verify-token";

const logout = async (parent, args, context, _) => {
    const isValid = verifyToken(parent, args, context);

    if (!isValid) {
        return false;
    }

    const {token} = args;
    const jwtUser = jwt.verify(token, secret, options);

    await context.db.mutation.updateUser({
        data: {activeToken: ""},
        where: {id: jwtUser.id},
    }, "{ activeToken }");

    return true;
};

export default logout;
