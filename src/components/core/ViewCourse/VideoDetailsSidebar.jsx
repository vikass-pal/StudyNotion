import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import IconBtn from '../HomePage/common/IconBtn';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCourseViewSidebar } from "../../../slices/sidebarSlice"



const VideoDetailsSidebar = ({setReviewModal}) => {
    const [activeStatus, setActiveStatus]= usestate("");
    const [videoBarActive, setvideoBarActive] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

   
    
    const location = useLocation();
    const {sectionId, subSectionId} = useParams();

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse);
    useEffect(() => {
        const setActiveFlags = () => {
          if(!courseSectionData.length)
            return;
          const currentSectionIndex = courseSectionData.findIndex(
            (data) => data.id === sectionId
          )
          const currentSubsectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
            (data) => data._id === subSectionId
          )
          const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
          // current section
          setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
          // current subsection
          setvideoBarActive[activeSubSectionId];
        }
        setActiveFlags();
    },[courseSectionData, courseEntireData, location.pathname])

  return (
   <>
    <div>
    {/* for buttons */}
    <div>
       {/* for buttons */}
       <div>
        <div onClick={() => { navigate("/dashboard/enrolled-courses")}}>
          Back
        </div>
        <div>
          <IconBtn 
          text="Add Review"
          onClick={() => setReviewModal(true)}
          />
        </div>

       </div>
       {/* for heading and title */}
       <div>
        <p>{courseEntireData?.courseName}</p>
        <p>{completedLectures?.length} / {totalNoOfLectures}</p>
       </div>
    </div>

    {/* for sections and subSections  */}
    <div>
      {
        courseSectionData.map((course, index) => (
          <div 
          onClick={() => setActiveStatus(course?._id)}
          key={index}
          >
             {/* section */}
             <div>
              <div>
                {course?.sectionName}
              </div>
              {/* HW arrow */}
             </div>
             {/* subsections */}
             <div>
              {
                activeStatus === course?._id && (
                  <div className={`flex gap-5 p-5 
                  ${videoBarActive === topic._id ? 
                  "bg-yellow-200 text-richblack-900" : 
                   "bg-richblack-900 text-white"}`} 
                   key={index}
                   onClick={() => {
                    navigate(
                      `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?.id}`
                    )
                    setvideoBarActive(topic?._id)
                   }}
                   > 
                    <input 
                    type='checkbox'
                    checked = {completedLectures.includes(topic?.id)}
                    onChange={() => {}}
                    />
                    <span>
                      {topic.title}
                    </span>
                  </div>
                ) 
              }
             </div>
          </div>
        ))
      }
    </div>
    </div>
   </>
  )
}

export default VideoDetailsSidebar