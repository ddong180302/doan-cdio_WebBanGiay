import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import ContactPage from "./pages/contact";
import BookPage from "./pages/book";
import Home from "./components/Home";
import Footer from "./components/Footer";
const Layout = () => {
  return (
    <div className="layout-app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>404 Not found!</div>,
      children: [
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book",
          element: <BookPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
