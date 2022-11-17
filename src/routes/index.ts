import React, { ReactNode } from "react";

import { Avia, Info, User } from "../pages";

export interface IRoute {
  path: string;
  element: any;
}

export enum RouteNames {
  AVIA = "/avia",
  INFO = "/avia/info",
  USER = "/user",
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.AVIA, element: Avia },
  { path: RouteNames.INFO, element: Info },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.USER, element: User },
];
