import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/UI/button/Button";
import { useDispatch } from "react-redux";
import { singInRequest } from "../store/auth/authThunk";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onCHangeEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const onCHangePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const submitHandler = (e) => {
    const data = {
      email,
      password,
    };
    e.preventDefault();
    dispatch(singInRequest(data))
      .unwrap()
      .then(() => navigate("/"))
      .catch();
  };
  return (
    <Container>
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
            label="Login"
            variant="outlined"
            value={email}
            onChange={onCHangeEmailHandler}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={password}
            onChange={onCHangePasswordHandler}
          />
          <div>
            create an account?
            <Link to="/signup">
              <b>Craete an account</b>
            </Link>
          </div>
          <Button
            type="submit"
            style={{
              width: "200px",
              height: "50px",
              borderRadius: "8px",
              margin: "0 auto",
            }}
          >
            SignIn
          </Button>
        </Box>
      </Form>
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
  height: 330px;
  background-color: #fff;
  padding: 45px 10px 0 10px;
  border-radius: 10px;
  border: 2px solid #fff;
  box-shadow: 0px 4px 7px 2px #fff;
`;
