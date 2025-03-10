import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoIosArrowForward } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';

const CourseBuilderForm = () => {
  const {register, handleSubmit, setValue, formState: {errors} } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if(editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, token
      )
    }
    else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },token
      )
    }

    // update values

    if(result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue('sectionName', '');
    }
    setLoading(false);
  }

  const goToNext = () => {
    if(course.courseContent.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }
    if(course.courseContent.some((section) => section.length === 0 )) {
      toast.error("Please add atleast one lecture in each Section");
      return;
    }
    // if everything is fine goto next step
    dispatch(setStep(3));
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId) {
      cancelEdit(); 
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }
  

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName" ,"")
  }

  return (
    <div className='text-white'>
      <p>Course Builder</p>
      <form>
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