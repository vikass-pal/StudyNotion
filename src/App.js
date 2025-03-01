import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"; // Import the Login component
import Signup from "./pages/Signup"; // Import the Signup component
import Navbar from "./components/core/HomePage/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";

const App = () => {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} /> 
        <Route path="/signup" element={<Signup/>} /> 
        <Route path="forgot-password" element={<ForgotPassword/>}/>
        <Route path="update-password/:token" element={<UpdatePassword/>}/>
        <Route path="verify-email" element={<VerifyEmail/>}/>
        
        <Route path="dashboard/my-profile" element={<MyProfile />} />
        <Route path="about" element={<About/>}/>
      </Routes>
    </div>
  )
};

export default App;
