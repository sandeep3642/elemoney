import React, { lazy } from "react";
import PrivateRoute from "./router/privateroute";

const Layout = lazy(() => import("./Layouts/Layout"));
const Login = lazy(() => import("./pages/Login/Login"));

const routes = [
    {
        path: "/dashboard",
        component: <PrivateRoute element={<Layout />} />, // Protect this route
    },
    {
        path: "/",
        component: <Login />,
    }
];

export default routes;