import React, { useState } from "react";
import api from "../../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../authSlice";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="name"
        placeholder="Enter name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <br />
      <br />
      <label>Email</label>
      <input
        type="email"
        placeholder="Enter email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <br />
      <br />
      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <br />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Submit"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default RegisterForm;
