import React, { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

interface LoginPageProps {
  onLogin: () => void;
  onNavigateSignup: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      alert(res.data.message);
      onLogin();
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-200 px-4 sm:px-0">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full sm:w-[90%] md:w-[420px] max-w-md text-center">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-green-700">Login to AI Student Assistant</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-sm">
          Don't have an account?{" "}
          <button onClick={onNavigateSignup} className="text-green-700 font-medium underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};
