import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setEditCourse,setCourse } from '../../../../slices/courseSlice'


export default function EditCourse () {
    const dispatch = useDispatch()
    const {coourseId} = useParams();
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const populateCourseDetails = async() => {
        setLoading(true)
        const result = await getFullDetailsOfCourse(coourseId, token)
        if(result?.courseDetails) {
            dispatch(setEditCourse(true));
            dispatch(setCourse(result?.courseDetails))
        }
        setLoading(false)
    }
    populateCourseDetails()
  },[])

    if (loading) {
    return (
        <div>
            Loading...
        </div>
    )
  }
  
    return (
   <div className='text-white'> 
     <h1>Edit Course</h1>
    <div>
        {
           course ? (<RenderSteps />) : (<p>Course Not Found</p>) 
        }
    </div>
   </div>
  )
}

