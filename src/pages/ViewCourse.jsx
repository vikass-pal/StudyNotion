import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {Outlet, useParams} from 'react-router-dom'
import {getFullDetailsOfCourse} from '../services/operations/courseDetailsAPI'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"
import {useEffect} from "react"

const ViewCourse = () => {
const [reviewModal, setReviewModal] = useState(false)
const {courseId} = useParams()
const {token} = useSelector((state) => state.auth);
const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async() => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completed)); 

      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSectionlength
      })
      dispatch(setTotalNoOfLectures(lectures));
    }
    setCourseSpecificDetails();
  },[]);
 

  return (
    <>
    <div>
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div>
            <Outlet />
        </div>
    </div>
    {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal}/>)}
    </>
  )
}

export default ViewCourse