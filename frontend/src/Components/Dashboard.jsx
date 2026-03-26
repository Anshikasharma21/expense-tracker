import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  useEffect(() => {
    if (email) {
      localStorage.setItem("email", email);
    }
  }, [email]);

  // Navigation handlers
  const handleAddExpense = () => {
    navigate("/addexpense"); 
  };

  const handleViewExpenses = () => {
    navigate("/expenselist");
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/login"); 
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Welcome to Expense Tracker</h2>
        <p>
          Track and manage your expenses effectively. Use the options below to
          add new expenses or view your expense list.
        </p>

        <button onClick={handleAddExpense}>Add Expense</button>
        <button onClick={handleViewExpenses}>View Expense List</button>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;