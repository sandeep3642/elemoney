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
    <Suspense fallback={<div>Loading...</div>}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <BrowserRouter basename="/">
        <ScrollToTop />

        <AuthProvider>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element} // ✅ FIX: Use 'element' not 'component'
              >
                {route.children?.map((child, idx) => (
                  <Route key={idx} path={child.path} element={child.element} />
                ))}
              </Route>
            ))}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
