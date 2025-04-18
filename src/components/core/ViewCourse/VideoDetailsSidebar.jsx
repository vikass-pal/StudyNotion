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
        ;(() => {
            if(!courseSectionData.length)
              return;
            const currentSectionIndex = courseSectionData.findIndex(
              (data) => data.id === sectionId
            )
            const currentSubsectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
              (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
        }) ()
    },[courseSectionData, courseEntireData, location.pathname])

  return (
    <div>

    </div>
  )
}

export default VideoDetailsSidebar