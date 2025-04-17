import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const VideoDetailsSidebar = () => {
    const [activeStatus, setActiveStatus]= usestate("");
    const [videobarActive, videoBarActive] = useState("");
    const navigate = useNavigate();
    const {sectionId, subSectionId} = useParams();

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse);
    useEffect(() => {
        ;(() => {
            

        }) ()
    })

  return (
    <div>

    </div>
  )
}

export default VideoDetailsSidebar