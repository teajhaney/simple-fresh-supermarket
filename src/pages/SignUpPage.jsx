/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  productListVariantsXright,
  productListVariantsXleft,
} from "../constants";
/////
const SignUpPage = () => {
  const navigate = useNavigate();

  // State for form fields and validation errors
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Validation function
  const validateForm = () => {
    let newErrors = { firstName: "", lastName: "", email: "", password: "" };
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear validation error when typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // console.log("Signup successful:", formData);
      navigate("/"); // Redirect to the next page
    }
  };

  return (
    <div className="bodyContent flex justify-center items-center">
      <div className="flex flex-col md:flex-row gap-20 my-24 justify-center items-center">
        <motion.div
                 variants={productListVariantsXleft}
                 initial="hidden"
                 animate="visible"
                 className="w-full bg-amber-700"
                 exit="hidden">
              
                   <img
                     src="https://freshcart77.myshopify.com/cdn/shop/files/signin.png?v=1724218593"
                     alt="Sign up illustration"
                     className="object-cover"
                   />
               
               </motion.div>
        {/* form */}
        <motion.div
          variants={productListVariantsXright}
          initial="hidden"
          animate="visible"
          div
          className="flex flex-col items-center w-full justify-center"
          exit="hidden">
          {/* Form Component */}
          <form
            className="bg-white rounded-lg border-2 border-primary px-8 p-10 w-96 lg:w-full flex flex-col gap-3"
            onSubmit={handleSubmit}>
            <h2 className="text-2xl text-tertiary font-bold mb-4">Register</h2>

            {/* First Name Field */}
            <div className="mb-4">
              <label className="block text-tertiary text-sm font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border border-accent outline-primary rounded py-2 px-3 text-tertiary w-full"
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs italic">
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name Field */}
            <div className="mb-4">
              <label className="block text-tertiary text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border border-accent outline-primary rounded py-2 px-3 text-tertiary w-full"
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs italic">{errors.lastName}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-tertiary text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-accent outline-primary rounded py-2 px-3 text-tertiary w-full"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-tertiary text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-accent outline-primary rounded py-2 px-3 text-tertiary w-full"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                !formData.firstName ||
                !formData.lastName ||
                !formData.email ||
                !formData.password
              }
              className={`bg-primary self-start hover:bg-green-900 text-white font-bold py-2 px-10 rounded ${
                (!formData.firstName ||
                  !formData.lastName ||
                  !formData.email ||
                  !formData.password) &&
                "opacity-50 cursor-not-allowed"
              }`}>
              Sign Up
            </button>

            {/* Login Link */}

            <NavLink to="/sign-in">
              {" "}
              <p className="underline text-secondary place-self-end">Login</p>
            </NavLink>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
