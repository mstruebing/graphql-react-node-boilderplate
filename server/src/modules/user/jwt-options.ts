const secret = (process.env.NODE_ENV === "Production" && process.env.JWT_SECRET) || "helloworld";

const options = {
    expiresIn: "2d",
    issuer: "http://localhost:4000",
};

export {
    options,
    secret,
};
