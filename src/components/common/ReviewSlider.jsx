import React from 'react'
import { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import {Autoplay, FreeMode, Navigation, Pagination} from 'swiper'

import ReactStars from 'react-rating-stars-component'
import { apiConnector } from '../../services/apiconnector';
import { ratingsEndpoints } from '../../services/apis';

const ReviewSlider = () => {

    const [reviews, setReviews] = useState([])
    const truncateWords = 15;

    useEffect(() => {
        const fetchAllReviews = async() => {
            const {data}= await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
            console.log("Logging response in rating", data);

            // const {data} = response;
            if(data?.success) {
                setReviews(data?.data);

            }
            console.log("Printing review",reviews)
          
        }
        fetchAllReviews();
    },[])

  return (
    <div className='text-white'>
        <div className='h-[190] max-w-maxContent'>
            <Swiper 
            slidesPerView={4}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay={{

            }}
            modules={[FreeMode, Pagination, Navigation, Autoplay]}
            
            className='w-full'
            
            >

                {
                    reviews.map((review, index) => {
                        <SwiperSlide key={index}>
                            <img
                             src={review?.user?.image ? 
                                review?.user?.image : 
                                `https://api.dicebar.com/5.x/initials/svg?seed=${review?.user?.firstName} 

                                ${review?.user?.lastName}`
                                }  alt="Profile picture"
                                className='h-9 w-9 object-cover rounded-full' />
                                <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                               
                                <p>{review?.course?.courseName} </p>

                        </SwiperSlide>
                    })
                }

            </Swiper>

        </div>

    </div>
  )
}

export default ReviewSlider