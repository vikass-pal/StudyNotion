import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../HomePage/common/IconBtn";


const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="text-richblack-5 flex flex-col items-center p-6 w-[1200px] ">
      {/* Profile Header */}
      <h1 className="text-3xl font-semibold flex items-center justify-center">
        My Profile
      </h1>

      {/* Section 1 - User Info */}
      <div className="bg-richblack-800 p-6 rounded-lg  shadow-lg w-full max-w-2xl mt-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <p className="text-xl font-semibold">{user?.firstName + " " + user?.lastName}</p>
         
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
          
        </div>

        <IconBtn
        
          text={"Edit"}
          onClick={() => navigate("/dashboard/settings")}
          className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600"
          
        />
      </div>

      {/* Section 2 - About */}
      <div className="bg-richblack-800 p-6 rounded-lg shadow-lg w-full max-w-2xl mt-6">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">About</p>
          <IconBtn
            text={"Edit"}
            onClick={() => navigate("/dashboard/settings")}
            className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600"
          />
        </div>
        <p className="mt-3 text-richblack-300">
          {user?.additionalDetails?.about ?? "Write something about yourself"}
        </p>
      </div>

      {/* Section 3 - Personal Details */}
      <div className="bg-richblack-800 p-6 rounded-lg shadow-lg w-full max-w-2xl mt-6">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">Personal Details</p>
          <IconBtn
            text={"Edit"}
            onClick={() => navigate("/dashboard/settings")}
            className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-richblack-300">First Name</p>

            <p className="font-medium">{user?.firstName}</p>
            
          </div>
          <div>
            <p className="text-richblack-300">Last Name</p>
            <p className="font-medium">{user?.lastName}</p>
          </div>
          <div>
            <p className="text-richblack-300">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-richblack-300">Phone Number</p>
            <p className="font-medium">
              {user?.additionalDetails?.contactNumber ?? "Add contact Number"}
            </p>
          </div>
          <div>
            <p className="text-richblack-300">Gender</p>
            <p className="font-medium">
              {user?.additionalDetails?.gender ?? "Add your gender"}
            </p>
          </div>
          <div>
            <p className="text-richblack-300">Date of Birth</p>
            <p className="font-medium">
              {user?.additionalDetails?.dateOfBirth ?? "Add date of Birth"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
