import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// ... other imports and code

const Checkout = () => {
    const location = useLocation();
    const currentTableNumber = location.pathname.split("/")[2];
    const [orderItems, setOrderItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0); // State to hold the total cost
  
    useEffect(() => {
        const fetchAllOrders = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/home/table/${currentTableNumber}/checkout`);
            console.log("API Response:", response.data);
            setOrderItems(response.data);
      
            // Calculate the total cost when order items are set or updated
            const costSum = response.data.reduce((sum, item) => sum + parseFloat(item[2]), 0);
            setTotalCost(costSum);
          } catch (error) {
            if (error.response && error.response.status === 400) {
              // Handle specific 400 error (e.g., session not running or no orders placed)
              console.error("Error:", error.response.data);  // Log the error message
            } else {
              // Handle other errors
              console.error("Error fetching data:", error);
            }
          }
        };
      
        fetchAllOrders();
      }, [currentTableNumber]);

    const handleSettle = () => {
        axios.post(`http://localhost:5000/home/table/${currentTableNumber}/checkout`, orderItems)
          .then(response => {
            console.log("Order placed successfully:", response.data);
            window.location.href = "/";
          })
          .catch(error => {
            console.error("Error placing order:", error);
          });
      };
  
    return (
      <div>
        <h1>Bill</h1>
        <div className="bg-dark text-white container product-item">
          {Array.isArray(orderItems) && orderItems.length > 0 ? (
            orderItems.map((item, index) => (
              <div className="container product-item" key={index}>
                <h2>{item[0]}</h2>
                <span>Quantity: {item[1]}       </span>
                <span>Cost: {item[2]}</span>
              </div>
            ))
          ) : (
            <p>No orders available.</p>
          )}
        </div>
        <div className="container">
          <strong>Total Cost:</strong> {totalCost}
        </div>

        <button onClick={handleSettle}>Settle</button>
      </div>
    );
  };
  
  export default Checkout;
  