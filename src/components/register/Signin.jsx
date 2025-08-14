import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const Signin = () => {
  const navigate = useNavigate();
  const { signInUser } = UserAuth(); // Make sure AuthContext returns both session & signInUser
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlesSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInUser(email, password); // Let it throw on failure
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-gray-100 rounded-xl shadow-lg overflow-hidden">

          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Welcome
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Please sign in to your account
            </p>

            <form onSubmit={handlesSignIn} className="space-y-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                value={email}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                value={password}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
              {error && (
                <p className="text-center text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-md px-4 py-3 shadow-md">
                  {error}
                </p>
              )}
            </form>

            <p className="text-sm text-center text-gray-600 mt-4">
              {" "}Don't have an account?{" "}
              <a
                href="/signup"
                className="text-green-600 hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center p-4 bg-gray-200">
            <img
              src="https://images.unsplash.com/photo-1542435503-956c469947f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzayUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D"
              alt="sign in image"
              className="w-full h-auto max-h-400px object-center rounded-md"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signin;
