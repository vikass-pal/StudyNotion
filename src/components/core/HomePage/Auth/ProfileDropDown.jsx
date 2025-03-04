import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { AiOutlineCaretDown } from "react-icons/ai";
import Img from '../../../common/Img'
import { VscSignOut } from "react-icons/vsc";
import { useState } from 'react';
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
import { Link } from 'react-router-dom';


import { VscDashboard } from 'react-icons/vsc'

import { logout } from '../../../../services/operations/authAPI';

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile);
  console.log("User object:", user); 


  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false))

  if (!user) {

    console.log("User is not logged in."); // Debugging line to check if user is null
    return null;
  }



  return (
    <button className="relative hidden sm:flex" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <Img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className={'aspect-square w-[30px] rounded-full object-cover'}
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}

export default ProfileDropDown
