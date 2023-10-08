import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import axios from "axios";
// import "../styles/buttonStyles.css";
const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});
  const location = useLocation();
  const currentTableNumber = location.pathname.split("/")[2];
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/home/products");
        setMenuItems(response.data);
        const initialQuantities = {};
        response.data.forEach(item => {
          initialQuantities[item.name] = 0;
        });
        setItemQuantities(initialQuantities);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchAllProducts();
  }, []);

  const handleQuantityChange = (itemName, change) => {
    const newQuantity = Math.max(itemQuantities[itemName] + change, 0);
    setItemQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemName]: newQuantity
    }));
  };

  const handleAddToOrder = (itemName) => {
    if (itemQuantities[itemName] > 0) {
      setOrderItems(prevOrderItems => [
        ...prevOrderItems,
        { productName: itemName, quantity: itemQuantities[itemName] }
      ]);
    }
  };

  const handleSubmitOrder = () => {
    axios.post(`http://localhost:5000/home/table/${currentTableNumber}/order`, orderItems)
      .then(response => {
        console.log("Order placed successfully:", response.data);
        window.location.href = `/table/${currentTableNumber}`;
      })
      .catch(error => {
        console.error("Error placing order:", error);
      });
  };

  return (
    <div className="bg-dark text-white ">
      <h1>Menu</h1>
      <div className="products">
        {menuItems.map(item => (
          <div className="container product-item" key={item.name}>
            <h2>{item.name}</h2>
            <span>{item.cost}</span>
            <p>{item.desc}</p>
            <div>
                <div className="button-container">
                    <button onClick={() => handleQuantityChange(item.name, -1)}>-</button>
                    <span>{itemQuantities[item.name]}</span>
                    <button onClick={() => handleQuantityChange(item.name, 1)}>+</button>
                </div>
                <button onClick={() => handleAddToOrder(item.name)}>Add to Order</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSubmitOrder}>Submit Order</button>
      <button><Link to={`/table/${currentTableNumber}/checkout`}>Checkout</Link></button>
    </div>
  );
};

export default Menu;
