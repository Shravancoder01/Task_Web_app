import React from 'react';

const Signup = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-gray-100 rounded-xl shadow-lg overflow-hidden">

          {/* Left Side - Image */}
          <div className="hidden md:flex items-center justify-center p-4 bg-gray-200">
            <img
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=60"
              alt="sign up image"
              className="w-full h-auto max-h-400px object-center rounded-md"
            />
          </div>

          {/* Right Side - Form */}
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Create Account
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Please fill in the details to register
            </p>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                Sign Up
              </button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-4">
              {" "}Already have an account?{" "}
              <a
                href="/signin"
                className="text-green-600 hover:underline"
              >
                Sign In
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;
