import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import CourseTable from '../Dashboard/InstructorCourses/CourseTable'
import { useState } from 'react';
import { useEffect } from 'react';
import IconBtn from '../HomePage/common/IconBtn';

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
    // console.log("User Data:", user);  // ✅ Check user details
    // console.log("User Role:", user?.accountType);  // ✅ Check role
  
    useEffect(() => {
        const fetchCourses = async () => {
          setLoading(true);
          const result = await fetchInstructorCourses(token)
          // console.log('Instructors all courses  ', result);
          setLoading(false);
          if (result) {
            setCourses(result)
          }
        }
        fetchCourses()
      }, [])
  

  return (
    <div className='text-white'>
      <div>
        <h1>My Courses</h1>
        <IconBtn 
        text={"Add Course"}
        onClick={() => navigate("/dashboard/add-course")}
        // TODO ADD ICON oF plus here
        />
      </div>

      {courses && <CourseTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}

export default MyCourses
