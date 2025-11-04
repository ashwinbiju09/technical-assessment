import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle login/signup

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(""); // For login failure

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setLoginError("");
  };

  // Validate signup form only
  const validateSignup = () => {
    const newErrors = {};

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_URL = "http://localhost:5000/api/auth";

    if (isLogin) {
      try {
        const res = await axios.post(`${API_URL}/login`, {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", res.data.token);
        setFormData({ email: "", password: "", confirmPassword: "" });
        navigate("/dashboard");
      } catch (err) {
        setLoginError(
          err.response?.data?.msg || "Invalid credentials. Please try again."
        );
      }
    } else {
      if (validateSignup()) {
        try {
          const res = await axios.post(`${API_URL}/signup`, {
            email: formData.email,
            password: formData.password,
          });
          alert(`Registered successfully with email: ${formData.email}`);
          setFormData({ email: "", password: "", confirmPassword: "" });
          setIsLogin(true);
        } catch (err) {
          alert(
            err.response?.data?.msg || "Registration failed. Please try again."
          );
          console.log("Signup error:", err);
        }
      }
    }
  };

  // Switch between login and signup
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", confirmPassword: "" }); // clear form
    setErrors({});
    setLoginError("");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Sign in to your account" : "Create a new account"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
              placeholder="••••••••"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                placeholder="••••••••"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {isLogin && loginError && (
            <p className="text-red-500 text-center">{loginError}</p>
          )}

          <button
            type="submit"
            className="w-full text-white bg-blue-800 hover:bg-blue-700 rounded-md text-sm px-5 py-2.5"
          >
            {isLogin ? "Sign in" : "Sign up"}
          </button>
        </form>

        <p className="text-sm font-light text-center text-gray-500 mt-4">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="font-medium text-blue-600 hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
