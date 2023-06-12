import React from "react";
import { Route, Routes } from "react-router-dom";
import { Signin } from "../pages/Signin";
import { SignUp } from "../pages/SignUp";
import { UserLayout } from "../loyout/UserLayout";
import { MealLoyaut } from "../loyout/MealLoyaut";
import { AdminLoyaut } from "../loyout/AdminLoyaut";
import { MealsAdmin } from "../pages/admin/MealsAdmin";
import { USERS_ROLE } from "../constans/utils";
import { ProtectedRoute } from "./ProtectedRoute";
import { useSelector } from "react-redux";
import { AdminMealsForum } from "../pages/admin/AdminMealsForum";

export const MainRoutes = () => {
  const role = useSelector((state) => state.auth.user.role);
  console.log("role", role);

  const isAllowed = (roles) => {
    return roles.includes(role);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute
            isAllowed={isAllowed([USERS_ROLE.GUEST, USERS_ROLE.USER])}
            fallBacPath="/admin"
            component={UserLayout}
          />
        }
      >
        <Route
          index
          element={
            <ProtectedRoute
              isAllowed={isAllowed([USERS_ROLE.GUEST, USERS_ROLE.USER])}
              fallBacPath="/admin"
              component={MealLoyaut}
            />
          }
        />
        <Route
          path="signin"
          element={
            <ProtectedRoute
              isAllowed={isAllowed([USERS_ROLE.GUEST, USERS_ROLE.USER])}
              fallBacPath={role === USERS_ROLE.ADMIN ? "/admin" : "/"}
              component={Signin}
            />
          }
        />
        <Route
          path="signup"
          element={
            <ProtectedRoute
              isAllowed={isAllowed([USERS_ROLE.GUEST, USERS_ROLE.USER])}
              fallBacPath={role === USERS_ROLE.ADMIN ? "/admin" : "/"}
              component={SignUp}
            />
          }
        />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute
            isAllowed={isAllowed([USERS_ROLE.ADMIN])}
            fallBacPath="/"
            component={AdminLoyaut}
          />
        }
      >
        <Route index element={<MealsAdmin />}>
        </Route>
          <Route path="/adminmodal" element={<AdminMealsForum/>}/>
      </Route>
    </Routes>
  );
};
