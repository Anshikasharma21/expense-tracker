import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    title: "",
    amount: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = localStorage.getItem("email");

    
      await axios.post("http://localhost:5000/api/expenses", {
        ...formData,
        email: email
      });

      alert("Expense Added Successfully");

     
      navigate("/dashboard");

    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Error adding expense");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Add New Expense</h2>

        <form onSubmit={handleSubmit}>
          <label>Expense Name:</label>
          <input type="text" name="title" onChange={handleChange} required />

          <label>Amount:</label>
          <input type="number" name="amount" onChange={handleChange} required />

          <label>Date:</label>
          <input type="date" name="date" onChange={handleChange} required />

          <label>Description:</label>
          <textarea name="description" onChange={handleChange} />

          <button type="submit">Add Expense</button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;