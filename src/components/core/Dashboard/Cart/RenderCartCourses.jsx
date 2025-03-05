import React from 'react'
import { useSelector } from 'react-redux'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const RenderCartCourses = () => {

const {cart} = useSelector((state) => state.cart)

  return (
    <div>
        {
            Cart.map((course, index) => {
                <div>
                    <img src={course?.thumbnail} alt="" />
                    <div>
                        <p>{course?.courseName}</p>
                        <p>{course?.category?.name}</p>
                        <div>
                            <span>
                                4.8
                            </span>
                            <ReactStars 
                            count={5}
                            size={2}
                            edit={false}
                            activeColors= "#ffd700"
                            emptyIcon={<FaRegStar />}
                            fullIcon={<FaStar />}
                            />
                            <span>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                    </div>
                </div>
            })
        }
    </div>
  )
}

export default RenderCartCourses