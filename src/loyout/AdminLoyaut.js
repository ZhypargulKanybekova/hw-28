import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderAdminMeals } from "../pages/admin/HeaderAdminMeals";

export const AdminLoyaut = () => {
  console.log("Hello World");

  return (
    <div>
      <HeaderAdminMeals/>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
