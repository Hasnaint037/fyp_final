import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, signup, logout } from "./user.service";

const initialState = {
  user: null,
  userLoading: false,

  isError: false,
  isSuccess: false,
  message: "",
};

export const UserRegister = createAsyncThunk(
  "user/register",
  async ({ payload, moveToNext }, thunkAPI) => {
    try {
      const response = await signup(payload);
      if (response.success) {
        moveToNext(response);
        return response;
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      moveToNext(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UserLogin = createAsyncThunk(
  "user/login",
  async ({ payload, moveToNext }, thunkAPI) => {
    try {
      const response = await login(payload);
      console.log("response", response);
      moveToNext(response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      moveToNext(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UserLogout = createAsyncThunk(
  "user/logout",
  async ({ moveToNext }, thunkAPI) => {
    try {
      const response = await logout();
      moveToNext(response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      moveToNext(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      (state.isSuccess = false), (state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserRegister.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(UserRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userLoading = false;
        state.isSuccess = true;
      })
      .addCase(UserRegister.rejected, (state, action) => {
        state.userLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(UserLogin.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userLoading = false;
        state.isSuccess = true;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.userLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(UserLogout.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(UserLogout.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userLoading = false;
        state.isSuccess = true;
      })
      .addCase(UserLogout.rejected, (state, action) => {
        state.userLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
