import React, { FC } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes, RouteNames } from "../../routes";
import { User } from "../../pages";

export const AppRouter: FC = () => {
  const isAuth = false;
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
      <Route path={"*"} element={<Navigate to={RouteNames.USER} />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
      <Route path={"*"} element={<Navigate to={RouteNames.AVIA} />} />
    </Routes>
  );
};
