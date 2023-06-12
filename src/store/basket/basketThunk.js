import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTRoBasketRequest,
  deleteBasketRequest,
  getBasketRequest,
  updateBaasketRequest,
} from "../../api/foodService";

export const getBasket = createAsyncThunk(
  "basket/getBasket",
  async (_, { rejectedWithValue }) => {
    try {
      const { data } = await getBasketRequest();
      return data.data.items;
    } catch (error) {
      return rejectedWithValue(
        error?.response?.message || "Something went wrong!"
      );
    }
  }
);

export const addItem = createAsyncThunk(
  "basket/addItem",
  async (newItem, { rejectWithValue, dispatch }) => {
    try {
      await addTRoBasketRequest(newItem);
      dispatch(getBasket());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const incrementFood = createAsyncThunk(
  "basket/incrementItem",
  async ({ amount, id }, { rejectWithValue, dispatch }) => {
    try {
      await updateBaasketRequest(amount, id);
      dispatch(getBasket());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const decrementFood = createAsyncThunk(
  "basket/decrementItem",
  async ({ amount, id }, { rejectWithValue, dispatch }) => {
    const decrement = true;
    if (amount !== 0) {
      try {
        await updateBaasketRequest(amount, id, decrement);
        dispatch(getBasket());
      } catch (error) {
        return rejectWithValue(
          error?.response?.message || "Something went wrong!"
        );
      }
    } else {
      try {
        await deleteBasketRequest();
        dispatch(getBasket());
      } catch (error) {
        return rejectWithValue(
          error?.response?.message || "Something went wrong!"
        );
      }
    }
  }
);
