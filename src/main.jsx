import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { AuthContextProvider } from "./components/Auth/UserAuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Card_Page from "./pages/Card_Page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "card/:cardId",
    element: <Card_Page />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
