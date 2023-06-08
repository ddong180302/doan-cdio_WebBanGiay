import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import ContactPage from "./pages/contact";
import CategoryPage from "./pages/category";
import Home from "./components/Home";
import Footer from "./components/Footer";
import RegisterPage from "./pages/register";
import "./styles/reset.scss";
import { callFetchAccount } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import AdminPage from "./pages/admin";
import ProtectedRoute from "./components/ProtectedRoute";
import StaffPage from "./pages/staff";
import LayoutAdmin from "./components/Admin/LayoutAdmin";
import LayoutStaff from "./components/Staff/LayoutStaff";
import ProtectedRouteStaff from "./components/ProtectedRoute/ProtectedRouteStaff";
import ProductPage from "./pages/product";
import OrderPage from "./pages/order";
import LayoutUser from "./components/User/LayoutUser";
import ProductDetail from "./pages/product_detail";
import "./styles/global.scss";

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
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const getAccount = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return;
    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "product/:slug",
          element: <ProductDetail />,
        },
      ],
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "user",
          element: <ContactPage />,
        },
        {
          path: "category",
          element: <CategoryPage />,
        },
        {
          path: "product",
          element: <ProductPage />,
        },
        ,
        {
          path: "order",
          element: <OrderPage />,
        },
      ],
    },
    {
      path: "/staff",
      element: <LayoutStaff />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRouteStaff>
              <StaffPage />
            </ProtectedRouteStaff>
          ),
        },
        {
          path: "category",
          element: <CategoryPage />,
        },
      ],
    },
    {
      path: "/user",
      element: <LayoutUser />,
      errorElement: <NotFound />,
      // children: [
      //   {
      //     index: true,
      //     element: (
      //       <ProtectedRouteStaff>
      //         <StaffPage />
      //       </ProtectedRouteStaff>
      //     ),
      //   },
      // ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      {isAuthenticated === true ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  );
}
