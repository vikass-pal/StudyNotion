import React from 'react'
import { useDispatch } from 'react-redux'
import { Thead, Table, Tr, Thead , Th, Td } from 'react-super-responsive-table';
import { COURSE_STATUS } from '../../../../utils/constants';
import ConfirmationModal from '../../HomePage/common/ConfirmationModal'
import {setCourse} from '../../../../slices/courseSlice';
import {deleteCourse, fetchInstructorCourses} from '../../../../services/operations/courseDetailsAPI'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

export default function CourseTable({courses, setCourses}) {
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const [loading , setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null);
    const handleCourseDelete = async() => {
        setLoading(true);

        await deleteCourse({courseId:courseId}, token);
        const result = await fetchInstructorCourses(token);
        if(result) {
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false)

    }


    return (
        <div>
            <Table>
                <Thead>
                    <Tr>
                        <Th>
                            Courses
                        </Th>
                        <Th>
                            Duration
                        </Th>
                        <Th>
                            Price
                        </Th>
                        <Th>
                            Actions
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                     {
                        courses.length === 0 ? (
                            <Tr>
                                <Td>
                                    No Courses Found
                                </Td>
                            </Tr>
                        ) :
                        (
                            courses?.map((course) => (
                                <Tr key={course._id} className="flex gap-x-10 border-richblack-800 p-8" >
                                    <Td>
                                <img src={course?.thumbnail}
                                className='h-[150px] w-[220px] rounded-md object-cover'
                                alt="" />

                                <div className='flex flex-col'>
                                    <p>{course.courseName}</p>
                                    <p>{course.courseDescription}</p>
                                    <p>Created:</p>
                                    {
                                        course.status === COURSE_STATUS.DRAFT ? (
                                            <p>DRAFTED</p>
                                        ) :
                                        (
                                            <p>PUBLISHED</p>
                                        )
                                    }

                                </div>
                                    </Td>
                                    <Td>
                                        2hr 30min
                                    </Td>
                                    <Td>
                                        ${course.price}
                                    </Td>
                                    <Td>
                                        <button 
                                        disabled={loading}
                                        // onClick={() => {
                                        //     navigate
                                        // }}
                                        >
                                            EDIT
                                        </button>
                                        <button 
                                        disabled={loading}
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1:"Do you want",
                                                text2:"All the data relatedd to this course will be deleted",
                                                btn1Text:"Delete",
                                                btnText2:"Cancel",
                                                btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                                                btn2Handler:!loading ? () => setConfirmationModal(null) : () => {},
                                            })
                                        }}
                                        >
                                            Delete
                                        </button>
                                    </Td>
                                </Tr>
                            ))
                        )
                     }
                </Tbody>
            </Table>
            {confirmationModal && <confirmationModal modalData={confirmationModal} /> }

        </div>
      )
}
  

