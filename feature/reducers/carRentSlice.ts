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
  carId: string | null;
  totalPrice: number;
  isCarVerfügbar: boolean;
  isBasicDetailsActive: boolean;
  isMediumDetailsActive: boolean;
  isPremiumDetailsActive: boolean;
}

const carRentAdapter = createEntityAdapter<ICarRent, string>({
  selectId: (car) => car._id || "",
});

const initialState: ICarRentState & EntityState<ICarRent, string> =
  carRentAdapter.getInitialState({
    status: "idle",
    error: null,
    carRentId: "",
    totalPrice: 0,
    isCarVerfügbar: false,
    carId: "",
    isBasicDetailsActive: false,
    isMediumDetailsActive: false,
    isPremiumDetailsActive: false,
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
    setCarId: (state, action) => {
      state.carId = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setIsCarVerfügbar: (state, action) => {
      state.isCarVerfügbar = action.payload;
    },
    setIsBasicDetailsActive: (state, action) => {
      state.isBasicDetailsActive = action.payload;
    },
    setIsMediumDetailsActive: (state, action) => {
      state.isMediumDetailsActive = action.payload;
    },
    setIsPremiumDetailsActive: (state, action) => {
      state.isPremiumDetailsActive = action.payload;
    },
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

export const {
  setTotalPrice,
  setIsCarVerfügbar,
  setCarId,
  setIsBasicDetailsActive,
  setIsMediumDetailsActive,
  setIsPremiumDetailsActive,
} = carRentSlice.actions;

export const { selectAll: getAllRentCars, selectById: getRentCarById } =
  carRentAdapter.getSelectors((state: RootState) => state.carRent);

export default carRentSlice.reducer;
