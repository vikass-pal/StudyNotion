import React from 'react'
import { useDispatch } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';

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
    const handleSubmitSubSection = () => {
const currentValues = getValues();
const formData = new FormData();

formData.append("sectionId", modalData.sectionId);
formData.append("subSectionId", modalData._id);


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
      
    </div>
  )
}

export default SubSectionModal