import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {Outlet, useParams} from 'react-router-dom'

const ViewCourse = () => {
const [reviewModal, setReviewModal] = useState(false)
const {courseId} = useParams()
const {token} = useSelector((state) => state.auth);
const diapatch = useDispatch();

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
  },[]);
 

  return (
    <>
    <div>
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div>
            <Outlet />
        </div>
    </div>
    {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}

export default ViewCourse