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
  customerNumber: string;
}



export interface IUserInfo {
    userId: string;
    firstName: string;
    lastName: string;
    profile_photo: string;
    email: string;
    isAdmin: boolean;
    customerNumber : string;
    isAccountVerified?: boolean;
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
    carImages:string[];
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
    createdAt: string;
    carIdentificationNumber: string;
}

export type TBuy = Partial<ICarBuy>;

export interface ICarRent {
  _id?: string;
  user?: string;
  carName: string;
  carImage: string;
  carAC: boolean;
  carGear: string;
  carPrice: string;
  carDoors: string;
  carPeople: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt?: string;
  bookedSlots: Array<{ start: string; end: string }>;
  totalPrice?: number;
}

export type TCarRent = Partial<ICarRent>;

export interface IOffer {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  oldPrice: string;
  newPrice: string;
  discountPercentage: string;
  userId: string;
}


export interface  IAppointment {
    _id: string
    service: string;
    date: string;
    time: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    comment: string;
    licensePlate: string;
    hsn: string;
    tsn: string;
    userId?: string;
    isBookedOrBlocked: boolean;
 
}

export type TAppointment = Partial<IAppointment>;

export interface ISchutzPacket {
  _id: string;
  name: string;
  deductible: number;
  dailyRate: number;
  features: string[];
  user: string;
}

export interface IChangePassword {
  email: string;
  password: string;
  currentPassword?: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IReservation {
  _id: string;
  vorname: string;
  nachname: string;
  geburtsdatum: string;
  email: string;
  telefonnummer: string;
  adresse: string;
  postalCode: string;
  stadt: string;
  pickupDate?: string;
  returnDate?: string;
  pickupTime?: string;
  returnTime?: string;
  gesamtPrice: string;
  carRentId?: string | undefined;
  userId?: string;
  reservationId?: string;
}
export type TReservation = Partial<IReservation>;
