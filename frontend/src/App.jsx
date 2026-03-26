import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Register from "./Components/Register";
import AddExpense from "./Components/AddExpense";
import UpdateExpense from "./Components/UpdateExpense"; 
import ExpenseList from "./Components/ExpenseList";

function App() {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addexpense" element={<AddExpense />} />
        <Route path="/expenselist" element={<ExpenseList />} />

        {}
        <Route path="/updateexpense" element={<UpdateExpense />} />
      </Routes>
    </Router>
  );
}

export default App;