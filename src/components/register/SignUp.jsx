import React from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient"; // adjust path if needed

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Function to sign up new user using Supabase
  const signUpNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw error;
    }
    return { success: true, data };
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await signUpNewUser(email, password);
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || "An Error Occurred in Handling Sign Up User");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-gray-100 rounded-xl shadow-lg overflow-hidden">

          {/* Left Side - Image */}
          <div className="hidden md:flex items-center justify-center p-4 bg-gray-200">
            <img
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=60"
              alt="sign up"
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

            <form onSubmit={handleSignUp} className="space-y-4">
              <input
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                value={email}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                value={password}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
              {error && (
                <p className="text-center text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-md px-4 py-3 shadow-md">
                  {error}
                </p>
              )}
            </form>

            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
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
