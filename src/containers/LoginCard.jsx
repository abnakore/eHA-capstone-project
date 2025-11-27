import React, { useState, useEffect } from "react";

import "./loginCard.css";

import { useUser } from "../contexts/userContext";
import Input from "../components/Input";
import Button from "../components/Button";
import { loadData, logIn } from "../data/data";
import { Link, useNavigate } from "react-router-dom";
import { sha256 } from "js-sha256";

function LoginCard() {
  // use navigate for redirection
  const navigate = useNavigate();

  // get setLoggedInUser from context
  const { setLoggedInUser } = useUser();

  // State hooks for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Check if email and password are not empty and are valid
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate on input change
  // use debounce to delay validation until user stops typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (Object.keys(errors).length > 0) setErrors(validateForm());
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  // Handle login logic here
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    // Proceed with login logic (e.g., API call)
    // const usersData = (await loadData("users")) || [];

    // const existingUser = usersData.find(
    //   (user) =>
    //     user.email === formData.email &&
    //     user.password === sha256(formData.password)
    // );

    // if (!existingUser) {
    //   setErrors({ form: "Invalid email or password." });
    //   return;
    // }

    try {
      const existingUser = await logIn(formData.email, formData.password);

      // On successful login
      setLoggedInUser(existingUser.email);

      // Clear form fields and errors on successful validation
      setFormData({ email: "", password: "" });

      // Redirect
      navigate("/dashboard");
    } catch (error) {
      setErrors({ form: error.message });
    }
  };

  return (
    <div className="login-card">
      <div className="login-header">
        <p className="subtitle">Welcome Back</p>
        <h1 className="logo-title">My Health Hub</h1>
        <p className="subtitle">
          Securely log in to your personal health records.
        </p>
      </div>

      {/* Display a general form error */}
      {errors.form && <p className="form-error">{errors.form}</p>}

      <form className="login-form" onSubmit={handleSubmit}>
        <Input
          title="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          value={formData.email}
          handleChange={handleChange}
          error={errors.email}
        />
        <Input
          title="Password"
          type="password"
          name="password"
          placeholder="*********"
          required
          value={formData.password}
          handleChange={handleChange}
          error={errors.password}
        />
        <Button title="Login" type="submit" theme="btn-primary" />
      </form>

      <p className="links">
        <a href="#" className="link-forgot">
          Forgot Password?
        </a>
        <span className="separator"> | </span>
        <Link to="/signup" className="link-signup">
          New User? Sign Up
        </Link>
      </p>
    </div>
  );
}

export default LoginCard;
