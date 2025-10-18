import { ethers } from 'ethers';
import React, { useState } from 'react';

const Buy = ({state}) => {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const {contract} = state;
    const value = {value: ethers.parseEther("0.1")};
    const transaction = await contract.buyChai(formData.name, formData.message, value)
    await transaction.wait();
    console.log("Transaction is done");

    setFormData({ name: '', message: '' });
  
  };

  return (
    <div className="form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your message"
          required
        />

        <button type="submit" disabled={!state.contract}>Pay & Submit</button>
      </form>
    </div>
  );
};

export default Buy;
