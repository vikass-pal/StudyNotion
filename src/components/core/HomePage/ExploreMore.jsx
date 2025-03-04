import React, { useState } from 'react';
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightedText from '../HomePage/HighlightedText'
import CourseCard from '../HomePage/CourseCard'


const tabsName = [
    "Free",
    "New to coding",
    "Most Popular",
    "Skill paths",
    "Career paths",

];

const ExploreMore = () => {
 

  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading)
  }
  return (
    <div>
      <div className='text-4xl font-semibold text-center'>
        Unlock the
        <HighlightedText text={"Power of code"}/>
      </div>
      <p className='text-richblack-300 font-sm text-center'>Learn to build anything you can imagine</p>
      
      
      <div className='flex bg-richblack-800 rounded-full mb-5 mt-5 border-richblack-600 px-1 py-1' >
    {
      tabsName.map((element, index) => {
        return (
          <div 
          className={`text-[16px] flex flex-row items-center gap-2 
            ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer 
            hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
            key={index}
            onClick={() => setMyCards(element)}

          >
            {element}
            </div>
        )
      })
    }
      </div>

    <div className='lg:h-[150px]'>


    </div>
    {/* Course card group */}
    {/* <button 
      className="mt-5 p-2 bg-blue-500 text-white rounded"
      onClick={() => {
        setModalData({
          text1: "Confirm Action",
          text2: "Are you sure you want to proceed?",
          btn1Text: "Yes",
          btn1Handler: () => {
            // Handle confirmation action
            setIsModalOpen(false);
          },
          btn2Text: "No",
          btn2Handler: () => setIsModalOpen(false),
        });
        setIsModalOpen(true); // Open the modal
      }}
    >
      Open Confirmation Modal
    </button> */}

    <div className='absolute flex flex-row gap-10 justify-between w-full -translate-x-64 -translate-y-40 mt-10 '>

      {
        courses.map((element, index) => {
          return (
            <CourseCard 
            key={index}
            cardData={element}
            currentCard={currentCard}
            setCurrentCard = {setCurrentCard}
            />
          )
        })
      }
    </div>

    </div>
  )
}

export default ExploreMore
