import React from 'react'

const Catelog = () => {
  return (
    <div className='text-white'>
     
     <div>
        <p></p>
        <p></p>
        <p></p>
     </div>
     <div>
        {/* section1 */}
        <div>
            <div>
                <p>Most Popular</p>
                <p>New</p>
            </div>
            <CourseSlider/>
        </div>
     </div>
    </div>
  )
}

export default Catelog