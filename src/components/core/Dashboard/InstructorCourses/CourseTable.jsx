import React from 'react'
import { useDispatch } from 'react-redux'
import { Thead, Table, Tr ,Tbody, Th, Td } from 'react-super-responsive-table';
import { COURSE_STATUS } from '../../../../utils/constants';
import ConfirmationModal from '../../HomePage/common/ConfirmationModal'
import {setCourse} from '../../../../slices/courseSlice';
import {deleteCourse, fetchInstructorCourses} from '../../../../services/operations/courseDetailsAPI'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { CiClock2 } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {formatDate} from '../../../../utils/formatDate'
import { CiCircleCheck } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function CourseTable({courses, setCourses}) {
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const [loading , setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate = useNavigate();
const handleCourseDelete = async(courseId) => {

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
        <div className='w-full flex  gap-y-5 mt-8'>
            <Table className='rounded-2xl border border-richblack-800 '>
           <Thead>
                     <Tr className="flex gap-x-10 rounded-t-3xl border-b border-b-richblack-800 px-6 py-2">
                       <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100 translate-x-5">
                         Courses
                       </Th>
                       <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                         Duration
                       </Th>
                       <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                         Price
                       </Th>
                       <Th className="text-left text-sm font-medium uppercase text-richblack-100">
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
                                <Tr key={course._id} className="flex gap-x-10 border-richblack-800 p-8 " >
                                   <Td className="flex flex-1 gap-x-4 relative">
                                <img src={course?.thumbnail}
                               className="h-[200px] min-w-[270px] max-w-[270px] rounded-lg object-cover m-3"
                                alt="" />

                                <div className='flex  '>
                                    <div className='flex flex-col m-3 '>
                                    <p className='text-lg font-semibold  text-richblack-5 capitalize'>{course.courseName}</p>
                                    <p className='text-sm text-richblack-50 mt-2'>{course.courseDescription}</p>
                                    <p className='text-sm text-richblack-25 mt-2'>Created: {formatDate(course?.createdAt)}</p>
                                    <p className="text-[12px] text-richblack-100 mt-2 ">
                                                            updated: {formatDate(course?.updatedAt)}
                                                          </p>
                                   
                                    {
                                        course.status === COURSE_STATUS.DRAFT ? (
                                            <div className='flex flex-row w-fit h-[24px] gap-x-2 items-center mt-2 rounded-3xl border-richblack-500 border-2  bg-richblack-800 p-2 '>
                                            <CiClock2 className="text-pink-200" />
                                        <p className="text-pink-200">
                                           
                                           Draft</p>
                                       </div>
                                        ) :
                                        (
                                            <div className='flex flex-row w-fit h-[24px] gap-x-2 items-center mt-2 rounded-3xl border-richblack-500 border-2  bg-richblack-800 p-2 '>
                                                <CiCircleCheck className="text-yellow-200" />
                                            <p className="text-yellow-200">
                                               
                                               Published</p>
                                           </div>
                                        )
                                    }
                                     </div>

                                </div>
                                    </Td>
                                    <Td className="text-sm font-medium text-richblack-100 flex items-center justify-center -translate-x-4">2hr 30min</Td>
                                    <Td className="text-sm font-medium text-richblack-100 flex items-center justify-center -translate-x-4">₹{course.price}</Td>
                                    <Td   className='flex flex-row items-center justify-center gap-x-3 text-richblack-50 font-medium'>
                                        <button 
                                        disabled={loading}
                                        onClick={() => {
                                            navigate(`/dashboard/edit-course/${course._id}`)
                                        }}
                                        >
                                            <MdEdit />
                                        </button>
                                        <button 
                                        disabled={loading}
                                       
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1:"Do you want",
                                                text2:"All the data relatedd to this course will be deleted",
                                                btn1Text:"Delete",
                                                btn2Text:"cancel",

                                                btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                                                btn2Handler:!loading ? () => setConfirmationModal(null) : () => {},
                                            })
                                        }}
                                        >
                                            <MdDelete />
                                        </button>
                                    </Td>
                                </Tr>
                            ))
                        )
                     }
                     
                </Tbody>
            </Table>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} /> }

        </div>
      )
}
