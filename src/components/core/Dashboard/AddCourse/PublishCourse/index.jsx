import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../HomePage/common/IconBtn';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { useEffect } from 'react';
import { useState } from 'react';
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"

export default function PublishCourse () {
    const {register, handleSubmit, setValue, getValues} = useForm();
    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public",true);
        }
        
    },[]);

    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        // navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async () => {
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true || 
        (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
            // no updation in form
            // no need to make api call
            goToCourses();
            return ;
        }
        // if form is updated

        const formData = new FormData()
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData, token);

        if(result) {
            goToCourses();
        }
        
        setLoading(false);
    }

    const onSubmit = () => {
        handleCoursePublish();
    }
  return (
    <div className='rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 w-[660px] h-[120px] '>
        <p className='text-xl font-bold mb-5'>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='public'>
                <input 
                className='text-richblue-50 bg-richblack-800'
                type='checkbox'
                id='public'
                {...register('public', {required: true})}
                />
               <span className=' text-richblack-100'> Make this course as public</span>
               
                </label>
            </div>

            <div>
            <button 
            
            disabled={loading}
            type='button'
            onClick={goBack}
            className='flex items-center rounded-md bg-richblack-300 py-[8px] px-[12px] font-semibold text-richblack-900 p-6'
            >Back
                
            </button>
            <IconBtn disabled={loading} text='save changes'/>
            </div>
            
        </form>
         
    </div>
  )
}

// export default index