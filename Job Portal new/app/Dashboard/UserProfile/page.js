"use client";
import { useEffect, useState } from "react";
import { auth, db, storage } from "@/app/Firebase_config/Firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import {
  FaUserCircle,
  FaEnvelope,
  FaBriefcase,
  FaFileUpload,
} from "react-icons/fa";
import Navbar from "../Navbar";

const Page = () => {
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [name, setName] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [resume, setResume] = useState(null);
  const [resumeURL, setResumeURL] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: userSnap.data().name || "",
            photo: currentUser.photoURL || null,
            qualifications: userSnap.data().qualifications || "",
            resumeURL: userSnap.data().resumeURL || "",
          });
        } else {
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName || "",
            photo: currentUser.photoURL || null,
            qualifications: "",
            resumeURL: "",
          });
        }

        fetchAppliedJobs(currentUser.email);
      } else {
        setUser(null);
      }
    });
  }, []);

  const fetchAppliedJobs = async (userEmail) => {
    try {
      const q = query(
        collection(db, "applications"),
        where("applicantEmail", "==", userEmail)
      );
      const querySnapshot = await getDocs(q);

      const jobs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        jobTitle: doc.data().jobTitle,
        appliedAt:
          doc.data().appliedAt?.toDate().toLocaleString() || "Unknown Date",
      }));

      setAppliedJobs(jobs);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  const updateUserProfile = async () => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        { name, qualifications, resumeURL },
        { merge: true }
      );

      await updateProfile(auth.currentUser, { displayName: name });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const uploadResume = async () => {
    if (!resume || !user) return;

    const storageRef = ref(storage, `resumes/${user.uid}`);
    try {
      await uploadBytes(storageRef, resume);
      const downloadURL = await getDownloadURL(storageRef);
      setResumeURL(downloadURL);
      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Failed to upload resume.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-100 to-purple-200 p-8">
        <h3 className="text-3xl font-bold mb-6 text-blue-700">User Profile</h3>

        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
          {/* User Profile Picture */}
          <div className="flex flex-col items-center">
            {user?.photo ? (
              <img
                src={user.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-4 shadow-md"
              />
            ) : (
              <FaUserCircle className="text-gray-400 w-24 h-24 mb-4" />
            )}
            <h4 className="text-2xl font-semibold text-gray-800">{name}</h4>
            <p className="text-gray-600 flex justify-center items-center mt-2">
              <FaEnvelope className="mr-2" /> {user?.email}
            </p>
          </div>

          <hr className="my-6 border-gray-300" />

          {/* Update Name & Qualifications */}
          <div className="text-left">
            <label className="block text-gray-700 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg mb-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />

            <label className="block text-gray-700 font-semibold">
              Qualifications
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg mb-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
              placeholder="Enter your qualifications"
            />
          </div>

          {/* Resume Upload */}
          <label className="block text-gray-700 font-semibold">
            Upload Resume
          </label>
          <input
            type="file"
            className="w-full p-2 border rounded-lg mb-4"
            onChange={(e) => setResume(e.target.files[0])}
          />
          <button
            onClick={uploadResume}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-700 transition mb-4 font-semibold shadow-md"
          >
            <FaFileUpload className="inline-block mr-2" />
            Upload Resume
          </button>

          {resumeURL && (
            <p className="text-blue-500 text-center">
              <a href={resumeURL} target="_blank" rel="noopener noreferrer">
                View Uploaded Resume
              </a>
            </p>
          )}

          {/* Update Profile Button */}
          <button
            onClick={updateUserProfile}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold shadow-md"
          >
            Update Profile
          </button>

          <hr className="my-6 border-gray-300" />

          {/* Applied Jobs */}
          <h4 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Applied Jobs
          </h4>
          {appliedJobs.length > 0 ? (
            <ul className="text-left">
              {appliedJobs.map((job) => (
                <li
                  key={job.id}
                  className="p-4 bg-gray-100 rounded-lg shadow-md mb-2">
                  <p className="text-lg font-semibold flex items-center">
                    <FaBriefcase className="mr-2 text-blue-500" />{" "}
                    {job.jobTitle}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Applied on {job.appliedAt}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">
              No job applications found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
