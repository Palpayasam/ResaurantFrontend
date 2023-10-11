import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Reports = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [sessionItems, setSessionItems] = useState([]);
    const [daySales, setDaySales] = useState('');
    const [tables, setTables] = useState('');
    const [ordersToday, setOrdersToday] = useState('');
    const [avgBill, setavgBill] = useState('');
    useEffect(() => {
        const fetchAllOrders = async () => {
          try {
            const response = await axios.get("http://localhost:5000/home/reportOrder");
            setOrderItems(response.data);
            const todayOrders=await axios.get("http://localhost:5000/home//dayorders");
              var initialOrders=0
                todayOrders.data.forEach(item => {
                initialOrders++;
                });
                setOrdersToday(initialOrders);  
          } catch (error) {
            console.log("Error fetching data:", error);
          }
        };
    
        fetchAllOrders();

        const fetchAllSessions = async () => {
            try {
              const response = await axios.get("http://localhost:5000/home/sessionReport");
              setSessionItems(response.data);
              const todaySession=await axios.get("http://localhost:5000/home//daysales");
              var initialSales = 0;
              var initialTables = 0;
                todaySession.data.forEach(item => {
                initialSales+=item.totalAmount;
                initialTables++;
                });
                setDaySales(initialSales);  
                setTables(initialTables);  
                setavgBill(initialSales/initialTables);
            } catch (error) {
              console.log("Error fetching data:", error);
            }
          };
      
          fetchAllSessions();
      }, []);

  return (
    <div className='bg-dark text-white mb-3'>
        <h1>Reports</h1>
        <div className='daily-report'>
            <h2>Daily Report</h2>
            <div className='report-figures'>
                <div className='sales'>
                    <h2>Todays sales</h2>
                    <div>
                        {daySales}
                    </div>
                </div>
                <div className='sales'>
                    <h2>Number of tables</h2>
                    <div>
                        {tables}
                    </div>
                </div>
                <div className='sales'>
                    <h2>Number of orders</h2>
                    <div>
                        {ordersToday}
                    </div>
                </div>
                <div className='sales'>
                    <h2>Average Table Bill</h2>
                    <div>
                        {avgBill}
                    </div>
                </div>
            </div>
        </div>
        <div className="report">
            <div className="container order-details">
            <h2>Order History</h2>
            
            <div className="order">
                {orderItems.map((item) => (
                <div className="product-item" key={item._id}>
                    <h4>Order ID: {item._id}</h4>
                    {item.products.map((product, index) => (
                    <div className="container " key={index}>
                        <div className="left-content">
                        <div>Product ID: {product.productId}</div>
                        <div>Quantity: {product.quantity}</div>
                        </div>
                    </div>
                    ))}
                    <div>Amount: {item.amount}</div>
                    <div>Created At: {new Date(item.createdAt).toLocaleString()}</div>
                </div>
                ))}
            </div>
            </div>

            <div className="container order-details">
            <h2>Session Hisory</h2>
            
            <div className="order">
                {sessionItems.map((item) => (
                <div className="product-item" key={item._id}>
                    <h4>Session ID: {item._id}</h4>
                    <div>Table: {item.tableNumber}</div>
                    <div>Amount: {item.totalAmount}</div>
                    <div>Status: {item.status}</div>
                    <div>Created At: {new Date(item.createdAt).toLocaleString()}</div>
                </div>
                ))}
            </div>
            </div>
        </div>

    </div>
  );
};

export default Reports;