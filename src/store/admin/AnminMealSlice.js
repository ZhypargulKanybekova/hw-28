import { createSlice } from '@reduxjs/toolkit'
import { deleteAdminMeals, editAdminMeals, postAdminMeals } from './AdminMealThunk'

const initialState = {
    meals: [],
    newMeal: {},
    isLoading: false,
}

export const mealsAdminSlice = createSlice({
    name: 'mealsAdmin',
    initialState,
    extraReducers: (builder) => {
       
        builder.addCase(deleteAdminMeals.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(postAdminMeals.fulfilled, (state, action) => {
            state.newMeal = action.payload
            state.isLoading = false
        })
        builder.addCase(editAdminMeals.fulfilled, (state, action) => {
            state.isLoading = false
            state.newMeal = action.payload
        })
    },
})

export const mealsAdminActions = mealsAdminSlice.actions