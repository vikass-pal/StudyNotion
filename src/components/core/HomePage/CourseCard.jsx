import React from 'react'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData, currentCard, setCurrentCard} ) => {
  return (
    <div className={`w-[360px] lg:w-[30%] ${currentCard === cardData?.heading
        ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
        : "bg-richblack-800"
        }  text-richblack-25 h-[300px] box-border cursor-pointer `}
      onClick={() => setCurrentCard(cardData?.heading)}>
        <div className='border-b-[2px] border-richblack-400 border-dashed flex flex-col p-6'>

            <div className={`${currentCard === cardData?.heading && "text-richblack-800"} font-semibold mb-3 mt-3`}>
                {cardData?.heading}
            </div>

            <div className={`text-sm text-richblack-300`}>
                
                {cardData?.description}
            </div>

            <div className={`${ currentCard === cardData?.heading ? "text-blue-400" : "text-richblack-300"} flex font-medium justify-between px-6 py-3 translate-y-32` }>
                {/* dott line */}
                {/* <div className='bg-richblack-200 w-[2%]'></div> */}

               
                <div className='flex items-center justify-between gap-2'>
                    <HiUsers/>
                    <p>{cardData.level}</p>
                </div>

                <div className='flex flex-row items-center justify-between gap-2'>
                <ImTree/>
                    <p>{cardData.lessionNumber}</p>
                    
                </div>
                


            </div>
        </div>
       
    </div>
  )
}

export default CourseCard