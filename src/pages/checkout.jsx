import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const currentTableNumber = location.pathname.split("/")[2];
  const [orderItems, setOrderItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/home/table/${currentTableNumber}/checkout`);
        console.log("API Response:", response.data);
        setOrderItems(response.data);

        const costSum = response.data.reduce((sum, item) => sum + parseFloat(item[2]), 0);
        setTotalCost(costSum);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.error("Error:", error.response.data);
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchAllOrders();
  }, [currentTableNumber]);

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_LgplK83rc3WOtS",
      amount: data.amount,
      currency: data.currency,
      name: "bill",
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:5000/home/payment/verify";
          const {data} = await axios.post(verifyUrl, response);
          console.log(data);
          window.location.href = "/";
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#2a2b38",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  
  

  const handleSettle = async () => {
    try {
      const orderUrl = "http://localhost:5000/home/payment/orders";
      const {data} = await axios.post(orderUrl, { amount: totalCost });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <h1>Bill</h1>
      <div className="bg-dark text-white container product-item">
        {Array.isArray(orderItems) && orderItems.length > 0 ? (
          orderItems.map((item, index) => (
            <div className="container product-item" key={index}>
              <h2>{item[0]}</h2>
              <span>Quantity: {item[1]}</span>
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
