import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateExpense = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const API = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    amount: "",
    date: "",
    description: "",
    category: ""
  });

  useEffect(() => {
    if (location.state?.expense) {
      const expense = location.state.expense;
      setFormData({
        ...expense,
        date: expense.date ? expense.date.substring(0, 10) : ""
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/api/expenses/${formData._id}`, {
        title: formData.title,
        amount: formData.amount,
        date: formData.date,
        description: formData.description,
        category: formData.category
      });

      alert("Expense Updated Successfully");
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Error updating expense");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Update Expense</h2>

        <form onSubmit={handleUpdate}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <button type="submit">Update Expense</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateExpense;