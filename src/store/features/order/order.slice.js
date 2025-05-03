import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, getOrdersCount } from "./order.service";

const initialState = {
  placeOrderLoading: false,

  ordersCount: [],
  ordersCountLoading: false,

  isError: false,
  isSuccess: false,
  message: "",
};

export const CreateOrder = createAsyncThunk(
  "order/create",
  async ({ payload, moveToNext }, thunkAPI) => {
    try {
      const response = await createOrder(payload);
      if (response.success) {
        moveToNext(response);
        return response;
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const GetOrdersCount = createAsyncThunk(
  "order/count",
  async (_, thunkAPI) => {
    try {
      const response = await getOrdersCount();
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      (state.isSuccess = false), (state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateOrder.pending, (state) => {
        state.placeOrderLoading = true;
      })
      .addCase(CreateOrder.fulfilled, (state) => {
        state.placeOrderLoading = false;
        state.isSuccess = true;
      })
      .addCase(CreateOrder.rejected, (state, action) => {
        state.placeOrderLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(GetOrdersCount.pending, (state) => {
        state.ordersCountLoading = true;
      })
      .addCase(GetOrdersCount.fulfilled, (state, action) => {
        state.ordersCount = action.payload.data;
        state.ordersCountLoading = false;
        state.isSuccess = true;
      })
      .addCase(GetOrdersCount.rejected, (state, action) => {
        state.placeOrderLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
