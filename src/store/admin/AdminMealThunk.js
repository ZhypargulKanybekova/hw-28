import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAdminRequest, postAdminMealsRequest } from "../../api/mealsService";
import { getFoods } from "../meals/mealsThunk";

export const postAdminMeals = createAsyncThunk(
    'admin/postAdminMeals',
async(payload,{dispatch, rejectWithValie})=>{
    try{
        const response = await postAdminMealsRequest(payload);
        dispatch(getFoods())
        return response.data.data
    }catch(error){
        return rejectWithValie(error)
    }
}
)

export const deleteAdminMeals = createAsyncThunk(
    'admin/deleteAdminMeals',
    async(payload,{rejectWithValue,getState,dispatch})=>{
        try{
            const {token}= getState().auth
            const {data} = await deleteAdminRequest (token,payload)
            dispatch(getFoods())
            return data.data
        } catch (error){
            return rejectWithValue(error)
        }
    }
)