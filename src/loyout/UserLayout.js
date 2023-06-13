import React, {  useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Basket } from "../components/basket/Basket";

export const UserLayout = () => {
  const [toggle, setToggle] = useState(false);
  console.log("toggle:", toggle);

  const toggleHandler = () => {
    setToggle((prev) => !prev);
    // console.log("toggle:", toggle);
  };

  return (
    <div>
      <Header toggleHandler={toggleHandler} />
      {toggle && <Basket toggleHandler={toggleHandler} toggle={toggle} />}
      <div style={{ marginTop: "100px" }}>
        <Outlet />
      </div>
    </div>
  );
};
