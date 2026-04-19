import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

  function Login() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

    const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const API = import.meta.env.VITE_API_URL;

      const res = await axios.post(`${API}/api/login`, form);

      alert(res.data.message);

      
      navigate("/dashboard", { state: { email: res.data.email || form.username } });

    } catch (err) {
      if (err.response && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Login failed");
      }
    }
  };

  return (
        <div className="container">
          <div className="card">
            <h1>Login Page</h1>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />

              <button className="login-btn">Login</button>
            </form>

            <p className="signup-text">
              New user? <Link to="/register">Register here</Link>
            </p>

            {message && <p className="message">{message}</p>}
          </div>
        </div>
  );
}

export default Login;