import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    EntityState,
  } from "@reduxjs/toolkit";

  import { userLogin, userRegister } from '../../service/index';
  import { RootState } from "../store/store";
import { IUser, IUserInfo, TUser } from "../../interface";

  
  interface IUserState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    token: string;
    userId: string;
    userInfo: IUserInfo;
  }
  
  const userAdapter = createEntityAdapter<IUser, string>({
    selectId: (user) => user._id || "",
  })
  
  export const userRegisterApi = createAsyncThunk(
    "users/userRegisterApi",
    async (initialUser: TUser, { rejectWithValue }) => {
      try {
        const response = await userRegister(initialUser);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message || "Error in user registration");
      }
    }
  )
  
  export const userLoginApi = createAsyncThunk(
    "users/userLoginApi",
    async (initialUser: TUser, { rejectWithValue }) => {
      try {
        const response = await userLogin(initialUser);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message || "Error in user login");
      }
    }
  )
  
  const initialState: IUserState & EntityState<IUser, string> =
    userAdapter.getInitialState({
      status: "idle",
      error: null,
      token: "",
      userId: "",
      userInfo: { 
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAdmin: false,
        exp: 0,
        iat: 0,
      },
    });
  
  const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      setToken: (state, action) => {
        state.token = action.payload;
      },
      setUserInfo: (state, action) => {
        state.userInfo = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(userRegisterApi.pending, (state) => {
          state.status = "loading";
        })
        .addCase(userRegisterApi.fulfilled, (state, action) => {
          userAdapter.addOne(state, action.payload.user);
        })
        .addCase(userLoginApi.fulfilled, (state, action) => {
          userAdapter.setOne(state, action.payload.user);
        });
    }
  })
  
  export const { selectAll: displayUsers, selectById: displayUserById } = userAdapter.getSelectors((state: RootState) => state.users);
  export const { setToken, setUserInfo } = userSlice.actions;
  
  export default userSlice.reducer;
  