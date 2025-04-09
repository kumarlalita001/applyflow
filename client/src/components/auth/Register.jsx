import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className=" flex items-center justify-center bg-white">
     <div className=" rounded-lg  w-full max-w-md">
        <form className="space-y-6 ">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1  "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none  focus:ring-1  "
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-bgColor font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
