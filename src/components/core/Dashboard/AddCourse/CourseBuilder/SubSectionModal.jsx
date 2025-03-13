import React from 'react'
import { useDispatch } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1 } from "react-icons/rx";
const SubSectionModal = (
  modalData,
  setModalData,
  add= false,
  view = false,
  edit = false,
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
      if(view || edit ) {
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
    const handleSubmitSubSection = async () => {
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
        // TODO same check
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
          handleSubmitSubSection();
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
        dispatch(setCourse(result));
      }
      setModalData(null);
      setLoading(false);

    }


  return (
    <div>
      <div>
        <div>
          <p>{view && "Viewing"} {Add && "Adding"} {edit && "Editing"} Lecture</p>
          <button onClick= {() => (!loading ? setModalData(null) : {})}>
          <RxCross1 />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Upload 
          name="lectureVideo"
          label="Lecture Video"
          register= {register}
          setValue = {setValue}
          error = {errors}
          video = {true}
          viewData= {view ? modalData.videoUrl: null}
          editData = {edit ? modalData.videoUrl : null}
          
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
            className='w-full min-h-[130px]' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal