import React from "react"
import { Link } from "react-router-dom";
import "../styles/button.css";
const Home = () => {
    return (
      <div >
        <div className="bodyDiv " >
            <h1>We Desi Dhaba</h1>
            <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT8PEN-8beUyq-G95GyvIgpql0yQ1nJ6CkYw&usqp=CAU"
            alt="logo"
            className="mx-auto"  // Center the image horizontally
            
            />
            <p>Enter qr code to enter table</p>
        </div>
        <div className="container product-item">
        <button>
          <Link to="table/1">
            <span className="button_top">Table 1</span>
          </Link>
        </button>
        <button>
          <Link to="table/2">
            <span className="button_top">Table 2</span>
          </Link>
        </button>
        <button>
          <Link to="table/3">
            <span className="button_top">Table 3</span>
          </Link>
        </button>
        <button>
          <Link to="table/4">
            <span className="button_top">Table 4</span>
          </Link>
        </button>
        <button>
          <Link to="table/5">
            <span className="button_top">Table 5</span>
          </Link>
        </button>
        <button>
          <Link to="table/6">
            <span className="button_top">Table 6</span>
          </Link>
        </button>
        <button>
          <Link to="table/7">
            <span className="button_top">Table 7</span>
          </Link>
        </button>
        <button>
          <Link to="table/8">
            <span className="button_top">Table 8</span>
          </Link>
        </button>
        <button>
          <Link to="table/9">
            <span className="button_top">Table 9</span>
          </Link>
        </button>
        <button>
          <Link to="table/10">
            <span className="button_top">Table 10</span>
          </Link>
        </button>
        <button>
          <Link to="table/11">
            <span className="button_top">Table 11</span>
          </Link>
        </button>
        <button>
          <Link to="table/12">
            <span className="button_top">Table 12</span>
          </Link>
        </button>
        <button>
          <Link to="table/13">
            <span className="button_top">Table 13</span>
          </Link>
        </button>
        <button>
          <Link to="table/14">
            <span className="button_top">Table 14</span>
          </Link>
        </button>
        <button>
          <Link to="table/15">
            <span className="button_top">Table 15</span>
          </Link>
        </button>
        </div>
      
      <button><Link to ="/admin">Admin</Link></button>
    </div>

  );
};


export default Home