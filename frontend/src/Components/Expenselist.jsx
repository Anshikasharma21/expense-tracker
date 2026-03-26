import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const email = localStorage.getItem("email"); // fetch expenses for logged-in user
      const res = await axios.get(`http://localhost:5000/api/expenses/${email}`);
      setExpenses(res.data.expenses);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (expense) => {
    // Redirect to UpdateExpense page with the clicked expense data via state
    navigate("/updateexpense", { state: { expense } });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>All Expense List</h2>

        {expenses.length === 0 ? (
          <p>No expenses found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp, index) => (
                <tr key={index}>
                  <td>{exp.title}</td>
                  <td>{exp.amount}</td>
                  <td>{exp.date?.substring(0, 10)}</td>
                  <td>
                    <button onClick={() => handleUpdate(exp)}>Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;