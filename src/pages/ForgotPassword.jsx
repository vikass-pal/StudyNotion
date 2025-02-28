     import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import toast from 'react-hot-toast';
import { FaArrowLeft } from "react-icons/fa6";


const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.auth);
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Email is required");
            return;
        }
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

  return (
<div className='flex flex-col h-screen max-h-[508px] max-w-[448px] items-center justify-center mx-auto'>

        {
            loading ? (
            <div>Loading...</div>
            ) : (
                <div className=''>
                    <h1 className='text-[25px] font-bold text-richblack-5'>
                        {
                            !emailSent ? "Reset your Password" : "Check your Email"
                        }
                    </h1>
                    <p className='text-richblack-50 font-sm'>
                        {
                            !emailSent ? "Have no fear, we'll email you instructions to reset your password. If you dont have access to your email we can ty account recovery" :
                            `We have sent the email to ${email} `
                        }
                    </p>
                    <form onSubmit={handleOnSubmit} noValidate>

                        {
                            !emailSent && (
                                <label>
                                    <p className='text-richblack-50 font-semibold mt-5 w-full rounded-lg '>Email Address<sup className='text-red-900'>*</sup></p>
                                    <input 
                               required
                               type='email'
                               name='email'
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               placeholder = 'Enter your email Address'
                                className='w-full px-5 py-4 bg-richblack-800 text-richblack-5 rounded-lg'
                               />
                                </label>
                            )
                        }
                        <button type='submit' disabled={loading} className='bg-yellow-50 hover:bg-yellow-200 w-full text-richblack-800 mt-5 rounded-lg px-3 py-3'>

                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>
                    <div className=' text-richblack-5 text-sm mt-5 flex gap-2'>
                    <FaArrowLeft className='mt-1'  />
                        <Link to='/login'>
                       
                        <p className=''>Back to Login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword
