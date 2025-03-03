import React from 'react'
import HighlightedText from "../components/core/HomePage/HighlightedText"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from "../components/core/HomePage/common/footer"

const About = () => {
  return (
    <div className=''>
        {/* section 1 */}
<section className=''>

<div className='w-full bg-richblack-800 pt-10 mx-auto flex flex-col items-center justify-center'>

<p className='text-richblack-25 w-full bg-richblack-800 flex items-center justify-center '>About us</p>
                
                <header className='text-richblack-5 '>
                    
                  <h1 className='text-richblack-5 text-4xl font-bold items-center flex flex-col justify-center mt-7 '>Driving Innovation in Online Education for a
                <br></br> <HighlightedText text={"Brighter future"}/></h1> 
                   <p className='text-richblack-50 text-sm mt-10 mb-10 flex '>Studynotion is a forefront of driving innovation in online education. We're passionate about creating brighter future by offering cutting edge courses,
                     leveraging emerging technologies and nurturing a vibrant learning community.
                   </p>
                </header>
                <div className='lg:flex gap-x-3 mx-auto items-center justify-center translate-y-11 '>
                    <img src={BannerImage1} />
                    <div class="w-full h-64 bg-gradient-radial from-[#111827] via-[#1f2937] to-[#9a6b2f]">
</div>
                    <img src={BannerImage2} />
                    <img src={BannerImage3} />
                </div>
            </div>
        </section>
        {/* section 2 */}
        <section>
        <div className='w-full'>
            <Quote />
        </div>
        </section>
        {/* Section 3 */}
        <section>
            <div className='flex flex-col  text-richblack-200 w-11/12 mt-[80px] mx-auto justify-center items-center'>
                {/* founding story wala div */}
                <div >
                <div className='flex px-5'>
                <div className='w-[50%] ml-7'>
                <h1 class="text-3xl font-bold bg-gradient-to-r from-[#FF0066] via-[#FF3D33] to-[#FF5722] text-transparent bg-clip-text drop-shadow-lg">
  Our Founding Story
</h1>
                        <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p><br></br>
                        <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full 
                            potential.</p>

                     </div>
                     <div className='w-[500px] items-center justify-center mx-auto px-[15px] -translate-x-10'>
                        <img src={FoundingStory} alt="" />
                    </div>
                </div>
                </div>
                 {/* vision and mission wala div */}
             <div className='flex mx-auto mt-[150px] items-center justify-center w-11/12 gap-x-10'>
                {/* left box */}
                <div className=' items-center justify-center'>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-[#E68426] to-[#EF9811] text-transparent bg-clip-text '>Our Vision</h1>
                    <p className='mt-[20px]'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning 
                        experience.</p>
                </div>
                {/* right box */}
                <div className='items-center justify-center px-7 mx-7 translate-x-16'>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-[#66a3d8] to-[#01A3D4] text-transparent bg-clip-text '>
                        Our Mission
                    </h1>
                    <p className='mt-[20px]'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                </div>
                </div>
            </div>
           
        </section>
        {/* Section 4 */}
        <StatsComponent />
        {/* Section 5 */}
        <section className='mx-auto flex flex-col items-center mb-[140px] justify-center gap-5'>
            <LearningGrid />
            <ContactFormSection />
        </section>
        <section>
            <div>
                Reviews from other learners
                {/* <ReviewSlider /> */}
            </div>
            <Footer/>
        </section>

    </div>
  )
}

export default About
