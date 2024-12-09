import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from "@reduxjs/toolkit";
import { IReservation, TReservation } from "../../interface";
import { createReservation } from "../../service";


export interface IReservationState{
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}



const reservationAdapter = createEntityAdapter<IReservation,string>({
    selectId:(reservation)=>reservation._id
})

const initialState:IReservationState & EntityState<IReservation,string>=reservationAdapter.getInitialState({
     status: "idle",
     error:null
})


export const createReservationApi = createAsyncThunk("/reservation/createReservationApi",async(
    formData:TReservation
)=>{
try {
    const response = await createReservation(formData)
    return response.data;
} catch (error:any) {
    throw error.response.data.message;
}
})

const reservationSlice = createSlice({
name:"reservation",
initialState,
reducers:{},
extraReducers:()=>{}
})