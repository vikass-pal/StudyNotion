import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightedText from '../HomePage/HighlightedText'
import CTAButton from '../HomePage/Button'
import { FaArrowRight } from "react-icons/fa";
const InstuctorSection = () => {

  return (
    <div className='mt-16'>
        <div className='flex flex-row gap-20 items-center justify-between'>
        {/* left  image*/}
        <div className='w-[50%] '>
            <img src={Instructor} 
            className='shadow-white'
            />

        </div>
        {/* right content*/}
        <div className='flex flex-col w-[50%] gap-10 '>
        <div className='text-4xl font-bold '>
          Become an 
          <HighlightedText text={"Instructor"}/>

        </div>
        <p className='text-sm text-richblue-25'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
        
        <div className='w-fit'>
        <CTAButton  active={true} linkto={'./signup'}>
          <div className='flex flex-row gap-2 items-center'>
          Start Teaching Today
         
         <FaArrowRight/>
          </div>
        
       
         
          </CTAButton>

        </div>
          
        
        </div>
        

        </div>
    </div>
  )
}

export default InstuctorSection
