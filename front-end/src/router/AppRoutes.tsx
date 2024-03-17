import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element}>
              {route.children &&
                route.children.map((child) => (
                  <Route
                    key={child.path}
                    path={child.path}
                    element={child.element}
                  />
                ))}
            </Route>
          ))}
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}
