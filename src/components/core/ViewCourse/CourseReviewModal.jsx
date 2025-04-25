import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createRating } from '../../../services/operations/courseDetailsAPI';

const CourseReviewModal = ({setReviewModal}) => {


    const {user} = useSelector((state) => state.profile);
   const {courseEntireData} = useSelector((state) => state.viewCourse);
    const {token} = useSelector((state) => state.auth);
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},

    } = useForm();

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    },[])

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);

    }

    const onSubmit = async (data) => {
        await createRating({
            courseId:courseEntireData,
            rating:data.courseRating,
            review:data.courseExperience,
        }, token);
        setReviewModal(false);
    }

  return (
    <div>
        <div>
            {/* Modal header */}
            <div>
                <p>Add Review</p>
                <button onClick={() => setReviewModal(false)}>
                    Close
                </button>
                {/* modal body */}
                <div>
                    <div>
                        <img src={user?.image} alt="" className='aspect-square w-[50px] rounded-full object-cover' />
                        <div>
                            <p>{user?.firstName} {user?.lastName}</p>
                            <p>Posting Publicly</p>
                        </div>

                        <form 
                        onSubmit={handleSubmit(onSubmit)}
                        className='mt-6 flex flex-col items-center'
                        >
                            <ReactStars 
                            count={5}
                            onchange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"

                            />
                            <div>
                                <label htmlFor="courseExperience">
                                    Add your Experience
                                </label>
                                <textarea 
                                id='courseExperience'
                                placeholder='Add your experience here'
                                {...register("courseExperience", {required: true})}
                                className='form-style min-h-[130px] w-full '
                                />
                                {
                                    errors.courseExperience && (
                                        <span>
                                           Please Add your experience here
                                        </span>
                                    )
                                }
                            </div>
                            <div>
                                <button onClick={() => setReviewModal(false)}>Cancel  </button>
                                <IconBtn 
                                text="Save"
                                />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseReviewModal