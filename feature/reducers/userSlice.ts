import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    EntityState,
    PayloadAction,
} from "@reduxjs/toolkit";
import { userLogin, userRegister, getAllUsers, userLogout, profilePhotoUpload,requestPasswordReset, confirmEmailVerificationCode } from '../../service/index';
import { RootState } from "../store/store";
import { IUser, IUserInfo, TUser } from "../../interface";
import { IChangePassword } from "../../interface";
import { changePasswordWithEmail } from "../../service/index";


interface IUserState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    token: string;
    userId: string;
    file: File | null;
    userInfo: IUserInfo;
    message?: string;
   
}

const userAdapter = createEntityAdapter<IUser, string>({
    selectId: (user) => (user?._id ? user._id : ""),
});


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
);

export const userLoginApi = createAsyncThunk(
    "users/userLoginApi",
    async (initialUser: TUser, { rejectWithValue }) => {
        try {
            const response = await userLogin(initialUser);
            console.log("login UserSlice:", response.data);
            localStorage.setItem("userId", response.data.userInfo.userId)
            localStorage.setItem("exp", response.data.userInfo.exp)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Error in user login");
        }
    }
);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await getAllUsers();
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message || "Error fetching users");
    }
});

export const userLogoutApi = createAsyncThunk("users/userLogoutApi", async (_, { rejectWithValue }) => {
    try {
        const response = await userLogout();
        localStorage.removeItem("exp");
        localStorage.removeItem("userId");
        return response.data;
    } catch (error) {

        const errorMessage = (error as any)?.response?.data?.message || "Logout failed";
        return rejectWithValue(errorMessage);
    }
});
export const profilePhotoUploadApi = createAsyncThunk(
    "users/profilePhotoUploadApi",
    async (data: File, { rejectWithValue }) => {
        try {
            const response = await profilePhotoUpload(data);
            console.log("Profile Photo UserSlice:", response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Fehler beim Hochladen des Profilbilds");
        }
    }
);
export const changePasswordApi = createAsyncThunk(
    "user/changePassword",
    async (passwordData: IChangePassword, { rejectWithValue }) => {
        try {
            const response = await changePasswordWithEmail(passwordData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Fehler beim Ändern des Passworts");
        }
    }
);
 

export const requestPasswordResetApi = createAsyncThunk(
    "user/requestPasswordResetApi",
    async (email: string, { rejectWithValue }) => {

        try {
            const response = await requestPasswordReset(email);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Fehler beim Zurücksetzen des Passworts");
        }
    }
)

export const confirmEmailVerificationCodeApi = createAsyncThunk(
    "user/confirmEmailVerificationCode",
    async (
      { email, verificationCode }: { email: string; verificationCode: string },
      { rejectWithValue }
    ) => {
      try {
        const response = await confirmEmailVerificationCode(email, verificationCode);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.message || "Fehler beim Bestätigen des Verifizierungscodes."
        );
      }
    }
  );

const initialState: IUserState & EntityState<IUser, string> =
    userAdapter.getInitialState({
        status: "idle",
        error: null,
        file: null,
        userId: "",
        token: "",
        userInfo: {
            userId: "",
            firstName: "",
            lastName: "",
            email: "",
            profile_photo: "",
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
        clearUserInfos: (state) => {
            state.userInfo = initialState.userInfo;
            state.token = "";
            state.userId = "";
        },
        // Benutzer aktualisieren
        userUpdated: (state, action: PayloadAction<{ id: string; updatedUser: IUser }>) => {
            const { id, updatedUser } = action.payload;
            userAdapter.updateOne(state, {
                id,
                changes: updatedUser,
            });
        },
          
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegisterApi.pending, (state) => {
                state.status = "loading";
            })
            .addCase(userRegisterApi.fulfilled, (state, action) => {
                userAdapter.addOne(state, action.payload.user);
                state.status = "succeeded";
            })
            .addCase(userLoginApi.fulfilled, (state, action) => {
                userAdapter.setOne(state, action.payload.userInfo);
                state.userInfo = action.payload.userInfo;
                state.token = action.payload.token;
                state.status = "succeeded";
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                userAdapter.setAll(state, action.payload);
                state.status = "succeeded";
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch users";
            })
            .addCase(userLogoutApi.fulfilled, (state) => {
                state.userInfo = initialState.userInfo;
                state.token = "";
                state.userId = "";
                state.status = "idle";
                state.error = null
            })
            .addCase(profilePhotoUploadApi.fulfilled, (state, action) => {
                if (action.payload?.userInfo) {
                    userAdapter.setOne(state, action.payload.userInfo);
                    state.status = "succeeded";
                } else {
                    state.status = "failed";
                    state.error = "Benutzerinformationen fehlen";
                    console.error("Payload enthält keine Benutzerinformationen:", action.payload);
                }
            })
            .addCase(changePasswordApi.fulfilled, (state) => {
                state.status = "succeeded";
                state.error = null;
            })
         
            .addCase(requestPasswordResetApi.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.message = action.payload.message; 
              })
              .addCase(confirmEmailVerificationCodeApi.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.message = action.payload.message;
                if (action.payload.user) {
                  state.userInfo = {
                    ...state.userInfo,
                    email: action.payload.user.email,
                    isAccountVerified: action.payload.user.isAccountVerified,
                  };
                }
              });
    }
});
export const { userUpdated, clearUserInfos } = userSlice.actions;
export const { selectAll: displayUsers, selectById: displayUserById } = userAdapter.getSelectors((state: RootState) => state.users);
export const { setToken, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
