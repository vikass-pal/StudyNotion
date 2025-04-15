import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useParams, useNavigate } from 'react-router-dom'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI'
import GetAvgRating from '../utils/avgRating'
import Error from './Error'
import ConfirmationModal from '../components/core/HomePage/common/ConfirmationModal'
import RatingStars from '../components/core/HomePage/common/RatingStars'


import { useState } from 'react'
import { formatDate } from '../utils/formatDate'

import CourseDetailsCard from '../components/core/Course/CourseDetailsCard'
import CourseAccordionBar from '../../src/components/core/Course/CourseAccordionBar'

import { GiReturnArrow } from 'react-icons/gi'
import { MdOutlineVerified } from 'react-icons/md'
import Img from './../components/common/Img';
import toast from "react-hot-toast"



const CourseDetails = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const {loading} = useSelector((state) => state.profile);
      const [confirmationModal, setConfirmationModal] = useState(false);
      const {paymentLoading} = useSelector((state) => state.course);
      const {user} = useSelector((state) => state.profile);
      const {token} = useSelector((state) => state.auth);
      const {courseId} = useParams();

      const [courseData, setCourseData] = useState(null); 

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


      const [isActive, setIsActive] = useState(Array(0))

      const handleActive = (id) => {
        setIsActive(
          !isActive.includes(id) ? isActive.concat(id)
          : isActive.filter((e) => e != id)
        )
         

      }


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
    <div className='flex flex-col  text-richblack-5'>
        <div className='relative flex flex-col justify-start p-10'>
        <p>{courseName}</p>
          <p>{courseDescription}</p>
        <div className='flex gap-x-2'>
          <span>{avgReviewCount}</span>
          <RatingStars Review_Count= {avgReviewCount} Star_Size={24} />
          <span>{`(${ratingAndReviews.length} reviews)`}</span>
          <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
        </div>
        <div>
          <p>Created By {`${instructor.firstName}`}</p>
        </div>

        <div className='flex gap-x-3'>
          <p>Created At: {formatDate(createdAt)}</p>
          <p>Language:{" "} English</p>
        </div>
        <div>
          <CourseDetailsCard 
          course = {courseData?.data?.courseDetails}
          setConfirmationModal = {setConfirmationModal}
          handleBuyCourse = {handleBuyCourse}

          />
        </div>

        </div>
        <div>
          <p>What You Will Learn</p>

          <div>
            {whatYouWillLearn}
          </div>
        </div>
        <div>
          <div>
            <p>Course Content :</p>

          </div>
          <div className='flex gap-x-3 justify-between'>
           <div>
           <span>{courseContent.length} section(s)</span>
           
          <span> {totalNoOfLectures}</span>
          <span>
            {courseData.data?.totalDuration} Total length
          </span>
           </div>
           <div>
            <button onClick={() => setIsActive([])}>
              Collapse all sections
            </button>
           </div>
         
         </div>

        {/* Course Details Accordion - section Subsection */}
                    <div className="py-4 ">
                      {courseContent?.map((course, index) => (
                        <CourseAccordionBar
                          course={course}
                          key={index}
                          isActive={isActive}
                          handleActive={handleActive}
                        />
                      ))}
                    </div>

          {/* Author Details */}
                     <div className="mb-12 py-4">
                       <p className="text-[28px] font-semibold">Author</p>
                       <div className="flex items-center gap-4 py-4">
                         <Img
                           src={instructor.image}
                           alt="Author"
                           className="h-14 w-14 rounded-full object-cover"
                         />
                         <div>
                           <p className="text-lg capitalize flex items-center gap-2 font-semibold">{`${instructor.firstName} ${instructor.lastName}`}
                             <span><MdOutlineVerified className='w-5 h-5 text-[#00BFFF]' /></span>
                           </p>
                           <p className="text-richblack-50">{instructor?.additionalDetails?.about}</p>
                         </div>
                       </div>
                     </div>
          </div>
          

          

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default CourseDetails