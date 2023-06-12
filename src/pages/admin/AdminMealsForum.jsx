import React, { useState } from "react";
import { Modall } from "../../components/UI/modal/Modal";
import { useDispatch } from "react-redux";
import { postAdminMeals } from "../../store/admin/AdminMealThunk";
import { Button } from "@mui/material";

export const AdminMealsForum = ({ open, onClose }) => {

    const dispatch = useDispatch()

    const [inputValue, setInputValue]=useState({
        title:"",
        description:"",
        price:"",
    })

   const onchangeTitleHandler = (e)=>{
   setInputValue({
    ...inputValue,
      title:e.target.value
})}

   const onchangeDescriptionHandler = (e)=>{
   setInputValue({
    ...inputValue,
      description:e.target.value
})}      
   const onchangePriceHandler = (e)=>{
   setInputValue({
    ...inputValue,
      price:e.target.value
})}   

const submitHandler = (e)=>{
    e.preventDefault();

    const data = {
        title:inputValue.title,
        description:inputValue.description,
        price: +inputValue.price,
    }
dispatch(postAdminMeals(data))

setInputValue({
    title:"",
    description:"",
    price:""
});

}
    
  return (

    <Modall open={open} onClose={onClose}>
      <form onSubmit={submitHandler}>
        <input type="text" value={inputValue.title} onChange={onchangeTitleHandler}/>
        <input type="text" value={inputValue.description} onChange={onchangeDescriptionHandler}/>
        <input type="number" value={inputValue.price} onChange={onchangePriceHandler}/>
        <Button type="submit" variant="contained">Add </Button>
      </form>
        <Button variant="contained" onClick={onClose}>close</Button>
    </Modall>
  );
};
