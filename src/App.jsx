import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import routes from "./routes";
import AuthProvider from "./hooks/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  }

  return (
    <Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
      <BrowserRouter basename="/">
        <ScrollToTop />

        <AuthProvider>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                exact={route.exact}
                path={route.path}
                element={route.component}
              />
            ))}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
