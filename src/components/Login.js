import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import "../css/Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/login/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("User logged in is: " + data.email);
        localStorage.setItem("token", data.token);
        localStorage.setItem("loggedInUser", data.email);
        toast.success("Login successful! 🎉");
        navigate(`/achievements/${data.email}`);
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to Skill-Lens</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit" className="auth-btn">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
};

export default Login;
