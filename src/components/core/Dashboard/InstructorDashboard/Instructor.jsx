import React from 'react'
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';

const Instructor = () => {
    const [loading, setLoading] = useState(true)
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState(null);
   
    useEffect(() => {
        const getCourseDataWithStats = async () => {
          setLoading(true);
          const instructorApiData = await getInstructorData(token);
          const result = await fetchInstructorCourses(token);

          console.log(instructorApiData);

          if(instructorApiData.length)
            setInstructorData(instructorApiData);

          if(result) {
            setCourses(result);

          }
          setLoading(false);
          
        }
    },[])
  return (
    <div>Instructor</div>
  )
}

export default Instructor