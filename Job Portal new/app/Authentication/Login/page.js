"use client";
import React, { useState } from "react";
import { auth } from "@/app/Firebase_config/Firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
  // States to store email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Hook to redirect user after signup
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password); //  Firebase Login Function
      router.push("/Dashboard");
    } catch (error) {
      console.error("Login Error: ", error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          New here?{" "}
          <Link
            href="/Authentication/Signup"
            className="text-blue-500 hover:underline"
          >
            <button>Signup</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
