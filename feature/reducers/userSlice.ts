import { createAsyncThunk, createEntityAdapter, createSlice, EntityAdapter, EntityState } from "@reduxjs/toolkit";
import { IUser, TUser } from "../../interface";
import { userRegister } from '../../service/index';
import { RootState } from "../store/store";


interface IUserState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    token: string;
    userId: string;

}

const userAdapter = createEntityAdapter<IUser, string>({
    selectId: (user) => user._id || "",
})

export const userRegisterApi = createAsyncThunk(
    "users/userRegisterApi",
    async (initialUser: TUser) => {
        try {
            const response = await userRegister(initialUser);
            return response.data;
        } catch (error: any) {
            throw Error(error.response.data.message);

        }
    }
)

const initialState: IUserState & EntityState<IUser, string> =
    userAdapter.getInitialState({
        status: "idle",
        error: null,
        token: "",
        userInfo: {
            userId: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            isAdmin: false,
            exp: "",
            iat: "",
        },
        userId: ""
    })

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userRegisterApi.pending, (state) => {
            state.status = "loading";
        })
            .addCase(userRegisterApi.fulfilled, (state, action) => {
                userAdapter.addOne(state, action.payload.user);
            })
    }
})

export const {selectAll:  displayUsers , selectById: dipalyUserById} = userAdapter.getSelectors((state: RootState) => state.users);

export default userSlice.reducer;