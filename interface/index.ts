
export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    isAdmin: boolean;
    phone: string;
    profile_photo: string;
    token: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    verificationCode: string;
    isAccountVerified: boolean;
}

export interface IUserInfo {
    userId: string;
    firstName: string;
    lastName: string;
    profile_photo: string;
    email: string;
    isAdmin: boolean;
    exp: number;
    iat: number;
}
export type TUser = Partial<IUser>;

export interface ICarBuy {
    _id: string;
    carTitle: string;
    carId: string;
    carPrice: string;
    owner: number;
    isSold: boolean;
    carFirstRegistrationDay: string;
    carImage:string[];
    carDescription: string;
    carKilometers: string;
    carColor: string;
    carAirConditioning: boolean;
    carSeat: string;
    damagedCar: boolean;
    carNavigation: boolean;
    carParkAssist: boolean;
    carAccidentFree: boolean;
    carGearbox: string;
    carMotor: string;
    carHorsePower: string;
    carEuroNorm: string;
    fuelType: string;
    carTechnicalInspection: Date;
    carCategory: string;
    userId: string;
}

export type TBuy = Partial<ICarBuy>;


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

export interface IOffer {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: string;
    userId: string;
}