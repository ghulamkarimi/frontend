import { useDispatch } from 'react-redux';
import { setSelectedSchutzPackage } from '../../feature/reducers/carRentSlice';

export const calculateRentalDays = (pickupDate: string, returnDate: string): number => {
    if (pickupDate && returnDate) {
      const pickup = new Date(pickupDate);
      const returnD = new Date(returnDate);
      const timeDifference = returnD.getTime() - pickup.getTime();
      const rentalDays = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert ms to days
      return rentalDays;
    }
    return 0;
  };



  export const getDailyRateByPackage = (packet: string): number => {
    switch (packet) {
      case "Medium":
        return 11.4; 
      case "Premium":
        return 14.5; 
      case "Basic":
      default:
        return 1; 
    }
  };
  
  
 
  export const calculatePriceSchutzPacket = (
    packet: string,
    rentalDays: number
  ): string => {
    const dailyRate = getDailyRateByPackage(packet); 
    const totalPrice = dailyRate * rentalDays; 
    return totalPrice.toFixed(2); 
  };
  





export const useSelectPacket = () => {
  const dispatch = useDispatch();

  const handleSelectPacket = (packet: string) => {
    dispatch(setSelectedSchutzPackage(packet));
    localStorage.setItem("packet", packet);
  };

  return handleSelectPacket;
};
