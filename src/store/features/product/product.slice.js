import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getForChildren,
  getForMen,
  getForWomen,
  getProductsCounts,
  updateProduct,
} from "./product.service";

const initialState = {
  createProduct: null,
  createProductLoading: false,

  allProducts: [],
  allProductLoading: false,

  deleteProductLoading: false,

  updateProductLoading: false,

  productCount: [],
  productCountLoading: false,

  forMen: [],
  forMenLoading: false,

  forWomen: [],
  forWomenLoading: false,

  forChildren: [],
  forChildrenLoading: false,

  isError: false,
  isSuccess: false,
  message: "",
};

export const CreateProduct = createAsyncThunk(
  "product/create",
  async ({ payload, moveToNext }, thunkAPI) => {
    try {
      const response = await createProduct(payload);
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

export const GetAllProduct = createAsyncThunk(
  "product/getall",
  async (_, thunkAPI) => {
    try {
      const response = await getAllProducts();
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

export const DeleteProduct = createAsyncThunk(
  "product/delete",
  async ({ id, moveToNext }, thunkAPI) => {
    try {
      const response = await deleteProduct(id);
      if (moveToNext) {
        moveToNext(response);
      }
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

export const UpdateProduct = createAsyncThunk(
  "product/update",
  async ({ payload, moveToNext }, thunkAPI) => {
    try {
      const response = await updateProduct(payload);
      if (moveToNext) {
        moveToNext(response);
      }
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

export const GetProductCounts = createAsyncThunk(
  "product/getCount",
  async (_, thunkAPI) => {
    try {
      const response = await getProductsCounts();
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

export const GetForMen = createAsyncThunk(
  "product/getformen",
  async (_, thunkAPI) => {
    try {
      const response = await getForMen();
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

export const GetForWomen = createAsyncThunk(
  "product/getforwomen",
  async (_, thunkAPI) => {
    try {
      const response = await getForWomen();
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

export const GetForChildren = createAsyncThunk(
  "product/getforchildren",
  async (_, thunkAPI) => {
    try {
      const response = await getForChildren();
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      (state.isSuccess = false), (state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateProduct.pending, (state) => {
        state.createProductLoading = true;
      })
      .addCase(CreateProduct.fulfilled, (state, action) => {
        state.createProduct = action.payload;
        state.createProductLoading = false;
        state.isSuccess = true;
      })
      .addCase(CreateProduct.rejected, (state, action) => {
        state.createProductLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(GetAllProduct.pending, (state) => {
        state.allProductLoading = true;
      })
      .addCase(GetAllProduct.fulfilled, (state, action) => {
        state.allProducts = action.payload.products;
        state.allProductLoading = false;
        state.isSuccess = true;
      })
      .addCase(GetAllProduct.rejected, (state, action) => {
        state.allProductLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(DeleteProduct.pending, (state) => {
        state.deleteProductLoading = true;
      })
      .addCase(DeleteProduct.fulfilled, (state, action) => {
        state.deleteProductLoading = false;
        state.isSuccess = true;
      })
      .addCase(DeleteProduct.rejected, (state, action) => {
        state.deleteProductLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(UpdateProduct.pending, (state) => {
        state.updateProductLoading = true;
      })
      .addCase(UpdateProduct.fulfilled, (state) => {
        state.updateProductLoading = false;
        state.isSuccess = true;
      })
      .addCase(UpdateProduct.rejected, (state, action) => {
        state.updateProductLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(GetProductCounts.pending, (state) => {
        state.productCountLoading = true;
      })
      .addCase(GetProductCounts.fulfilled, (state, action) => {
        state.productCount = action.payload.data;
        state.productCountLoading = false;
        state.isSuccess = true;
      })
      .addCase(GetProductCounts.rejected, (state, action) => {
        state.productCountLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(GetForMen.pending, (state) => {
        state.forMenLoading = true;
      })
      .addCase(GetForMen.fulfilled, (state, action) => {
        state.forMen = action.payload.products;
        state.forMenLoading = false;
        state.isSuccess = true;
      })
      .addCase(GetForMen.rejected, (state, action) => {
        state.forMenLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(GetForWomen.pending, (state) => {
        state.forWomenLoading = true;
      })
      .addCase(GetForWomen.fulfilled, (state, action) => {
        state.forWomen = action.payload.products;
        state.forWomenLoading = false;
        state.isSuccess = true;
      })
      .addCase(GetForWomen.rejected, (state, action) => {
        state.forWomenLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(GetForChildren.pending, (state) => {
        state.forChildrenLoading = true;
      })
      .addCase(GetForChildren.fulfilled, (state, action) => {
        state.forChildren = action.payload.products;
        state.forChildrenLoading = false;
        state.isSuccess = true;
      })
      .addCase(GetForChildren.rejected, (state, action) => {
        state.forChildrenLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
