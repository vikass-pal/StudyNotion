import React from 'react'
import ContactUsForm from '../../common/ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='text-richblack-5 mt-[60px]'>
      <h1 className='flex items-center justify-center mx-auto text-4xl mb-[10px] font-bold'>
        Get in Touch
      </h1>
      <p className='flex items-center justify-center mx-auto text-richblack-100 mb-[30px]'>
        We'd love to here from you, Please fill out ths form.
      </p>
      <div className='bg-richblack-900'>
      <ContactUsForm />
      </div>
      
    </div>
  )
}

export default ContactFormSection