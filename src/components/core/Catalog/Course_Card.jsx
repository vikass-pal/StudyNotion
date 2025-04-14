import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../HomePage/common/RatingStars';
import GetAvgRating from '../../../utils/avgRating'


const Course_Card = ({course, Height}) => {
    console.log("Course Data:", course);

    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
        
    },[course])
    
  return (
    <div className='hover:scale-[1.03] transition-all duration-200 z-50 '>
        <Link to={`/courses/${course._id}`}>
        <div>
            <div>
                <img src={course?.thumbnail} alt="Course Thumbnail"
                className={`${Height} w-full rounded-xl object-cover`}
                />
            </div>
            <div className='flex flex-col gap-2 px-1 py-3'>
                <p className='text-xl text-richblack-5'>{course?.courseName }</p>
                <p className="text-sm text-richblack-50">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                <div>
                    <span>{avgReviewCount || 0}</span>

                    <RatingStars Review_Count={avgReviewCount} />
                    
                    <span className='text-yellow-5'>{course?.ratingAndReviews?.length} Rating</span>
                </div>
                <p className='text-xl text-richblack-5'>₹{" "}{course?.price}</p>
            </div>
        </div>
        </Link>
    </div>
  )
}

export default Course_Card