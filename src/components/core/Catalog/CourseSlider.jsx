import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode';
import 'swiper/css/pagination'
import { Autoplay, FreeMode, Paagin} from 'swiper'

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
        pagination={{
          dynamicBullets: true,
        }}
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