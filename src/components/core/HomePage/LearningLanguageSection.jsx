import React from 'react'
import HighlightedText from './HighlightedText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import CTAButton from './Button'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_leassons from "../../../assets/Images/Plan_your_lessons.png"

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] '>
      <div className='flex flex-col gap-5 items-center'>
      <div className='text-4xl font-semibold text-center '>
        Your swiss knife for 
        <HighlightedText text={"learning any language"} />
      </div>
      <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
        Using spin making learning multiple languages easy with 20+ languages realistic voice-over, progress tracing, custom schedule and more.
      </div>

      <div className='flex flex-row justify-center items-center mt-5'>
    <img src={know_your_progress}
     alt="KnowYourProgressHere" 
     className='object-contain -mr-32'
     />
     <img src={compare_with_others}
     alt="KnowYourProgressHere" 
     className='object-contain'
     />
     <img src={plan_your_leassons}
     alt="KnowYourProgressHere" 
     className='object-contain -ml-36'
     />
     
      </div>
      <div className='mb-10'>
        <CTAButton active={true} linkto={'./signup'}>
        <div className='w-fit items-center '>
          Learn more
        </div>

        </CTAButton>
      </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection