
export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    isAdmin: boolean;
    phone: string;
    accessToken: string;
    refreshToken: string;
    verificationCode: string;
    isAccountVerified: boolean;
}

export type TUser = Partial<IUser>;

