import { AiOutlineClose } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {  setGesamtSchutzInfo } from "../../../feature/reducers/appSlice";
import { RootState } from "../../../feature/store/store";


interface PackageOptionProps {
  name: string;
  deductible: number;
  dailyRate: number;
  features: string[];
  isSelected: boolean;
  onSelect: () => void;
  onToggleDetails: () => void;
  isDetailsActive: boolean;
  gesamteSchutzPrice: string; // Wird aus den Props dynamisch übergeben

}

const PackageOption = ({
  name,
  deductible,
  dailyRate,
  features,
  isSelected,
  onSelect,
  onToggleDetails,
  isDetailsActive,
  gesamteSchutzPrice,
 
}: PackageOptionProps) => {
  const dispatch = useDispatch();
  const { gesamteSchutzInfo } = useSelector(
    (state: RootState) => state.app
  );
console.log("gesamtePrice",gesamteSchutzPrice)

  return (
    <div  className="w-full flex xl:flex-row flex-col items-center justify-center">
      <div className="w-full px-2 mt-2">
        <fieldset
          className={`border-2 ${
            isSelected ? "border-green-400" : "border-orange-300"
          } p-4 rounded-lg shadow-lg`}
        >
          <legend
            className={`font-bold text-xs p-1 rounded-md ${
              isSelected ? "bg-green-400" : "hidden"
            }`}
          >
            Ausgewählt
          </legend>
          <div className="font-bold">
            <h1>{name}</h1>
            <p>Selbstbeteiligung: {deductible} €</p>
            <p className="mt-4">Preis: {dailyRate} € / Tag</p>
            {/* Zeige gesamteSchutzPrice dynamisch für jedes Paket */}
            <p className="text-lg mt-2">
              Gesamtpreis: <span className="font-bold">{gesamteSchutzPrice} €</span>
            </p>
          </div>
          <div className="bg-gray-300 w-13 h-[2px] px-2 mt-7" />
          <div className="mt-4 flex flex-col gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-3 items-center">
                {index < 3 ? (
                  <FaCheck className="text-green-400 text-sm" />
                ) : (
                  <AiOutlineClose className="text-gray-400 text-sm" />
                )}
                <p className={index < 3 ? "text-black" : "text-gray-400"}>
                  {feature}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-around">
            {/* Toggle Details Button */}
            <button
              onClick={onToggleDetails}
              className="cursor-pointer text-blue-600 underline"
            >
              {isDetailsActive ? "Weniger Details" : "Weitere Details"} &#8594;
            </button>
            {/* Select Button */}
            <button
              onClick={()=>{
                onSelect()
           
                  dispatch(setGesamtSchutzInfo({
                    name:name,
                    deductible:deductible,
                    dailyRate:dailyRate,
                    features:features,
                    gesamtPrice:gesamteSchutzPrice
                  }))
               
              }
              
              }
              className={`px-6 py-2 rounded-md ${
                isSelected ? "bg-gray-300" : "bg-orange-400 text-black"
              } `}
            >
              {isSelected ? "Ausgewählt" : "Wählen"}
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default PackageOption;
