
export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    isAdmin: boolean;
    phone: string;
    token : string;
    accessToken: string | null;
    refreshToken: string | null;
    verificationCode: string;
    isAccountVerified: boolean;
}

export interface IUserInfo {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    exp: number;
    iat: number;
}
export type TUser = Partial<IUser>;


