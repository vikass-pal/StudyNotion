import React, { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const VideoDetails = () => {

  const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
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
        const filteredVideoData = filteredData?.[0].subsection.filter(
          (data) => data._id === subSectionId
        )
        setVideoData(filteredVideoData?.[0]);
        setVideoEnded(false);
      }
    }
  },[courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === subSectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex(
      (data) => data.id === subSectionId
    )
    if(currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;

    }
    else{
      return false;
    }

  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === subSectionId
    )
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex(
      (data) => data.id === subSectionId
    )
    if(currentSectionIndex === courseSectionData.length - 1 && 
      currentSubSectionIndex === noOfSubSections - 1
    ) {
      return true;

    }
    else{
      return false;
    }
    
  }
  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === subSectionId
    )
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex(
      (data) => data.id === subSectionId
    ) 
    if(currentSubSectionIndex !== noOfSubSections - 1) {
      // samesection ka next video
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection
      [currentSectionIndex + 1]._id;
      // new video pe jao
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else{
      // diff section next video
      const nextSectionId = courseSectionData[currentSectionIndex +1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex+1].subsection[0]._id;

      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
    
  }

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === subSectionId
    )
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSectionId.findIndex(
      (data) => data.id === subSectionId
    )
    if(currentSubSectionIndex !== 0) {
      // same section , previous video
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]
     // new video pe jao
     navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }
    else{
      // diff section last video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex-1].subSection[prevSubSectionLength - 1]._id;
        // new video pe jao
     navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
     
  }
  const handleLectureCompletion = async() => {
    setLoading(true);
    const res = await markLecturesAsComplete({courseId:courseId, subSectionId:subSectionId}, token);
    if(res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  } 

  return (
    <div>

    </div>
  )
}

export default VideoDetails