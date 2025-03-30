import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import CourseTable from '../Dashboard/InstructorCourses/CourseTable'
import { useState } from 'react';
import { useEffect } from 'react';
import IconBtn from '../HomePage/common/IconBtn';
import { IoMdAdd } from "react-icons/io";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      const result = await fetchInstructorCourses(token)
      setLoading(false)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
  }, [])

  return (
    <div className='text-white mb-10 p-4'>
      <div className='flex justify-between'>
        <h1 className='text-2xl'>My Courses</h1>
       
        <IconBtn
        
        
          text={"Add Course"}
          className="translate-y-28 mb-10"
          onClick={() => {
            console.log("Navigating to Add Course") // Debugging navigation
            navigate("/dashboard/add-course")
            
          }}
          
        >
           <IoMdAdd />
           </IconBtn>
      </div>

      {courses && <CourseTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}

export default MyCourses
