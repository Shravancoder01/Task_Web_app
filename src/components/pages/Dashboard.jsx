import React, { useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Session:", session);
  }, [session]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Signed In as{" "}
          <span className="font-bold">
            {session?.user?.email || session?.user?.user_metadata?.email || "No user found"}
          </span>
        </p>
        <button
          onClick={handleSignOut}
          className="inline-block px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
