import { createSlice } from "@reduxjs/toolkit";
import { signUpRequest, singInRequest } from "./authThunk";
import { STORAGE_KEY, USERS_ROLE } from "../../constans/utils";

const getInitialState = () => {
  const json = localStorage.getItem(STORAGE_KEY.AUTH);
  if (json) {
    const userData = JSON.parse(json);

    return {
      isAuthorization: true,
      token: userData.token,

      user:{
        name: userData.user.name,
        email: userData.user.email,
        role: userData.user.role,
      },
    };
  }
  return {
    isAuthorization: false,
    token: "",

    user: {
      email: "",
      name: "",
      role: USERS_ROLE.GUEST,
    },
    
  };
};
const initialState = getInitialState();

export const authSlise = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthorization = false;
      state.token = "";

      state.user = {
        name: "",
        email: "",
        password: "",
        role: USERS_ROLE.GUEST,
        id: "",
      };
      return localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpRequest.fulfilled, (state, action) => {
        state.isAuthorization = true;
        state.token = action.payload.token;

        state.user = {
          name: action.payload.user.name,
          email: action.payload.user.email,
          role: action.payload.user.role,
        };
      })
      .addCase(singInRequest.fulfilled, (state, action) => {
        state.isAuthorization = true;
        state.token = action.payload.token;

        state.user={
          name: action.payload.user.name,
          email: action.payload.user.email,
          role: action.payload.user.role,
        };
   })
      .addCase(signUpRequest.pending, (state) => {
        state.isAuthorization = false;
      })
      // .addCase(logout.fulfilled),()=>{
      //   return {...initialState}
      // }
  },
});

export const authActions = authSlise.actions;
