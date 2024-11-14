// src/App.js
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddKategori from "./page/categories/AddKategori";
import Categori from "./page/categories/Categori";
import Dashboard from "./page/Dashboard";
import Login from "./page/login/Login";
import TabelUser from "./page/login/TabelUser";
import Users from "./page/login/User";
import UserDetail from "./page/login/UserDetail";
import UserFilters from "./page/login/UserFilter";
import UserCart from "./page/login/UserCart";
import AddUser from "./page/login/AddUser";
import UserTodos from "./page/login/UserTodos";
import AddProduct from "./page/products/AddProduct";
import Product from "./page/products/Product";
import "./styles/App.css";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<UserCart />}></Route> */}
          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/users/:userId" element={<Sidebar />} />

          {/* <Route path="/" element={<Dashboard />}></Route> */}
          <Route path="/products" element={<Product />}></Route>
          <Route path="/products/add" element={<AddProduct />}></Route>
          <Route path="/products/edit/:id" element={<AddProduct isEdit={true} />} />
          <Route path="/categories" element={<Categori />}></Route>
          <Route path="/categories/add" element={<AddKategori />}></Route>
          <Route path="/categories/edit/:id" element={<AddKategori isEdit={true} />} />
          <Route path="/users" element={<Users />}></Route>
          <Route path="/add-user" element={<AddUser />}></Route>
          <Route path="/users/filter" element={<UserFilters />} />
          <Route path="/userDetail/:id" element={<UserDetail />} />
          <Route path="/cart" element={<UserCart />} />
          <Route path="/todos" element={<UserTodos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
