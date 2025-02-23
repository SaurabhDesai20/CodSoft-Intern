"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaBriefcase, FaUserCircle, FaPlusCircle } from "react-icons/fa";
import Navbar from "./Navbar";

const Dashboard = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="flex flex-col items-center p-8">
        <motion.h2
          className="text-5xl font-extrabold text-blue-700 drop-shadow-md"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Job Dashboard
        </motion.h2>

        <motion.p
          className="text-gray-800 text-lg mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Select an option below to get started.
        </motion.p>

        {/* Navigation Buttons */}
        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >

          <motion.div
            className="bg-white shadow-lg p-6 rounded-xl cursor-pointer hover:scale-105 transition-transform flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            onClick={() => router.push("/Dashboard/JobList")}
          >
            <FaBriefcase className="text-blue-600 text-5xl mb-3" />
            <h3 className="text-xl font-bold text-gray-700">View Jobs</h3>
            <p className="text-gray-500">Browse and apply for jobs.</p>
          </motion.div>

          
          <motion.div
            className="bg-white shadow-lg p-6 rounded-xl cursor-pointer hover:scale-105 transition-transform flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            onClick={() => router.push("/Dashboard/UserProfile")}
          >
            <FaUserCircle className="text-purple-600 text-5xl mb-3" />
            <h3 className="text-xl font-bold text-gray-700">My Profile</h3>
            <p className="text-gray-500">Update your profile & resume.</p>
          </motion.div>

          
          <motion.div
            className="bg-white shadow-lg p-6 rounded-xl cursor-pointer hover:scale-105 transition-transform flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            onClick={() => router.push("/Dashboard/JobPost")}
          >
            <FaPlusCircle className="text-green-600 text-5xl mb-3" />
            <h3 className="text-xl font-bold text-gray-700">Post a Job</h3>
            <p className="text-gray-500">Create job listings easily.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
