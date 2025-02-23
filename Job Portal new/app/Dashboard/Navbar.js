import React from "react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center text-white">
        <h1 className="text-2xl font-bold">Job Portal</h1>
        <ul className="flex space-x-6">
          <li
            className="cursor-pointer px-3 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => router.push("/Dashboard/JobList")}
          >
            Job List
          </li>
          <li
            className="cursor-pointer px-3 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => router.push("/Dashboard/JobPost")}
          >
            Post a Job
          </li>
          <li
            className="cursor-pointer px-3 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => router.push("/Dashboard/UserProfile")}
          >
            User Profile
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
