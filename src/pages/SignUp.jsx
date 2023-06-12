import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signUpRequest } from "../store/auth/authThunk";
import { USERS_ROLE } from "../constans/utils";
import { Button } from "../components/UI/button/Button";

export const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeNameHandler = (e) => {
    setName(e.target.value);
  };
  const onChangeGmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const onChangePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirm(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      role: USERS_ROLE.USER,
    };

    if (password !== confirm) {
      alert("Password don't match ");
      return;
    }
    dispatch(signUpRequest(data))
      .unwrap()
      .then(() => navigate("/signin"))
      .catch();
  };
  return (
    <Container>
      <div>
        <Form onSubmit={submitHandler}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              type="text"
              variant="outlined"
              value={name}
              onChange={onChangeNameHandler}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={onChangeGmailHandler}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={onChangePasswordHandler}
            />
            <TextField
              id="outlined-basic"
              label="Confirm password"
              type="password"
              variant="outlined"
              value={confirm}
              onChange={onChangeConfirmPassword}
            />
            <Div>
              go Back
              <Link to="/signin">Sigin with current account </Link>
            </Div>
            <Button
              type="submit"
              style={{
                width: "200px",
                height: "50px",
                borderRadius: "8px",
                margin: "0 auto",
              }}
            >
              SignUp
            </Button>
          </Box>
        </Form>
      </div>
    </Container>
  );
};
const Container = styled.div`
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  width: 500px;
  background-color: #fff;
  padding: 45px 10px 10px 10px;
  border-radius: 10px;
  border: 2px solid #fff;
  box-shadow: 0px 4px 7px 2px #fff;
`;
const Div = styled.div`
  display: flex;
  gap: 8px;
`;
