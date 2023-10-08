import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const Table = () => {
  const location = useLocation();
  const currentTableNumber = location.pathname.split("/")[2];
  const [errorMessage, setErrorMessage] = useState(null);

  const handleOrderClick = () => {
    // Make a GET request to check table activity
    axios.get(`http://localhost:5000/home/table/${currentTableNumber}`)
      .then(response => {
        if (response.data.active) {
          // Table is already active, show an error message
          setErrorMessage("Table session has already started.");
        } else {
          // Table is inactive, send a POST request
          axios.post(`http://localhost:5000/home/table/${currentTableNumber}`)
            .then(response => {
              console.log("Order request successful:", response.data);
              // Navigate to the order URL
              window.location.href = `${currentTableNumber}/menu`;
            })
            .catch(error => {
              console.error("Error making order request:", error);
            });
        }
      })
      .catch(error => {
        console.error("Error checking table activity:", error);
      });
      
  };


//   const handleCheckoutClick = () => {
//     axios.get(`http://localhost:5000/home/table/${currentTableNumber}`)
//       .then(response => {
//         if (!response.data) {
//           setErrorMessage(`Table session inactive.`);;
//         } else {
//           axios.post(`http://localhost:5000/home/table/${currentTableNumber}/checkout`)
//             .then(response => {
//               console.log("Checkout request successful:", response.data);
//               window.location.href = `${currentTableNumber}/checkout`;
//             })
//             .catch(error => {
//               console.error("Error making checkkout request:", error);
//             });
//         }
//       })
//       .catch(error => {
//         console.error("Error checking table activity:", error);
//       });
      
//   };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-dark text-white  ">
      <button onClick={handleOrderClick}>
        <span className="button_top"> Order
        </span>
      </button>
      <button>
        <Link to={`/table/${currentTableNumber}/checkout`}>
            <span className="button_top"> Checkout
            </span>
        </Link>
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Table;
