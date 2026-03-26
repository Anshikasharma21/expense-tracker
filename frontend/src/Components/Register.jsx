import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

  function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    fullName: ""
  });

  const [message, setMessage] = useState("");

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
      const res = await axios.post("http://localhost:5000/api/create", form);

      setMessage(res.data.message);

      if (res.data.message === "User registered successfully") {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }

      } catch (err) {
        if (err.response && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Error");
        }
      }
    };

  return (
    <div className="container">
      <div className="card">
        <h1>Registration</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
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

          <button className="register-btn">Register</button>
        </form>

        <p className="signup-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default Register;