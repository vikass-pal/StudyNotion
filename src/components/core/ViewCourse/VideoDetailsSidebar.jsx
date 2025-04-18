import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const VideoDetailsSidebar = () => {
    const [activeStatus, setActiveStatus]= usestate("");
    const [videoBarActive, setvideoBarActive] = useState("");
    const navigate = useNavigate();
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
    <div>

    </div>
  )
}

export default VideoDetailsSidebar