import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from "@reduxjs/toolkit";
import { ICarRent } from "../../interface";
import { getCarRent } from "../../service";
import { error } from "console";
import { RootState } from "../store/store";

export interface ICarRentState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const carRentAdapter = createEntityAdapter<ICarRent, string>({
  selectId: (car) => car._id || "",
});


const initialState : ICarRentState & EntityState<ICarRent,string>=carRentAdapter.getInitialState({
    status:"idle",
    error:null
})


export const getRentCarApi = createAsyncThunk(
  "carRent/getRentCar",
  async () => {
    try {
      const response = await getCarRent();
      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

const carRentSlice = createSlice({
    name:"carRent",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getRentCarApi.pending,(state)=>{
            state.status = "loading"
        })
        .addCase(getRentCarApi.fulfilled,(state,action)=>{
            state.status = "succeeded"
            carRentAdapter.setAll(state,action.payload)
        })
        .addCase(getRentCarApi.rejected,(state,action)=>{
            state.status = "failed"
            state.error = action.error.message || "failed to get all car"
        })
    }
})


export const {selectAll:getAllRentCars,selectById:getRentCarById} = carRentAdapter.getSelectors((state:RootState)=>state.carRent)

export default carRentSlice.reducer