import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from "@reduxjs/toolkit";
import { IAppointment, TAppointment } from "../../interface";
import { createAppointment } from "../../service";

interface IWorkshopState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const workshopAdapter = createEntityAdapter<IAppointment, string>({
    selectId: (appointment) => appointment && appointment._id ? appointment._id : "default-id",

});

export const createAppointmentApi = createAsyncThunk(
    "workshop/createAppointmentApi",
    async (initialAppointment: TAppointment, { rejectWithValue }) => {
        try {
            const response = await createAppointment(initialAppointment);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Error in creating appointment");
        }
    }
);

const initialState : IWorkshopState & EntityState<IAppointment , string> = 
workshopAdapter.getInitialState({
    status: 'idle',
    error: null,
})

const workshopSlice = createSlice({
    name: "workshop",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(createAppointmentApi.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createAppointmentApi.fulfilled, (state, action) => {
                workshopAdapter.addOne(state, action.payload.appointment);
                state.status = "succeeded";
            })
           
    }
})

export default workshopSlice.reducer;