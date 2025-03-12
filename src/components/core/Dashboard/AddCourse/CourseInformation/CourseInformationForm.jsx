import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { useSelector } from 'react-redux';
import { addCourseDetails, fetchCourseCategories, editCourseDetails } from '../../../../../services/operations/courseDetailsAPI'
import IconBtn from '../../../HomePage/common/IconBtn';
import { MdNavigateNext } from "react-icons/md"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import ChipInput from './ChipInput';
import Upload from '../Upload';

import RequirementField from './RequirementField';

const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
       
        getValues,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth)
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
        setValue("courseCategory", course.category);
        setValue("courseRequirement", course.instructions);
        setValue("courseImage", course.thumbnail);
        
      }

      


      getCategories();
    },[])

    const isFormUpdated = () => {
      const currentValues = getValues();
      if (
        currentValues.courseTitle !== course.courseName ||
        currentValues.courseShortDesc !== course.courseDescription ||
        currentValues.coursePrice !== course.price ||
        currentValues.courseTags.toString() !== course.tag.toString() ||
        currentValues.courseBenefits !== course.whatYouWillLearn ||
        currentValues.courseCategory._id !== course.category._id ||
        currentValues.courseRequirements.toString() !== course.instructions.toString() ||
        currentValues.courseImage !== course.thumbnail) {
        return true
      }
      return false;
    }

    const onSubmit = async(data) => {
      
      if(editCourse) {
       if(isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        
        if(currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if(currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if(currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if(currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if(currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        // if(currentValues.courseTitle !== course.courseName) {
        //   formData.append("courseName", data.courseTitle);
        // }
        if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions",JSON.stringify(data.courseRequirements));
        }
          setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result));
        }
       }
       return ;

      }
     
      // create a new Course
      const formData = new FormData();
      formData.append("courseName", data.courseTitle);
      formData.append("courseDescription", data.courseShortDesc);
      formData.append("price", data.coursePrice);
      formData.append("tag", JSON.stringify(data.courseTags))
      formData.append("whatYouWillLearn", data.courseBenefits);
      formData.append("category", data.courseCategory);
      formData.append("instructions", JSON.stringify(data.courseRequirements));
      // formData.append("courseName", data.courseTitle);
      // formData.append("courseName", data.courseTitle);
      formData.append("status", COURSE_STATUS.DRAFT);
      formData.append("thumbnailImage", data.courseImage)

      setLoading(true);
      const result = await addCourseDetails(formData, token);
      if(result) {
        setStep(2)
        dispatch(setCourse(result));
      }
      setLoading(false);
    }


  return (
    <form 
    onSubmit={handleSubmit(onSubmit)} 
    className='rounded-md bg-richblack-800 w-[660px] pt-4 text-sm  -translate-y-6'
    >
      <div className='  items-center justify-center m-5'>
        <label htmlFor='courseTitle'>Course Title <sup className=''>*</sup></label> {/* Required field for course title */}

        <input 
        id='courseTitle'
        placeholder='Enter Course Title'
        {...register("courseTitle", {required:true})}
        className='w-full bg-richblack-700 rounded-lg  p-3 ' />
        {
          errors.courseTitle && (
            <span>Course Title is Required</span>
          )
        }
      </div>

      <div className='m-5'>
        <label htmlFor='courseShortDesc'>Course Short Description <sup>*</sup></label> {/* Required field for short description */}

        <textarea  

        id='courseShortDesc'
        placeholder='Enter Description'
        {...register("courseShortDesc", {required:true})}
        className='min-h-[140px] w-full bg-richblack-700 rounded-lg p-4'
        />
        {
          errors.courseShortDesc && (
            <span>course Description is required</span>
          )
        }

      </div>

      <div className='relative m-5'>
        <label htmlFor='coursePrice'>Course Price <sup>*</sup></label> {/* Required field for course price */}

        <input 
        id='coursePrice'
        placeholder='Enter Course Price'
        {...register("coursePrice", {required:true , valueAsNumber:true})}
        className='w-full bg-richblack-700 rounded-lg  p-3 px-8 ' />
        <HiOutlineCurrencyRupee className='absolute top-1/2 text-white text-[25px] ml-1' />
        {
          errors.coursePrice && (
            <span>Course Price is Required</span>
          )
        }
      </div>
          <div className='flex flex-col m-5 '>
        <label htmlFor='courseCategory'>Course Category</label> {/* Optional field for selecting course category */}

            <select 
            id='courseCategory'
            className='bg-richblack-700 rounded-lg p-3'
            defaultValue=""
            {...register("courseCategory", {required:true})}
            >
              <option value="" disabled>Choose a Category</option>
              {
                !loading && courseCategories.map((category,index) => (
                  <option key={index}  value={category?._id}>
                    {category?.name}
                  </option>
                ))
              }

            </select>
            {
          errors.courseCategories && (
            <span>Course Category is Required</span>
          )
        }
            
          </div>

          {/* create a custom component for handling tags input */}
           <ChipInput
                  label="Tags"
                  name="courseTags"
                  placeholder="Enter Tags and press Enter or Comma"
                  register={register}
                  errors={errors}
                  setValue={setValue}
                />

        {/* create a component for uploading and showing preview of media */}
         {/* Course Thumbnail Image */}
              <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
              />

        <div className='m-5'>
        <label>Benefits of the Course<sup>*</sup></label> {/* Required field for course benefits */}

          <textarea 
          id='courseBenefits'
          placeholder='Enter Benefits of your Course'
          {...register("courseBenefits", {required:true})}
          className='min-h-[130px] w-full bg-richblack-700 rounded-lg  p-4'
          />
          {
            errors.courseBenefits && (
              <span>
                Benefits of the course are required
              </span>
            )
          }
        </div>


        <RequirementField
        name='courseRequirements'
        label='Requirements/Instructions'
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        />

      <div>
          {
            editCourse && (
              <button onClick={() => dispatch(setStep(2))}
              className='flex items-center gap-x-2 bg-richblack-200 '
              >
                Continue without Saving
              </button>
            )
          }
          <IconBtn 
          text={!editCourse ? "Next" : "Save Changes"}
          className="m-4"
          >
            <MdNavigateNext />
                    </IconBtn>
        
      </div>




    </form>
  )
}

export default CourseInformationForm
