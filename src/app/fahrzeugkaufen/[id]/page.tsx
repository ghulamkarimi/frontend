"use client"
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../feature/store/store";
import { displayCarBuyById } from "../../../../feature/reducers/carBuySlice";


const page = () => {
    const { carId } = useParams();
    const singleCar = useSelector((state: RootState) => displayCarBuyById(state, carId as string || ""));
    console.log("carId:", carId);
    console.log("singleCar: faghrzeug mit dieser id nicht gefunden", singleCar);
    if (!singleCar) {
        return <h1 className="text-4xl text-center">Fahrzeugmit diser id  nicht gefunden</h1>
    }
    return (
       <div>
 
       </div>
    );
}

export default page;