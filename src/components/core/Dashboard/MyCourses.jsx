import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import CourseTable from '../Dashboard/InstructorCourses/CourseTable'
import { useState } from 'react';
import { useEffect } from 'react';
import IconBtn from '../HomePage/common/IconBtn';

const MyCourses = () => {
  const {token , user} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    console.log("User Data:", user);  // ✅ Debugging log
    console.log("User Role:", user?.accountType);
    const fetchCourses = async() => {
      const result = await fetchInstructorCourses(token);
      if(result) {
        setCourses(result);
      }
    }
    fetchCourses(); // Call fetchCourses here

  },[])

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
