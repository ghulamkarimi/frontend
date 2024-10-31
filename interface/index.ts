
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


export interface ICarRent {
    _id?: string;
    user?: string;
    carName : string ;
    carImage : string ;
    carAC: boolean;
    carGear : string ;
    carPrice : string ;
    carDoors : string ;
    carPeople : string ;
    isBooked : boolean ;
    createdAt:string ;
    updatedAt?: string;
    bookedSlots: Array<{ start: string; end: string }>;
}

export type TCarRent = Partial<ICarRent>