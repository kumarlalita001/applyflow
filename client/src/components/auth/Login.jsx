import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
      email: "",
      password: "",
    });
    const navigate = useNavigate();
  
    const handleInputChange = (e) => {
      setUserData((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      console.log(userData, "userDAta");
      setIsLoading(true);
      try {
        const result = await postData(
          "/api/v0/auth/register",
          JSON.stringify(userData)
        );
        console.log(result, "resultRegister");
        SuccessToast(result.message);
        localStorage.setItem("userData",JSON.stringify(result.data.user));
        localStorage.setItem("applyflowtoken",JSON.stringify(result.data.token));
        navigate("/dashboard");
  
       // console.log(JSON.parse(localStorage.getItem("userData")));
      } catch (error) {
        console.log("Register Error", error);
        console.log("Register Error message", error.message);
        ErrorToast(error.message);
       
      } finally {
        setIsLoading(false);
      }
    };


  return (
    <div className=" flex items-center justify-center bg-white ">
     <div className=" rounded-lg  w-full max-w-md">
        <form onSubmit={handleLogin} className="space-y-6 ">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              required
              name="email"
              value={userData.email}
              onChange={handleInputChange}
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
              required
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none  focus:ring-1  "
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-400 text-white py-3 rounded-lg font-bold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don’t have an account?{' '}
            <Link to="/auth/register" className="text-gray-500 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
       
      </div>
      {
        isLoading && <Loader/>
      }
    </div>
  );
};

export default Login;
