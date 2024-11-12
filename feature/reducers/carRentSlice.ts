import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { ICarRent } from "../../interface";
import { getCarRent, getOneCarById } from "../../service";
import { RootState } from "../store/store";

export interface ICarRentState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
 // carRentId: string | null;
 totalPrice: number ;
}

const carRentAdapter = createEntityAdapter<ICarRent, string>({
  selectId: (car) => car._id || "",
});

const initialState: ICarRentState & EntityState<ICarRent, string> =
  carRentAdapter.getInitialState({
    status: "idle",
    error: null,
    carRentId: "",
    totalPrice:0
  });

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

export const getCarRentByIdApi = createAsyncThunk(
  "carRent/getCarRentByIdApi",
  async (id: string) => {
    try {
      const response = await getOneCarById(id);
      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

const carRentSlice = createSlice({
  name: "carRent",
  initialState,
  reducers: {
  //  setCarId: (state, action) => {
   //   state.carRentId = action.payload;
   // },
   setTotalPrice:(state,action)=>{
    state.totalPrice = action.payload
   }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRentCarApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRentCarApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        carRentAdapter.setAll(state, action.payload);
      })
      .addCase(getRentCarApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "failed to get all car";
      })
      .addCase(getCarRentByIdApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCarRentByIdApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        carRentAdapter.setOne(state, action.payload);
      })
      .addCase(getCarRentByIdApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "failed to get all car";
      });
  },
});


export const {setTotalPrice} = carRentSlice.actions

export const { selectAll: getAllRentCars, selectById: getRentCarById } =
  carRentAdapter.getSelectors((state: RootState) => state.carRent);

export default carRentSlice.reducer;
