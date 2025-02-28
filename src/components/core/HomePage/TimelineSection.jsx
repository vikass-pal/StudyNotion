import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import Image from "../../../assets/Images/image.png"

const timeline = [
    {
        Logo:Logo1,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo:Logo2,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo:Logo3,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo:Logo4,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    
]

const TimelineSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-15 items-center '>
            <div className='flex flex-col w-[45%] gap-5'>
            {
                timeline.map((element, index) => {
                    return (
                        <div className='flex flex-row gap-6' key={index}>
                            <div className='w-[50px] h-[50px] bg-white items-center justify-center bg-center rounded-full'>
                                <img src={element.Logo} alt="" />

                            </div>

                            <div>
                                <h2 className='text-[18px] font-semibold'>{element.heading}</h2>
                                <p className='text-base'>{element.Description}</p>
                            </div>

                        </div>
                    )
                })
            }
            </div>
            <div className='relative shadow-blue-200 w-[60%]'>
            <img src={Image}
            alt='timelineImage'
            className='shadow-white object-cover  h-fit '/>
            <div className='absolute bg-caribbeangreen-700 flex flex-row text-white h-fit uppercase py-8
            translate-y-[-70%] translate-x-[20%]
            
            '>
            <div className='flex flex-row border-caribbeangreen-300 gap-5 items-center border-r px-5'>
                <p className='text-3xl font-bold'>10</p>
                <p className='text-sm text-caribbeangreen-300'>Years of Experience</p>
            </div>
            <div className='flex gap-5 items-center px-7'>
            <p className='text-3xl font-bold'>250</p>
                <p className='text-sm text-caribbeangreen-300'>Type of Courses</p>
            </div>
            </div>
            </div>

        </div>
    </div>
  )
}

export default TimelineSection