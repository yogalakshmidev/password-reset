import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
 import ResetPasswordinEmail from "./pages/ResetPasswordinEmail";
import PasswordUpdate from "./pages/PasswordUpdate";


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-passwordusingOtp" element={<ResetPassword />} />
        <Route path="/reset-passwordinEmail" element={<ResetPasswordinEmail />} />
        <Route path="/update-password" element={<PasswordUpdate />} />

      </Routes>
    </div>
  );
};

export default App;
