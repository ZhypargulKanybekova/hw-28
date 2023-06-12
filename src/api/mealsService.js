
import { axiosInstance } from "../lib/fetchAPI"

export const postAdminMealsRequest = (data)=>{
    return axiosInstance.post('foods',data)
}

export const deleteAdminRequest = (token,id)=>{
    return axiosInstance.delete(`/foods/${id}`,{
        headers:{Authorization:token},
    })
}