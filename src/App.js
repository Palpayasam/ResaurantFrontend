import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Admin from "./pages/admin";
import Edit from "./pages/edit";
import Menu from "./pages/menu";
import Table from "./pages/table";
import Checkout from "./pages/checkout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/edit" element={<Edit />} />
          <Route path="/table/:tablenumber/menu" element={<Menu />} />
          <Route path="/table/:tablenumber" element={<Table />} />
          <Route path="/table/:tablenumber/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
