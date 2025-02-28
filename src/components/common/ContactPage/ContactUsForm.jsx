import React from 'react'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {apiConnector} from "../../../services/apiconnector"
import {contactusEndpoint} from '../../../services/apis';
import CountryCode from "../../../data/countrycode.json"



const ContactUsForm = () => {
    const [loading,setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("logging Data", data);
        try{
            setLoading(true);
           const response = {status:"OK"}
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API,data);
            console.log("Loging response", response);
            setLoading(false);
        } catch(error) {
            console.log("Error", error.message);
            setLoading(false);
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset ({
                email:"",
                lastName:"",
                lastName:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessful])

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
        <div className='flex flex-col gap-10'>
        <div className='flex gap-5 text-black'>
            {/* first name */}
            <div className='flex flex-col'>
                <label>First Name:</label>
                <input type="text"
                name='firstName'
                id='firstName'
                placeholder='Enter first Name'
                {...register("firstName", {required:true})} />
                {
                    errors.firstName && (
                        <span>
                            Please Enter your name
                        </span>
                    )
                }
            </div>
            {/* last name */}
            <div className='flex flex-col text-black'>
                <label>last Name:</label>
                <input type="text"
                name='lastName'
                id='lastName'
                placeholder='Enter last Name'
                 {...register("firstName")}
               />
                {/* {
                    errors.lastName && (
                        <span>
                            Please Enter your name
                        </span>
                    )
                } */}
            </div>
           
        </div>
         {/* email */}
         <div className='flex flex-col text-black'>
                <label htmlFor='email'>Email </label>
                    <input type="email" name="email" id="email"
                    placeholder='Enter your Email id'
                    {...register("email",{required:true})}
                    />
                    {
                        errors.email && (
                            <span>
                                Enter your Email Address
                            </span>
                        )
                    }
                
            </div>
            {/* phone no */}
            <div className='flex flex-col gap-1'>
                <label htmlFor='phonenumber'> 
                    Phone Number
                </label>
                <div className='flex  gap-2'>
                    {/* dropdown */}
                    <div className='flex flex-col w-[120px] gap-5 text-white'>
                       <select  name='dropdown' id='dropdown' className='bg-richblack-800' 
                       {...register("countrycode",{required:true})}>
                        {
                            CountryCode.map((element , index) => {
                                return(
                                   <option key={index} value={element.code}>
                                    {element.code} - {element.country}
                                   </option> 
                                )
                            })
                        }</select> 
                    </div>
                    <div >
                        <input type="number" name="phonenumber" id="phonenumber" placeholder='12345 67890' 
                         className='w-[calc(100% - 90px)]'
                        {...register("phoneNo",{required:{value:true, message:"Please enter your number"},
                            maxLength:{value:10, message:"Invalid phone number"},
                            minLength:{value:8, message:"Invalid phone number"}})} 
                           
                            />

                        
                    </div>
                 </div>
                 {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }

            </div>
            {/* message */}
            <div className='flex flex-col text-black'>
                    <label>Message</label>
                        <textarea name="message" id="message" cols="30" rows="7" 
                        placeholder="Enter your message here"
                        {...register("message", {required:true})}
                        />
                        {
                            errors.message && (
                                <span>
                                Enter your Email Address
                            </span>
                            )
                        }
                   
            </div>
        <button type='submit' className='rounded-md bg-yellow-100 text-center px-6 text-[16px] font-bold text-black
        '>
            Send Message
        </button>
        </div>
    </form>
  )
}

export default ContactUsForm