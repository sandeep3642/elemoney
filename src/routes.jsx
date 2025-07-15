import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./router/privateroute";
import Home from "./pages/Home";
const Layout = lazy(() => import("./Layouts/Layout"));
const SubAdminPage = lazy(() => import("./pages/SubAdmin"));
const FundsPage = lazy(() => import("./pages/Funds"));
const CustomersPage = lazy(() => import("./pages/Customers"));
const PartnersPage = lazy(() => import("./pages/Partners"));
const Login = lazy(() => import("./pages/Login/Login"));
const  CustomerOnboardingStepper =lazy(() => import("./pages/Customers/CustomerOnboardingStepper"));
const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <PrivateRoute element={<Layout />} />,
    children: [
      { path: "dashboard", element: <Home /> }, // ✅ FIX: Provide Dashboard here
      { path: "subadmin", element: <SubAdminPage /> },
      { path: "funds", element: <FundsPage /> },
      { path: "customers", element: <CustomersPage /> },
      { path: "customerOnboarding", element: <CustomerOnboardingStepper /> },
      { path: "partners", element: <PartnersPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" />,
  },
];

export default routes;
