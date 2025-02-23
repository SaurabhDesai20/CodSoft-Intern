"use client";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/app/Firebase_config/Firebase";
import {
  FaBriefcase,
  FaClock,
  FaMoneyBillWave,
  FaListUl,
} from "react-icons/fa";
import Navbar from "../Navbar";
import { auth } from "@/app/Firebase_config/Firebase";
import { onAuthStateChanged } from "firebase/auth";

const Page = () => {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);

  const fetchJobs = async () => {
    const querySnapshot = await getDocs(collection(db, "jobs"));
    const jobList = querySnapshot.docs.map((doc, index) => {
      const data = doc.data();
      return {
        id: doc.id,
        number: index + 1,
        title: data.title,
        description: data.description,
        requirements: data.requirements || "Not specified",
        payment: data.payment || "Negotiable",
        createdAt:
          data.createdAt?.toDate().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) || "Unknown Date",
      };
    });
    setJobs(jobList);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const applyforjob = async (jobId, jobTitle) => {
    if (!user) {
      alert("You need to log in to apply for jobs");
      return;
    }

    try {
      await addDoc(collection(db, "applications"), {
        applicantEmail: user.email,
        jobId: jobId,
        jobTitle: jobTitle,
        appliedAt: serverTimestamp(),
      });

      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Failed to apply. Please try again.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-100 to-purple-200 p-8">
        <h3 className="text-3xl font-bold mb-8 text-blue-700">
          Available Jobs
        </h3>
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-4xl">
          <ul className="space-y-6">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <li
                  key={job.id}
                  className="p-6 border rounded-lg bg-white shadow-md hover:shadow-lg transition"
                >
                  <h4 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                    {job.number}. <FaBriefcase className="mx-2 text-blue-500" />{" "}
                    {job.title}
                  </h4>
                  <p className="text-gray-600 mb-2">{job.description}</p>

                  {/* Job Requirements */}
                  <div className="flex items-start text-gray-600 mb-2">
                    <FaListUl className="mr-2 mt-1 text-green-500" />
                    <p>
                      <span className="font-semibold">Requirements:</span>{" "}
                      {job.requirements}
                    </p>
                  </div>

                  {/* Job Payment */}
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaMoneyBillWave className="mr-2 text-green-500" />
                    <p>
                      <span className="font-semibold">Payment:</span>{" "}
                      {job.payment}
                    </p>
                  </div>

                  {/* Job Posted Date */}
                  <div className="flex items-center text-gray-500 text-sm">
                    <FaClock className="mr-2" /> Posted on {job.createdAt}
                  </div>

                  <button
                    onClick={() => applyforjob(job.id, job.title)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition mt-4"
                  >
                    Apply Now
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-600 text-center">
                No jobs available at the moment.
              </p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Page;
