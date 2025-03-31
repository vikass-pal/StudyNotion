import React from 'react'

const CourseDetails = () => {

    const handleBuyCourse = () => {

    }

  return (
    <div>
        <button className='bg-yellow-50 p-6 mt-10 rounded-md text-black font-bold hover:scale-95 hover:bg-richblack-400 transition-all duration-200'
        onClick={() => handleBuyCourse() }
        >
            Buy Now
        </button>
    </div>
  )
}

export default CourseDetails