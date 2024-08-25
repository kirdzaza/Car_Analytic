import React from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import Highlighted from "./Highlighted.jsx";
import Dashboard from "./Dashboard.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/car_analytic/",
    element: <Dashboard />,
  },
  {
    path: "/car_analytic/highlighted",
    element: <Highlighted />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
