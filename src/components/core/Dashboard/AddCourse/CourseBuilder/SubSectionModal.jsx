import React from 'react'
import { useDispatch } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {createSubSection , updateSubSection} from '../../../../../services/operations/courseDetailsAPI'
import Upload from '../Upload'
import IconBtn from '../../../HomePage/common/IconBtn';
import toast from 'react-hot-toast';

import { useEffect, useState } from 'react';
const SubSectionModal = (
 {
  modalData,
  setModalData,
  add= false,
  view = false,
  edit = false,
 }
) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState:{errors},
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading , setLoading] = useState(false);
  const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
      if(view || edit) {
        
          setValue("lectureTitle", modalData.title);
          setValue("lectureDesc", modalData.description);
          setValue("lectureVideo", modalData.videoUrl);
        
      }

    },[]);

    const isFormUpdated = () => {
      const currentValues = getValues();
      if(
        currentValues.lectureTitle !== modalData.title ||
        currentValues.lectureDesc !== modalData.description ||
        currentValues.lectureVideo !== modalData.videoUrl
        
      )
      {
        return true;
      }
      else {
        return false;
      }
    }



const handleEditSubsection = async () => {
const currentValues = getValues();
const formData = new FormData();
formData.append("sectionId", modalData.sectionId);
formData.append("subSectionId", modalData._id);

      if(currentValues.lectureTitle !== modalData.title) {
        formData.append("title", currentValues.lectureTitle);
      }
      if(currentValues.lectureDesc !== modalData.description) {
        formData.append("description", currentValues.lectureDesc);
      }
      if(currentValues.lectureVideo !== modalData.videoUrl) {
        formData.append("video", currentValues.lectureVideo);
      }

      setLoading(true);
      // Api call
      const result = await updateSubSection(formData, token);
      if(result) {
        const updatedCourseContent = course.courseContent.map((section) => section._id === modalData.sectionId ? result : section);
            const updatedCourse = {...course, courseContent: updatedCourseContent};
        dispatch(setCourse(result))
      }
      setModalData(null);
      setLoading(false);

    }

    const onSubmit = async (data) => {
      if(view)
        return ;

      if(edit) {
        if(!isFormUpdated) {
          toast.error("NO changes made to the form")
        }
        else {
          handleEditSubsection();
        }
        return;
      }

      const formData = new FormData();
      formData.append("sectionId", modalData);
      formData.append("title", data.lectureTitle);
      formData.append("description", data.lectureDesc);
      formData.append("video", data.lectureVideo);
      setLoading(true)
      // api call
      const result = await createSubSection(formData, token);

      if(result) {
        const updatedCourseContent = course.courseContent.map((section) => section._id === modalData ? result : section);
        const updatedCourse = {...course, courseContent: updatedCourseContent};
        dispatch(setCourse(result));
      }
      setModalData(null);
      setLoading(false);

    }


  return (
    <div>
      <div>
        <div>
          <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
          <button onClick= {() => (!loading ? setModalData(null) : {})}>
          <RxCross1 />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Upload 
  name="lectureVideo"
  label="Lecture Video"
  register={register}
  setValue={setValue}
  errors={errors}
  video={true}
  viewData={view ? modalData?.videoUrl || "" : null}  // ✅ Ensures videoUrl is never undefined
  editData={edit ? modalData?.videoUrl || "" : null}  // ✅ Ensures videoUrl is never undefined
/>
          <div>
            <label>Lecture Title</label>
            <input 
            id='lectureTitle'
            placeholder='Enter lecture Title'
            {...register("lectureTitle", {required:true})}
            className='w-full' />
            {errors.lectureTitle && (<span>Lecture Title is Required</span>)}
          </div>
          <div>
            <label>Lecture Description</label>
            <textarea 
            id='lectureDesc'
            placeholder='Enter lecture Description'
            {...register("lectureDesc", {required:true})}
            className='w-full min-h-[130px] text-black' />
            {errors.lectureDesc && (<span>Lecture Description is Required</span>)}
          </div>
          {
            !view && (
              <div>
                <IconBtn 
                text={loading ? "Loading...": edit ? "Save Changes" : "Save"}
                />
              </div>
            )
          }
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal
