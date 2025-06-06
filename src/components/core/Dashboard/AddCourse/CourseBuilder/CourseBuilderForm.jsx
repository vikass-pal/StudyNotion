import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form"
import { IoIosArrowForward } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse, setStep, } from "../../../../../slices/courseSlice"
import { setEditCourse } from '../../../../../slices/courseSlice';
import IconBtn from '../../../HomePage/common/IconBtn';

const CourseBuilderForm = () => {
  const {register, handleSubmit, setValue, formState: {errors} } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const courseData = useSelector((state) => state.course) || {};
const course = courseData.course || { courseContent: [] };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
     // console.log("sent data ", data)
     setLoading(true)
 
     let result
 
     if (editSectionName) {
       result = await updateSection({ sectionName: data.sectionName, sectionId: editSectionName, courseId: course._id, }, token)
       // console.log("edit = ", result)
     } else {
       result = await createSection(
         { sectionName: data.sectionName, courseId: course._id, }, token)
     }
     // console.log("section result = ", result)
     if (result) {
       dispatch(setCourse(result))
       setEditSectionName(null)
       setValue("sectionName", "")
     }
     setLoading(false)
   }
 
   // cancel edit
   const cancelEdit = () => {
     setEditSectionName(null)
     setValue("sectionName", "")
   }
 
   // Change Edit SectionName
   const handleChangeEditSectionName = (sectionId, sectionName) => {
     if (editSectionName === sectionId) {
       cancelEdit()
       return
     }
     setEditSectionName(sectionId)
     setValue("sectionName", sectionName)
   }
 
   // go To Next
    const goToNext = () => {
       if (!course?.courseContent ||course.courseContent.length === 0) {
         toast.error("Please add atleast one section")
         return;
       }
       if (course.courseContent.some((section) => section.subSection.length === 0)) {
         toast.error("Please add atleast one lecture in each section")
         return;
       }
   
       // all set go ahead
       dispatch(setStep(3))
     }
 
   // go Back
   const goBack = () => {
     dispatch(setStep(1))
     dispatch(setEditCourse(true))
   }

  
  return (
     <div className="space-y-5 rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-6 w-[660px] ">
          <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
    
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Section Name */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5" htmlFor="sectionName">
                Section Name <sup className="text-pink-200">*</sup>
              </label>
              <input
                id="sectionName"
                disabled={loading}
                placeholder="Add a section to build your course"
                {...register("sectionName", { required: true })}
                className="form-style w-full bg-richblack-700 text-richblack-5 p-3 rounded-md"
              />
              {errors.sectionName && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Section name is required
                </span>
              )}
            </div>
    
            {/* Edit Section Name OR Create Section */}
            <div className="flex items-end gap-x-4 ">
              <IconBtn
                type="submit"
                disabled={loading}
                text={editSectionName ? "Edit Section Name" : "Create Section"}
                outline={true}
              >
                 <IoMdAddCircleOutline className='text-yellow-100' />
              </IconBtn>
              {/* if editSectionName mode is on */}
              {editSectionName && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="text-sm text-richblack-300 underline"
                >
                  Cancel Edit
                </button>
              )}
              
            </div>
            
          </form>
          
    
          {/* nesetd view of section - subSection */}
          
          {/* {
          console.log("Course Content:", course?.courseContent)
          } */}

           
         { course.courseContent.length > 0 && (
            <NestedView handleChangeEditSectionName={handleChangeEditSectionName}  />
          )}
    
          {/* Next Prev Button */}
          <div className="flex justify-end gap-x-3 -translate-y-8 ">
            <button
              onClick={goBack}
              className={`rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
              Back
            </button>
    
            {/* Next button */}
            <IconBtn disabled={loading} text="Next" onclick={goToNext} >
               <IoIosArrowForward />
            </IconBtn>
          </div>
        </div>
  )
}

export default CourseBuilderForm
