import { Button, TextField, styled } from "@mui/material";
import React, { useState } from "react";
import { Modall } from "../../components/UI/modal/Modal";
import { editAdminMeals } from "../../store/admin/AdminMealThunk";
import { useDispatch } from "react-redux";
import { snackbarActions } from "../../store/snackbar";
import { Snackbar } from "../../components/UI/Snackbar";
// import styled from "styled-components";
// import { Button } from "../../components/UI/button/Button";

export const EtitAdminForum = ({ editData, open, onClose }) => {
  const [editTitle, setEditTitle] = useState(editData.title);
  const [editDescription, setEditDescription] = useState(editData.description);
  const [editPrice, setEditPrice] = useState(editData.price);

  const dispatch = useDispatch();

  const onchangeTitleHandler = (e) => {
    setEditTitle(e.target.value);
  };

  const onchangeDescriptionHandler = (e) => {
    setEditDescription(e.target.value);
  };
  const onchangePriceHandler = (e) => {
    setEditPrice(e.target.value);
  };

  const saveDataHandler = async () => {
    const newData = {
      id: editData._id,
      title: editTitle,
      description: editDescription,
      price: +editPrice,
    };

    try {
      await dispatch(editAdminMeals(newData)).unwrap();
      dispatch(snackbarActions.doSuccess({ message: "Успешно редактировано" }));
    } catch (error) {
      dispatch(snackbarActions.doError({ message: "Что то пошло не так" }));
    }
    onClose();
  };

  return (
    <>
      <Snackbar />
      <Modall open={open} onClose={onClose}>
        <ModalContainer>
          <TextField value={editTitle} onChange={onchangeTitleHandler} />
          <TextField
            value={editDescription}
            onChange={onchangeDescriptionHandler}
          />
          <TextField value={editPrice} onChange={onchangePriceHandler} />
          <ButtonContainer>
            <Buttonn variant="outlined" onClick={saveDataHandler}>
              Save
            </Buttonn>
            <Buttonn variant="outlined" onClick={onClose}>
              Close 
            </Buttonn>
          </ButtonContainer>
        </ModalContainer>
      </Modall>
    </>
  );
};

const ModalContainer = styled("div")`
  height: 350px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
