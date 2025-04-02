import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useParams, useNavigate } from 'react-router-dom'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI'
import GetAvgRating from '../utils/avgRating'
import Error from '../components/core/Error'
import ConfirmationModal from '../components/core/HomePage/common/ConfirmationModal'
import RatingStars from '../components/core/HomePage/common/RatingStars'
// import { toast } from 'react-hot-toast'
// import { setPaymentLoading } from '../slices/courseSlice'
// import { useState } from 'react'

const CourseDetails = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const {loading} = useSelector((state) => state.profile);
      const [confirmationModal, setConfirmationModal] = useState(false);
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
        const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
        setAverageReviewCount(count)
      },[courseData]);

      const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
      useEffect(() => {
        let lectures = 0;
        courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
          lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);
      },[courseData]);

// TODO update
    const handleBuyCourse = () => { 
      if(token) {
        buyCourse(token, [courseId], user, navigate, dispatch);
        return;
      }
      setConfirmationModal({
        text1:"You are not Logged in",
        text2:"Please Login to purchase the course",
        btn1Text:"Login",
        btn2Text:"Cancel",
        btn1Handler:() => navigate("/login"),
        btn2Handler:() => setConfirmationModal(null),

      })
    }

    if(loading || !courseData) {
      return (
        <div>Loading...</div>
      )
    }
    if(!courseData.success) {
      return (
        <div>
          <Error />
        </div>
      )
    }
    const {
      _id:course_id,
      courseName,
      courseDescription,
      courseContent,
      createdBy,
      ratingAndReviews,
      thumbnail,
      price,
      whatYouWillLearn,
      instructor,
      studentsEnrolled,
      createdAt,

     
    } = courseData.data?.courseDetails;

  return (
    <div className='flex flex-col items-center'>
        <p>{courseName}</p>
        <p>{courseDescription}</p>
       <div>
        <span>{avgReviewCount}</span>
        <RatingStars Review_Count= {avgReviewCount} Star_Size={24} />
        <span>{`(${ratingAndReviews.length} reviews)`}</span>
        <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
       </div>


        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default CourseDetails