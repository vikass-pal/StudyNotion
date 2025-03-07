import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValue,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {course, editCourse} = useSelector((state) => state.course);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
      const getCategories = async() => {
        setLoading(true);
        const categories = await fetchCourseCategories();
        if(categories.length > 0) {
          setCourseCategories(categories);
        }
         setLoading(false);
      }

      if(editCourse){
        setValue("courseTitle", course.courseName);
        setValue("courseShortDesc", course.courseDescription);
        setValue("coursePrice", course.price);
        setValue("courseTags", course.tag);
        setValue("courseBenefits", course.whatYouWillLearn);
        setValue("courseCategory", course.categor);
        setValue("courseRequirement", course.instructions);
        setValue("courseImage", course.thumbnail);
        
      }

      const onSubmit = async(data) => {

      }


      getCategories();
    },[])


  return (
    <form 
    onSubmit={handleSubmit(onSubmit)} 
    className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8 '
    >
      <div>
        <label>Course Title <sup>*</sup></label>
        <input 
        id='courseTitle'
        placeholder='Enter Course Title'
        {...register("courseTitle", {required:true})}
        className='w-full' />
        {
          errors.courseTitle && (
            <span>Course Title is Required</span>
          )
        }
      </div>

      <div>
        <label>Course Short Description <sup>*</sup></label>
        <textarea 
        id='courseShortDesc'
        placeholder='Enter Description'
        {...register("courseShortDesc", {required:true})}
        className='min-h-[140px] w-full'
        />
        {
          errors.courseShortDesc && (
            <span>course Description is required</span>
          )
        }

      </div>

      <div>
        <label>Course Price <sup>*</sup></label>
        <input 
        id='coursePrice'
        placeholder='Enter Course Price'
        {...register("coursePrice", {required:true , valueAsNumber:true})}
        className='w-full' />
        {
          errors.coursePrice && (
            <span>Course Price is Required</span>
          )
        }
      </div>

    </form>
  )
}

export default CourseInformationForm