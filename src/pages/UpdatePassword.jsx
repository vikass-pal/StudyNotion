import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
import toast from 'react-hot-toast';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { loading } = useSelector(state => state.auth);
    const location = useLocation();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });

    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        
        // Validate password and confirm password
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    };

    return (
        <div className='flex flex-col max-h-[508px] max-w-[600px] items-center mx-auto text-richblack-5'>
            {
                loading ? 
                (
                    <div>
                        Loading...
                    </div>
                ) : (
                   <div className=''>
                    <h1 className='text-[25px] font-bold text-richblack-5'>Choose new password</h1>
                    <p className='text-richblack-50 text-sm '>
                        You're almost done!! Kindly enter new password
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        <label className=''> 
                            <p className='text-richblack-50 mt-7'>New Password <sup className='text-red-500'>*</sup> </p>
                            <div className='flex items-center justify-center '>
                            <input 
                            required
                            type={showPassword ? "text" : "password"}
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                            placeholder='Enter Password'
                            className='w-full p-5 bg-richblack-600 text-richblack-5 rounded-l-lg'/>
                            
                            <span onClick={() => setShowPassword((prev) => !prev )} className='p-3 bg-richblack-600 rounded-r-lg'>
                                {
                                    showPassword ? <IoEyeOff fontSize={40}/> : <IoEye fontSize={40}/> 
                                }
                            </span>
                            </div>
                        </label>

                        <label>
                            <p className='text-richblack-50 mt-4'>Confirm New Password<sup>*</sup></p>
                            <div className='flex items-center justify-center'>
                            <input 
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder='Confirm Password'
                             className='w-full p-5 bg-richblack-600 text-richblack-5 rounded-l-lg'
                            />
                            <span onClick={() => setShowConfirmPassword((prev) => !prev )} className='p-3 bg-richblack-600 rounded-r-lg'>
                                {
                                    showConfirmPassword ?  <IoEyeOff fontSize={40}/> : <IoEye fontSize={40}/> 
                                }
                            </span>
                            </div>
                        </label>
                        <button type='submit' className='bg-yellow-50 hover:bg-yellow-100 mx-auto text-richblack-800 rounded-lg mt-5 w-full p-4'>
                            Reset Password
                        </button>
                    </form>
                    <div>
                        <Link to="/login">
                        <p>Back to Login</p></Link>
                    </div>
                   </div>
                )
            }
        </div>
    );
};

export default UpdatePassword;
