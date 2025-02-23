import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 flex flex-col items-center justify-center text-white p-6">
      {/* Hero Section */}
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-extrabold leading-tight mb-4">
          Find Your Dream Job Today
        </h1>
        <p className="text-lg text-gray-200 mb-6">
          Connect with top companies and take the next step in your career.
        </p>
        <div className="space-x-4">
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
          <Link
            href="/jobs"
            className="border border-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-white hover:text-blue-600 transition"
          >
            Browse Jobs
          </Link>
        </div>
      </div>

      {/* Authentication Section */}
      <div className="mt-12 w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Us Today</h2>
        <p className="text-gray-600 mb-6">
          Sign up to start your journey or log in to access your account.
        </p>
        <div className="flex flex-col space-y-4">
          <Link
            href="/Authentication/Signup"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
          >
            <button>SignUp</button>
          </Link>
          <Link
            href="/Authentication/Login"
            className="w-full border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:text-white transition"
          >
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
