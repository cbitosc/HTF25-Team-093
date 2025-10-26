import React, { useState, FormEvent } from "react";
import axios from "axios";

interface SignupPageProps {
  onNavigateLogin: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigateLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/signup", {
        email,
        password,
      });
      alert(res.data.message);
      onNavigateLogin();
    } catch (error: any) {
      alert(error.response?.data?.message || "Error during signup");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-200 px-4 sm:px-0">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full sm:w-[90%] md:w-[420px] max-w-md text-center">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-green-700">Create your Account</h1>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <button onClick={onNavigateLogin} className="text-green-700 font-medium underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};
