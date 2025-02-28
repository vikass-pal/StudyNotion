import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../services/operations/authAPI';
// import { useSelector } from 'react-redux';
import { FaArrowLeft } from "react-icons/fa6";
import { RxCountdownTimer } from "react-icons/rx";


const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading, signupData} = useSelector((state) => state.auth);

    useEffect(() => {
        if(!signupData) {
            navigate("/signup");
        }
    },[])
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,

        } = signupData;
        dispatch(signUp(accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,otp, navigate));


    }
  return (
    <div className='min-h-[calc(100vh-3.5rem)] grid place-items-center'>
        {
            loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1 className='text-[25px] font-bold text-richblack-5 '>Verify Email</h1>
                    <p className='text-sm text-richblack-50 mt-3'>A verification code has been sent to your email.Kindly enter the code below</p>
                    <form onSubmit={handleOnSubmit}>
                    <div className='flex gap-5 '>
                    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} 
      className='bg-richblack-800 rounded-md gap-5 px-6 py-4 items-center w-full mt-5 mr-6' />}
    />

                    </div>
                    

                        <button type='submit' className='bg-yellow-50 text-richblack-800 w-full px-3 py-3 rounded-lg mt-5 hover:bg-yellow-200'>
                            Verify OTP
                        </button>
                        
                    </form>
                    <div className='flex mt-5 justify-between'>
                        <div className='flex text-richblack-50 text-center gap-2  '>
                        <FaArrowLeft className='mt-1' />
                            <Link to="/login">
                            <p >Back to login</p>
                            </Link>
                        </div>
                       <div className='flex text-blue-200 gap-2 items-center '>
                       <RxCountdownTimer />
                       <button onClick={() => dispatch(sendOtp(signupData.email, navigate))} className='' >
                            Resend it
                           
                        </button>
                       </div>
                        
                    </div>
                </div>
            )
        }

    </div>
  )
}

export default VerifyEmail