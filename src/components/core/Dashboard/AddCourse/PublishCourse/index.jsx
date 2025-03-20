import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../HomePage/common/IconBtn';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { useEffect } from 'react';

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

    const handleCoursePublish = () => {
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true || 
        (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
            // no updation in form
            // no need to make api call
            goToCourses();
            return ;
        }
    }

    const onSubmit = () => {
        handleCoursePublish();
    }
  return (
    <div className='rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 '>
        <p>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='public'>
                <input 
                type='checkbox'
                id='public'
                {...register('public', {required: true})}
                />
               <span> Make this course as public</span>
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