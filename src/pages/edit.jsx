import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
const Edit = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const location = useLocation();
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

  const handleEditSubmit = async (event, i,itemID) => {
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

  const handleChange = (e, i) => {

    setItemName(menuItems[i]?.name || '');
    setItemPrice(menuItems[i]?.price || '');
    setItemDescription(menuItems[i]?.desc || '');
  };

  return (
    <div className="bg-dark text-white mb-3">
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
                <div>
                  <div className="row">
                    <div className="col-sm-3">
                      <InputGroup onChange={(e) => handleChange(e, index)} className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Item Name</InputGroup.Text>
                        <FormControl
                          onChange={(e) => setItemName(e.target.value)}
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                        />
                      </InputGroup>
                    </div>
                    <div className="col-sm-3">
                      <InputGroup onChange={(e) => handleChange(e, index)} className="mb-3">
                        <InputGroup.Text>&#8377;</InputGroup.Text>
                        <Form.Control
                          type="number"
                          onChange={(e) => setItemPrice(e.target.value)}
                          aria-label="Amount (to the nearest dollar)"
                        />
                        <InputGroup.Text>.00</InputGroup.Text>
                      </InputGroup>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <InputGroup onChange={(e) => handleChange(e, index)}>
                      <InputGroup.Text>Description</InputGroup.Text>
                      <Form.Control
                        onChange={(e) => setItemDescription(e.target.value)}
                        as="textarea"
                        aria-label="With textarea"
                      />
                    </InputGroup>
                  </div>
                  <button className="btn mt-3" type="submit" onClick={(e) => handleEditSubmit(e, index, item._id)}>
                    Update item
                  </button>
                </div>
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