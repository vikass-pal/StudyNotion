import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";

const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const handleDeleteSection = () => {

    }

  return (
    <div>
        <div className='rounded-lg p-6 px-8'>
            {
                course?.courseContent?.map((section) => (
                    <details key={section._id} open>
                        <summary className='flex items-center justify-between border-b-2'>
                          <div className='flex items-center  gap-x-3 '>
                          <RxDropdownMenu />
                          <p>{section.sectionName}</p>
                            </div>  
                            <div>
                                <button onClick={handleChangeEditSectionName(section._id, section.sectionName)}>
                                    <MdEdit />
                                </button>
                                <button onClick={() => {
                                    setConfirmationModal({
                                        text1:"Delete this Section",
                                        text2: "All the lectures in this section will be deleted",
                                        btn1Text:"Delete",
                                        btn2Text:"Cancel",
                                        btn1Handler: () => handleDeleteSection(section._id),
                                        btn2Handler: () => setConfirmationModal(null),
                                    })
                                }}>
                                        <AiOutlineDelete />

                                </button>
                                <span>|</span>
                                <BiSolidDownArrow className=''/>

                            </div>
                        </summary>
                    </details>
                ))
            }
        </div>
    </div>
  )
}

export default NestedView