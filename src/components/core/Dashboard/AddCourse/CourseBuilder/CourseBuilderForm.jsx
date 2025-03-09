import React, { useState } from 'react'

const CourseBuilderForm = () => {
  const {register, handleSubmit, setValue, formState: {errors} } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);

  return (
    <div className='text-white'>
      <p>Course Builder</p>
      <form>
        <div>
          <label>Course Builder<sup>*</sup></label>
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
        <div>
          <IconBtn type="Submit"
          text={editSectionName ? "Edit Section Name" : "Create Section"}
          outline={true}
          customClasses={"text-white"}
          >


          </IconBtn>
        </div>
      </form>

    </div>
  )
}

export default CourseBuilderForm