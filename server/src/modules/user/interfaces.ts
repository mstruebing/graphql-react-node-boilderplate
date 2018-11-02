export interface IJWTOptions {
    expiresIn: string;
    issuer: string;
}

export interface IUser {
    id: string;
    username: string;
    email: string;
}

export interface ILogin {
    token: string;
    user: IUser;
}
