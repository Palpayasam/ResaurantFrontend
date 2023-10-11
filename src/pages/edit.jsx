import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
const Edit = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [editItemIndex, setEditItemIndex] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/home/products');
        setMenuItems(response.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchAllProducts();
  }, []);

  const handleAddItem = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/home/products/add', {
        name: itemName,
        price: itemPrice,
        desc: itemDescription,
      });
      console.log('Successfully added new product');
      setItemName('');
      setItemPrice('');
      setItemDescription('');
      window.location.href = "/admin/edit";
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleEdit = (index) => {
    setEditItemIndex(index);
  };

  const handleEditSubmit = async (event, itemID) => {
    event.preventDefault();
    try {
      // Update item logic here using the index 'i'
      await axios.post('http://localhost:5000/home/products/edit', {
        id:itemID,
        name: itemName,
        price: itemPrice,
        desc: itemDescription,
      });
      console.log('Successfully updated new product');
      setItemName('');
      setItemPrice('');
      setItemDescription('');
      console.log('Item updated successfully');
      setEditItemIndex(null);
      window.location.href = "/admin/edit";
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.post('http://localhost:5000/home/products/delete', {
        id: productId,
      });
      console.log('Product Successfully deleted');
      const response = await axios.get('http://localhost:5000/home/products');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };


  return (
    <div className="bg-dark text-white mb-3">
      <button className="btn"><Link to="/admin/reports">View Reports</Link></button>
      <h1>Edit Menu</h1>
      <form onSubmit={handleAddItem}>
        <div className="container mt-5">
          <h2>Add Item</h2>
          <div className="row">
            <div className="col-sm-3">
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Item Name</InputGroup.Text>
                <FormControl
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
            </div>
            <div className="col-sm-3">
              <InputGroup className="mb-3">
                <InputGroup.Text>&#8377;</InputGroup.Text>
                <Form.Control
                  type="number"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                  aria-label="Amount (to the nearest dollar)"
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
            </div>
          </div>
          <div className="col-sm-6">
            <InputGroup>
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                as="textarea"
                aria-label="With textarea"
              />
            </InputGroup>
          </div>
          <button className="btn mt-3" type="submit">
            Add new item
          </button>
        </div>
      </form>
      <div className="products">
        {menuItems.map((item, index) => (
          <div className="container product-item" key={item.name}>
            <h2>{item.name}</h2>
            <span>{item.cost}</span>
            <p>{item.desc}</p>
            <div>
              <button onClick={() => handleEdit(index)}>Edit</button>
              {editItemIndex === index && (
                <form onSubmit={(e) => handleEditSubmit(e, item._id)}>
                <div className="container mt-5">
                  <h2>Add Item</h2>
                  <div className="row">
                    <div className="col-sm-3">
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Item Name</InputGroup.Text>
                        <FormControl
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                        />
                      </InputGroup>
                    </div>
                    <div className="col-sm-3">
                      <InputGroup className="mb-3">
                        <InputGroup.Text>&#8377;</InputGroup.Text>
                        <Form.Control
                          type="number"
                          value={itemPrice}
                          onChange={(e) => setItemPrice(e.target.value)}
                          aria-label="Amount (to the nearest dollar)"
                        />
                        <InputGroup.Text>.00</InputGroup.Text>
                      </InputGroup>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <InputGroup>
                      <InputGroup.Text>Description</InputGroup.Text>
                      <Form.Control
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        as="textarea"
                        aria-label="With textarea"
                      />
                    </InputGroup>
                  </div>
                  <button className="btn mt-3" type="submit">
                    Update Item
                  </button>
                </div>
              </form>
              )}
            </div>
            <span>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Edit;