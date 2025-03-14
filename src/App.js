import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"; // Import the Login component
import Signup from "./pages/Signup"; // Import the Signup component
import Navbar from "./components/core/HomePage/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import OpenRoute from "./components/core/Auth/OpenRoute"; // Import OpenRoute component
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/index"
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse";


const App = () => {

  const { user } = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <OpenRoute>
            <Home />
          </OpenRoute>
        } />
        <Route path="/login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        } /> 
        <Route path="/signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } /> 
        <Route path="forgot-password" element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        } />
        <Route path="update-password/:token" element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        } />
        <Route path="verify-email" element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        } />
        
        <Route path="about" element={
          <OpenRoute>
            <About />
          </OpenRoute>
        } />
        <Route 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />}  />
       


          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                 <Route path="dashboard/cart" element={<Cart />}  />
                 <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>} />
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/add-course" element={<AddCourse />} />
              </>
            )
          }

          
         
          {/* <Route path="dashboard/settings" element={< Setting/>} /> */}

        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;



