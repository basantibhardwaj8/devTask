import React from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="h-[90%] w-full relative max-w-[300px] bg-gray-200 pt-4 px-5 rounded-sm shadow-md border-2 border-gray-300 ">
        <div className="absolute bottom-8 pr-4">
          <div className="text-start mt-6">
            <h1 className="text-2xl font-semibold">Welcome to Popx</h1>
            <p className="text-gray-500 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <button
              className="w-full bg-[#542dde] hover:bg-[#411ebe] text-white font-semibold py-2 rounded-lg cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>

            <button
              className="w-full bg-[#b3abc2] hover:bg-[#928e9b] text-black font-semibold py-2 rounded-lg cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Already Registered? Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;