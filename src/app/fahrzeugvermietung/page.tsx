import CarSearch from "@/components/car-form/CarSearch";


const page = () => {
    return (
       <div className=" w-full flex justify-center mt-2">
         <div className="xl:w-2/3 w-full  ">
            <CarSearch/>
        </div>
       </div>
    );
}

export default page;