import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { FreeMode, Autoplay, Pagination, Navigation } from 'swiper/modules'

import Course_Card from './Course_Card'

const CourseSlider = ({ Courses }) => {
  console.log("Courses in Slider:", Courses)

  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={100}
          pagination={true}
          
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={true}
          breakpoints={{
            1024:{slidesPerView: 2,}
          }}
          
          
        >
          {Courses?.map((course, index) => (
            <SwiperSlide key={index}>
              <Course_Card course={course} Height={"h-[300px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>
          <p>No Courses Found</p>
        </div>
      )}
    </>
  )
}

export default CourseSlider
