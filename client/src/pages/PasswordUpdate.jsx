import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const PasswordUpdate = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      setResetToken(token);
      console.log("token is", token);
    } else {
      alert("Token Missing or Error in link");
    }
  }, [location.search]);

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    if (password != confirmpassword) {
      alert("Password does not match");
      // toast.error(data.message);
    }
    console.log("both passwords are", password, confirmpassword);

    try {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      console.log("token value is", token);
      const { data } = await axios.post(
        backendUrl + "/api/auth/resetPasswordLink/?",
       {
          token: resetToken,
          password,
        }
      );
      console.log("data value is", { data });

      if (data.success) {
        toast.success(data.message);

        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to bg-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <form
        onSubmit={onSubmitNewPassword}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl fibt-semibold text-center mb-4">
          Update Password
        </h1>

        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
          <img src={assets.lock_icon} alt="" className="w-3 h-3" />
          <input
            type="password"
            placeholder="New Password"
            className="bg-transparent outline-none text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
          <img src={assets.lock_icon} alt="" className="w-3 h-3" />
          <input
            type="password"
            placeholder="Confirm Password"
            className="bg-transparent outline-none text-white"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdate;
