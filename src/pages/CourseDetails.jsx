import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useParams, useNavigate } from 'react-router-dom'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
// import { toast } from 'react-hot-toast'
// import { setPaymentLoading } from '../slices/courseSlice'
// import { useState } from 'react'

const CourseDetails = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const {user} = useSelector((state) => state.profile);
      const {token} = useSelector((state) => state.auth);
      const {courseId} = useParams();

    const handleBuyCourse = () => {
      
      
     

      if(token) {
        buyCourse(token, [courseId], user, navigate, dispatch);
        return;
      }
    }

  return (
    <div>
        <button className='bg-yellow-50 p-6 mt-10 rounded-md text-black font-bold hover:scale-95 hover:bg-richblack-400 transition-all duration-200'
        onClick={() => handleBuyCourse() }
        >
            Buy Now
        </button>
    </div>
  )
}

export default CourseDetails