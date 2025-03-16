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
  const {course} = useSelector((state) => state.course);
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
     if (!course || !course.courseContent || course.courseContent.length === 0) {

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
    <div className='text-white'>
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='sectionName'>Course Builder<sup>*</sup></label>
          <input 
          id='sectionName'
          placeholder='Add section name'
          {...register("sectionName", {required:true})}
          className='w-full text-black'
          
          />
          {
            errors.sectionName && (
              <span>Section Name is required</span>
            )
          }
        </div>
        <div className='mt-10 flex'>
          <IconBtn type="Submit"
          text={editSectionName ? "Edit Section Name" : "Create Section"}
          outline={true}
          customClasses={"text-white"}
          >
            <IoMdAddCircleOutline />



          </IconBtn>
          {editSectionName && (
            <button
            type='button'
            onClick={cancelEdit}
            >
              Cancel Edit
            </button>
          )}
          
        </div>
        
      </form>
      
      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div>
        <button className='flex justify-end gap-x-3'
        onClick={goBack}>
          Back
        </button>
        <IconBtn text="Next" onClick={goToNext}>
        <IoIosArrowForward />
        </IconBtn>
      
      </div>

    </div>
  )
}

export default CourseBuilderForm
