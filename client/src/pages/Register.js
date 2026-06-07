import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../store/authSlice";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(register(form));
    if (!result.error) navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Join TaskFlow</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full p-3 border rounded-lg" required />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full p-3 border rounded-lg" required />
          <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full p-3 border rounded-lg" required />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">Create Account</button>
        </form>
        <p className="text-center mt-4">Have an account? <Link to="/login" className="text-blue-600">Sign in</Link></p>
      </div>
    </div>
  );
}
