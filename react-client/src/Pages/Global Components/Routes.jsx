import React from "react";
import login_page from "../login_page";
import Home from "../Home";

export const routes = [
  {
    path: "/",
    title: "Home",
    component: <Home />,
  },
  {
    path: "/Login",
    title: "Login",
    component: <login_page/>,
  },
];
