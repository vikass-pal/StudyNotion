import React from 'react'
import { useDispatch } from 'react-redux';

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

    const onSubmit = () => {
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
      formData.append("sectionId", modalData)

    }


  return (
    <div>
      
    </div>
  )
}

export default SubSectionModal