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
               spaceBetween={25}
               loop={true}
               // modules={[ Pagination]}
     
               breakpoints={{
                 1024: {
                   slidesPerView: 3,
                 },
               }}
               className="max-h-[30rem] pt-8 px-2"
             >
          {Courses?.map((course, index) => (
            <SwiperSlide key={index}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-col sm:flex-row gap-6 ">
        <p className=" h-[201px] w-full rounded-xl skeleton"></p>
        <p className=" h-[201px] w-full rounded-xl hidden lg:flex skeleton"></p>
        <p className=" h-[201px] w-full rounded-xl hidden lg:flex skeleton"></p>
      </div>
      )}
    </>
  )
}

export default CourseSlider
