import React, { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const VideoDetails = () => {

  const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const {token} = useSelector((state) => state.auth)
  const {courseSectionData, courseEntireData, completedLectures} = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect (() => {
    const setVideoSpecificDetails = () => {
      if(!courseSectionData.length)
        return;
      if(!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses")
      }
      else {
        // assume all 3 fields are present

        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )
      }
    }
  })

  const isFirstVideo = () => {

  }

  const isLastVideo = () => {
    
  }
  const goToNextVideo = () => {
    
  }

  const goToPrevVideo = () => {
    
  }
  const handleLectureCompletion = () => {
    
  }

  return (
    <div>

    </div>
  )
}

export default VideoDetails