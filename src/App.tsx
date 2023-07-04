import React from "react";
import "./App.css";
import Products from "./componets/products";
import Cart from "./componets/cart";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Products />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
