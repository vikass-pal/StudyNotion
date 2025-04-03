import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You're an instructor, you cannot buy a course");
            return;
        }
        if (token) {
            dispatch(course);
            return;
        }
        setConfirmationModal({
            btn1: "You're not logged in",
            btn2: "Please login to add to cart",
            btn1text: "Login",
            btn2text: "cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        });
    }; // Closing brace added here

    const handleShare = () => {
        copy(window.location.href);
        toast.success('Link Copied to clipboard');
    };

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
    } = course;

    return (
        <div>
            <img src={ThumbnailImage} alt="Thumbnail image"
                className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl' />
            <div>
                ₹ {CurrentPrice}
            </div>
            <div className='flex flex-col gap-y-6'>
                <button
                    className='bg-yellow-50 w-fit text-black p-2 px-4 rounded-md'
                    onClick={
                        user && course?.studentsEnrolled.includes(user?._id) ? () =>
                            navigate("dashboard/enrolled-courses") : handleBuyCourse
                    }
                > {
                    user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course" :
                        "Buy Course"
                }
                </button>
                {
                    (!course?.studentsEnrolled.includes(user?._id)) && (
                        <button onClick={handleAddToCart} className='bg-yellow-50 w-fit text-black p-2 px-4 rounded-md'>
                            Add to Cart
                        </button>
                    )
                }
            </div>
            <div>
                <p>30 Days Money Back Guarantee</p>
            </div>
            <div>
                <p>This Course includes : </p>
                <div>
                    {
                        course?.instructions?.map((item, index) => (
                            <p key={index} className='flex gap-x-4'>
                                <span>{item}</span>
                            </p>
                        ))
                    }
                </div>
            </div>
            <div>
                <button onClick={handleShare}
                    className='bg-brown-100 w-fit text-black p-2 px-4 rounded-md'
                >
                    Share
                </button>
            </div>
        </div>
    );
}

export default CourseDetailsCard;
