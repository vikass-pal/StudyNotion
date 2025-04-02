import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useParams, useNavigate } from 'react-router-dom'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI'
import GetAvgRating from '../utils/avgRating'
// import { toast } from 'react-hot-toast'
// import { setPaymentLoading } from '../slices/courseSlice'
// import { useState } from 'react'

const CourseDetails = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const {loading} = useSelector((state) => state.profile);
      const {paymentLoading} = useSelector((state) => state.course);
      const {user} = useSelector((state) => state.profile);
      const {token} = useSelector((state) => state.auth);
      const {courseId} = useParams();

      const [courseData, setCourseData] = useEffect(null); 

      useEffect(() => {
      const getCourseFullDetails = async () => {
        try{
          const result = await fetchCourseDetails(courseId);
          setCourseData(result);
        }
        catch(error) {
          console.log("could not fetch course details",error)
 
        }
      }
      getCourseFullDetails()
      },[courseId]);

      const [avgReviewCount, setAverageReviewCount] = useState(0);

      useEffect(() => {
        const count = GetAvgRating(courseData?.data?.CourseDetails.ratingAndReviews);
        setAverageReviewCount(count)
      },[courseData]);

      const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
      useEffect(() => {
        let lectures = 0;
        response?.data?.CourseDetails?.courseContent?.forEach((sec) => {
          lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);
      },[courseData]);


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