"use client";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/Firebase_config/Firebase";
import { FaPlusCircle } from "react-icons/fa";
import Navbar from "../Navbar";

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [payment, setPayment] = useState("");

  const addJob = async () => {
    if (!title || !description || !requirements || !payment) {
      return alert("Please fill out all fields");
    }
    try {
      await addDoc(collection(db, "jobs"), {
        title,
        description,
        requirements,
        payment,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setDescription("");
      setRequirements("");
      setPayment("");
    } catch (error) {
      console.error("Error Adding Job", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-100 to-purple-200 p-6">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg mb-8">
          <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center flex items-center justify-center">
            <FaPlusCircle className="text-blue-600 mr-2" /> Post a Job
          </h3>
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 h-24 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
          <textarea
            placeholder="Job Requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 h-24 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
          <input
            type="text"
            placeholder="Payment (e.g., $500/month)"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
          <button
            onClick={addJob}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold shadow-lg hover:shadow-xl"
          >
            Post Job
          </button>
        </div>
        <h2 className="text-gray-600 text-xl">
          Help others find great opportunities by posting jobs!
        </h2>
      </div>
    </>
  );
};

export default Page;
