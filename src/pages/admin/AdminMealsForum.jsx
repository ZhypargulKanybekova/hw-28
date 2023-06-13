import React, { useState } from "react";
import { Modall } from "../../components/UI/modal/Modal";
import { useDispatch } from "react-redux";
import { postAdminMeals } from "../../store/admin/AdminMealThunk";
import { Button, TextField, styled } from "@mui/material";
import { snackbarActions } from "../../store/snackbar";
import { Snackbar } from "../../components/UI/Snackbar";
// import styled from "@emotion/styled";
// import styled from "styled-components";
// import { Button } from "../../components/UI/button/Button";

export const AdminMealsForum = ({ open, onClose }) => {
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
    price: "",
  });

  const onchangeTitleHandler = (e) => {
    setInputValue({
      ...inputValue,
      title: e.target.value,
    });
  };

  const onchangeDescriptionHandler = (e) => {
    setInputValue({
      ...inputValue,
      description: e.target.value,
    });
  };

  const onchangePriceHandler = (e) => {
    setInputValue({
      ...inputValue,
      price: e.target.value,
    });
  };

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      title: inputValue.title,
      description: inputValue.description,
      price: +inputValue.price,
    };

    console.log("data", data);
    try {
      await dispatch(postAdminMeals(data));
      dispatch(snackbarActions.doSuccess({ message: "Успешно добавлено" }));
    } catch (error) {
      dispatch(snackbarActions.doError({ message: "Что то пошло не так" }));
    }

    setInputValue({
      title: "",
      description: "",
      price: "",
    });
    onClose(false);
  };

  return (
    <>
      <Snackbar />
      <Modall open={open} onClose={onClose}>
        <FormContainer>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            type="text"
            value={inputValue.title}
            onChange={onchangeTitleHandler}
          />
          <TextField
            id="outlined-basic"
            label="Deccription"
            variant="outlined"
            type="text"
            value={inputValue.description}
            onChange={onchangeDescriptionHandler}
          />
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            type="number"
            value={inputValue.price}
            onChange={onchangePriceHandler}
          />
        </FormContainer>
        <Buttons>
          <Buttonn type="submit" variant="contained" onClick={submitHandler}>
            Add{" "}
          </Buttonn>
          <Buttonn variant="contained" onClick={onClose}>
            close
          </Buttonn>
        </Buttons>
      </Modall>
    </>
  );
};

const FormContainer = styled("form")`
  display: flex;
  flex-direction: column;
`;

const Buttons = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
  margin-top: 10px;
`;

const Buttonn = styled(Button)`
  background-color: #993108;
  color: white;
  border-color: #993108;

  &:hover {
    background-color: #7e2a0a;
    border-color: #ffffff;
  }
`;
