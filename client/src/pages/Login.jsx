import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      // this is used to send the request with cookies also
      axios.defaults.withCredentials = true

      if (state === "Sign Up") {
        // api call to registration api
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        } else {
          toast.error(data.message);
          // alert(data.message)
        }
      } 
      else {
        // api call to login api
        const {data} = await axios.post(backendUrl + '/api/auth/login', {
          email,
          password,
        });
console.log("data entered are",data)
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
          // alert(data.message)
        }
      }

    }
     catch (error) {
      toast.error(error.message);
    }
  }

  const resetInput =()=>{
    setEmail('');
    setPassword('');
    setName('');
    setState("Login")
  }

  return (
    <div  className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from to-blue-200 to bg-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-xl sm:text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account " : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Create Your Account "
            : "Login To Your Accout"}
        </p>
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                className="bg-transparent outline-none"
                type="text"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )}

          <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              className="bg-transparent outline-none"
              type="email"
              placeholder="Email id"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              className="bg-transparent outline-none"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <p          
            
          >Forgot Password ? 
          <p className="flex flex-row justify-between">
          <span className="mb-4  text-indigo-500 cursor-pointer"  onClick={() => navigate("/reset-password")}>  Using Otp
          </span>


          {/* <span
            onClick={() => navigate("/reset-passwordinEmail")}
            className="mb-4  text-indigo-500 cursor-pointer"
          >
              Using Email
          </span> */}
          </p>
          </p>

          <button className=" w-full py-2.5 rounded-full  bg-gradient-to-r from bg-indigo-500 to  bg-indigo-900 text-white font-medium">
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4 ">
            Already have an account?{" "}
            <span
            onClick={()=>resetInput()
              //{ onClick={() => setState("Login")}

              }
              className="texy-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4 ">
            Don't have an account? {"  "}
            <span
              onClick={() => setState("Sign Up")}
              className="texy-blue-400 cursor-pointer underline"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
