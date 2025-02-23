"use client";
import React, { useState } from "react";
import { auth } from "@/app/Firebase_config/Firebase.js";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

const page = () => {
  // States to store email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Hook to redirect user after signup
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password); // Firebase Signup function
      router.push("/Dashboard");
    } catch (error) {
      console.error("Signup Error: ", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={handleSignup} className="mt-6 flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-600 text-center mt-4">
          Already have an account?
          <Link
            href="/Authentication/Login"
            className="text-blue-500 hover:underline ml-1"
          >
            <button>Login</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
