import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAdminRequest, editAdminRequest, postAdminMealsRequest } from "../../api/mealsService";
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
    async(payload,{rejectWithValue,dispatch})=>{
        try{
            const {data} = await deleteAdminRequest (payload)
            dispatch(getFoods())
            return data.data
        } catch (error){
            return rejectWithValue(error)
        }
    }
)
export const editAdminMeals = createAsyncThunk(
    'admin/editAdminMeals',
    async(payload,{rejectWithValue,dispatch})=>{
        try{
            const {data} = await editAdminRequest (payload)
            dispatch(getFoods())
            return data.data
        } catch (error){
            return rejectWithValue(error)
        }
    }
)