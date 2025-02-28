import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightedText from '../components/core/HomePage/HighlightedText';
import CTAButton from '../components/core/HomePage/Button';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import InstuctorSection from '../components/core/HomePage/InstuctorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/core/HomePage/common/footer';

export const Home = () => {
  return (
      <div>
        {/* section 1 */}
        <div className=" group relative mx-auto flex flex-col w-11/12 items-center 
        text-white justify-between max-w-maxContent ">

            <Link to={"/signup"}>
            <div className=" mt-16 p-1 mx-auto rounded-full text-richblack-200 bg-richblack-800 transition-all
            duration-200 hover:scale-95 group-hover:bg-richblack-900 w-fit  ">
                <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]'> 
                    <p>Become an Instructor</p>
                    <FaArrowRight />
                </div>
            </div>
            </Link>

            <div className='font-semibold text-4xl items-center mt-7'>
              Empower your Future with 
              <HighlightedText text="Coding Skills" />
            </div>
            <div className='w-[90%] mt-4 text-center text-lg font-bold text-richblack-300'>
                With our coding courses, you can learn at your own pace, from anywhere in world, and access 
                to a wealth of resources, including hands-on projects, and personalized feedback from instructors
              </div>

              <div className='flex gap-5 mt-5'>
                <CTAButton active={true} linkto={"./signup"} >
                Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"./login"} >
                  Book a Demo
                </CTAButton>
              </div>

              
  
              <div className='shadow-blue-200 mx-3 my-12 relative '>
                <video muted autoPlay loop >
                  <source src={Banner} type='video/mp4'/>
                </video>
              </div>



            

        

              
              {/* Code Section 1 */}
              <div>
                <CodeBlocks
                position={"lg:flex-row"}
                heading={
                  <div className='text-4xl font-semibold'>
                    Unlock your 
                    <HighlightedText text={"Coding Potential"} />
                    With our online courses
                  </div>
                }
                subheading={
                  " Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
                }
                ctabtn1={{
                    active: true, // Changed from "true" (string) to true (boolean)
                    linkto: "/signup",
                    btnText: "try it yourself",
                }}
                ctabtn2={{
                    active: false,
                    linkto: "/login",
                    btnText: "Learn more",
                }}
                codeblock={`<<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet" \n href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n<nav><a href="one/">One</a><a href="two/">Two</a>\n<a href="three/">Three</a>`}
                codeColor={"text-yellow-25"}
                />
              </div>
             
              <div>
                <CodeBlocks
                position={"lg:flex-row-reverse"}
                heading={
                  <div className='text-4xl font-semibold'>
                    Unlock your 
                    <HighlightedText text={"Coding Potential"} />
                    With our online courses
                  </div>
                }
                subheading={
                  " Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
                }
                ctabtn1={{
                    active: true, // Changed from "true" (string) to true (boolean)
                    linkto: "/signup",
                    btnText: "try it yourself",
                }}
                ctabtn2={{
                    active: false,
                    linkto: "/login",
                    btnText: "Learn more",
                }}
                codeblock={`<<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title><link rel="stylesheet" href="styles.css">\n</head>\n<body>\nh1><a href="/">Header</a>\n<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>`}
                codeColor={"text-yellow-25"}
                />
              </div>
              <ExploreMore/>
        </div>
          {/* section 2 */}
          <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='homepage_bg h-[333px] '>
        
                  <div className='w-11/12 max-w-maxContent flex flex-col  items-center gap-5 mx-auto '>
                  <div className='h-[150px]'>

                  </div>
                  <div className='flex flex-row gap-7 text-white mt-14'>
                    <CTAButton active={true} linkto={"./signup"}>
                    <div className='flex items-center justify-between gap-3 '>
                    Explore Full Catalog
                    <FaArrowRight/>
                    </div>
                    
                    </CTAButton>

                    <CTAButton active={false} linkto={"./signup"}>
                    Learn More
                      
                    </CTAButton>

                  </div>

                  </div>

                </div>
                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
          <div className='flex flex-row gap-5 '>
            <div className='text-4xl font-semibold w-[45%]'>
                Get the skills you need for a 
                <HighlightedText text={"Job that is in demand"}/>
                  
               
            </div>
            <div className='flex flex-col gap-10 w-[40%] items-start mb-10 mt-[95px]'>
              <div className='text-[16px]'>
              The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.

              </div>
              <CTAButton active={true} linkto={"/signup"}>
              <div>
                Learn more
              </div>
              </CTAButton>
            </div>
          </div>

          <TimelineSection/>

          <LearningLanguageSection/>
          </div>

         
          
          </div>
          
        

          {/* section 3 */}
          <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
                <InstuctorSection/>
                <h2 className='text-center font-semibold text-4xl mt-10 '>Review from other Learners</h2>
                {/* Review slider here */}
          </div>

           <Footer/>
    </div>
  )
}
export default Home;
