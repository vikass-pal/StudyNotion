import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {Outlet, useParams} from 'react-router-dom'

const ViewCourse = () => {
const [reviewModal, setReviewModal] = useState(false)
const {courseId} = useParams()
const {token} = useSelector((state) => state.auth);
const diapatch = useDispatch();
 

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