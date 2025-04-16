import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
    } = course;

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You're an instructor, you cannot buy a course");
            return;
        }
        if (token) {
            dispatch(addToCart(course));
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

   

    return (
        <div className={`flex flex-col gap-4 rounded-2xl bg-richblack-700 p-4 text-richblack-5 w-fit`}>
            <img src={ThumbnailImage} alt="Thumbnail image"
                className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full" />
            <div className="space-x-3 pb-4 text-3xl font-semibold">
                ₹ {CurrentPrice}
            </div>
            <div className='flex flex-col gap-4'>
                <button
                    className='bg-yellow-50 hover:bg-richblack-200 transition-all duration-200 hover:text-white w-[330px] text-center translate-x-7 text-black p-2 px-4 rounded-md'
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
                        <button onClick={handleAddToCart} className='bg-richblack-800 w-[330px] text-richblack-25  hover:bg-richblack-600 transition-all duration-200 p-2 px-4 rounded-md translate-x-7'>
                            Add to Cart
                        </button>
                    )
                }
            </div>
            <div>
                <p className="pb-3 pt-4 text-center text-sm text-richblack-25">30 Days Money Back Guarantee</p>
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
                    className='bg-transparent w-fit text-yellow-200 text-center items-center justify-center w-full p-2 px-4 rounded-md'
                >
                    Share
                </button>
            </div>
        </div>
    );
}

export default CourseDetailsCard;
