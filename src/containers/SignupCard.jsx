import React, { useEffect, useState } from "react";

import "./signupCard.css";

import { useUser } from "../contexts/userContext";
import Input from "../components/Input";
import Button from "../components/Button";
import { loadData, saveData } from "../data/data";
import { Link, useNavigate } from "react-router-dom";
import sha256 from "js-sha256";

function SignupCard() {
  // use navigate for redirection
  const navigate = useNavigate();

  // get fetchUser from context
  const { setLoggedInUser } = useUser();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    phoneNumber: "",
    emergencyContact: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // validate on change
  // use debounce to delay validation until user stops typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (Object.keys(errors).length > 0) setErrors(validate());
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  // Validation function
  const validate = () => {
    const newErrors = {};

    // Basic validation rules
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    // Date of birth validation
    if (!formData.dob.trim()) {
      newErrors.dob = "Date of birth is required.";
    } else {
      const dobDate = new Date(formData.dob);
      const today = new Date();
      if (dobDate >= today) {
        newErrors.dob = "Date of birth must be in the past.";
      }
    }

    // Gender validation
    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    }
    // Simple phone number format check (+countrycode-number)
    else if (!/^\+\d{1,3}-\d{4,14}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Phone number format is invalid. Use +countrycode-number.";
    }

    // Emergency contact validation (optional)

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    // Proceed with form submission
    // Append the userdata to the existing users in local storage
    const existingUsers = (await loadData("users")) || [];
    const newUser = { ...formData };

    // Check if email already exists
    const emailExists = existingUsers.some(
      (user) => user.email === newUser.email
    );
    if (emailExists) {
      setErrors({ form: "An account with this email already exists." });
      return;
    }

    // hash password before saving
    newUser.password = sha256(newUser.password);

    // Add new user to existing users array
    existingUsers.push(newUser);

    // Save user data to local storage
    await saveData("users", existingUsers);

    // Set logged in user
    setLoggedInUser(newUser.email);

    // Clear form
    setFormData({
      fullName: "",
      email: "",
      password: "",
    });

    // Redirect
    navigate("/dashboard");
  };

  return (
    <div className="signup-card">
      <div className="signup-header">
        <p className="subtitle">Welcome</p>
        <h1 className="logo-title">My Health Hub</h1>
        <p className="subtitle">
          Securely sign up to access your personal health records.
        </p>
      </div>

      {/* Display a general form error */}
      {errors.form && <p className="form-error">{errors.form}</p>}

      <form className="signup-form" onSubmit={handleSubmit}>
        {/* Display first name input and last name input in one row */}
        <div className="form-row">
          <Input
            title="First Name"
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            required
            value={formData.firstName}
            handleChange={handleChange}
            error={errors.firstName}
          />
          <Input
            title="Last Name"
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            required
            value={formData.lastName}
            handleChange={handleChange}
            error={errors.lastName}
          />
        </div>

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
        {/* !!! Add confirm password input */}
        <div className="form-row">
          <div className={`form-group ${errors.gender ? "has-error" : ""}`}>
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <span className="error-message">{errors.gender}</span>
            )}
          </div>

          <Input
            title="Date of Birth"
            type="date"
            name="dob"
            placeholder="Enter your date of birth"
            required
            value={formData.dob}
            handleChange={handleChange}
            error={errors.dob}
          />
        </div>

        <Input
          title="Phone Number"
          type="tel"
          name="phoneNumber"
          placeholder="+234-1234567890"
          required
          value={formData.phoneNumber}
          handleChange={handleChange}
          error={errors.phoneNumber}
        />

        <Button title="Sign Up" type="submit" theme="btn-primary" />
      </form>

      <p className="links">
        <Link to="/login" className="link-signup">
          Already have an account? Log In
        </Link>
      </p>
    </div>
  );
}

export default SignupCard;
