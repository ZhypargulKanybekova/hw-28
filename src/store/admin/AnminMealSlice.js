import { createSlice } from '@reduxjs/toolkit'
import { deleteAdminMeals, postAdminMeals } from './AdminMealThunk'



const initialState = {
    meals: [],
    newMeal: {},
    isLoading: false,
}

export const mealsAdminSlice = createSlice({
    name: 'mealsAdmin',
    initialState,
    extraReducers: (builder) => {
        // builder.addCase(mealsAdmin.fulfilled, (state, action) => {
        //     state.meals = action.payload
        // })
        builder.addCase(deleteAdminMeals, (state) => {
            state.isLoading = false
        })
        builder.addCase(postAdminMeals.fulfilled, (state, action) => {
            state.newMeal = action.payload
            state.isLoading = false
        })
        // builder.addCase(updateMeal.fulfilled, (state, action) => {
        //     state.isLoading = false
        //     state.newMeal = action.payload
        // })
    },
})

export const mealsAdminActions = mealsAdminSlice.actions