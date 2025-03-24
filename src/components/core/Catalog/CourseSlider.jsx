import React from 'react'
import {Swiper, swiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode';
import 'swiper/css/pagination'
import {FreeMode, Paagin} from 'swiper'

const CourseSlider = ({Courses}) => {
  return (
    <>
    {
      Courses?.length ? (
        <Swiper 
        slidesPerView={1}
        loop={true}
        spaceBetween={200}
        modules={[pagination]} 
        >
          {
            Courses?.map((course, index) => (
              <SwiperSlide key={index}>
                <Course_Card course={course} Height={"h-[250px]"} />

              </SwiperSlide>
            ))
          }

        </Swiper>
      ) : (
        <p>No Courses Found </p>
      ) 

    }
    
    </>
  )
}

export default CourseSlider