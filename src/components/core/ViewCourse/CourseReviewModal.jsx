import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const CourseReviewModal = ({setReviewModal}) => {


    const {user} = useSelector((state) => state.profile);
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

  return (
    <div>
        <div>
            {/* Modal header */}
            <div>
                <p>Add Review</p>
                <button onClick={setReviewModal(false)}>
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
                                <label htmlFor="">
                                    Add your Experience
                                </label>
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