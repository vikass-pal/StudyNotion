import React, { useEffect } from 'react'
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
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

import { addToCart } from '../slices/cartSlice'
import { ACCOUNT_TYPE } from '../utils/constants'



function CourseDetails() {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const {loading} = useSelector((state) => state.profile);
      const [confirmationModal, setConfirmationModal] = useState(false);
      const {paymentLoading} = useSelector((state) => state.course);
      const {user} = useSelector((state) => state.profile);
      const {token} = useSelector((state) => state.auth);
      const {courseId} = useParams();

      const [response, setResponse] = useState(null)

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

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
          toast.error("You are an Instructor. You can't buy a course.")
          return
        }
        if (token) {
          dispatch(addToCart(response?.data.courseDetails))
          return
        }
        setConfirmationModal({
          text1: "You are not logged in!",
          text2: "Please login to add To Cart",
          btn1Text: "Login",
          btn2Text: "Cancel",
          btn1Handler: () => navigate("/login"),
          btn2Handler: () => setConfirmationModal(null),
        })
      }

  return (
    <>
    
    <div className={`relative w-full bg-richblack-800`}>
    {/* Hero Section */}
    <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
      <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-cente py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">

        {/* Go back button */}
        <div className="mb-5 lg:mt-10 lg:mb-0 z-[100]  " onClick={() => navigate(-1)}>
          <GiReturnArrow className="w-10 h-10 text-yellow-100 hover:text-yellow-50 cursor-pointer" />
        </div>

        {/* will appear only for small size */}
        <div className="relative block max-h-[30rem] lg:hidden">
          <Img
            src={thumbnail}
            alt="course thumbnail"
            className="aspect-auto w-full rounded-2xl"
          />
          <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
        </div>

        {/* Course data */}
        <div className={`mb-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}>
          <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">{courseName}</p>
          <p className='text-richblack-200'>{courseDescription}</p>
          <div className="text-md flex flex-wrap items-center gap-2">
            <span className="text-yellow-25">{avgReviewCount}</span>
            <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
            <span>{`(${ratingAndReviews.length} reviews)`}</span>
            <span>{`${studentsEnrolled.length} students enrolled`}</span>
          </div>
          <p className="capitalize "> Created By <span className="font-semibold underline">{instructor.firstName} {instructor.lastName}</span></p>
          <div className="flex flex-wrap gap-5 text-lg">
            <p className="flex items-center gap-2">
              {" "}
              <BiInfoCircle /> Created at {formatDate(createdAt)}
            </p>
            <p className="flex items-center gap-2">{" "} <HiOutlineGlobeAlt /> English</p>
          </div>
        </div>

        {/* will appear only for small size */}
        <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
          <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">Rs. {price}</p>
          <button className="yellowButton" onClick={handleBuyCourse}>Buy Now</button>
          <button onClick={handleAddToCart} className="blackButton">Add to Cart</button>
        </div>
      </div>

      {/* Floating Courses Card */}
      <div className="right-[1.5rem] top-[60px] mx-auto hidden lg:block lg:absolute min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0">
        <CourseDetailsCard
          course={response?.data?.courseDetails}
          setConfirmationModal={setConfirmationModal}
          handleBuyCourse={handleBuyCourse}
        />
      </div>
    </div>
  </div>

       
        <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
          <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
        <div className="my-8 border border-richblack-600 -translate-y-16 bg-richblack-900 mx-auto text-richblack-25 w-full p-8">
        <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="">
              {whatYouWillLearn && (
                whatYouWillLearn.split('\n').map((line, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <p className="font-bold">{index + 1}.</p>
                    <p className="ml-2">{line}</p>
                  </div>
                ))
              )}
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
                     </div>
          </div>
          

          

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </>
   
  )
}

export default CourseDetails