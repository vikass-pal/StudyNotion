import React from 'react';
import CTAButton from '../HomePage/Button';
import HighlightedText from './HighlightedText';
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
        {/* Section 1 */}
        <div className='w-[50%] flex flex-col gap-8'>
        {heading}
        <div className='text-richblack-300 font-bold'> 
            {subheading}
        </div>
        <div className='flex gap-7 mt-7'>
        <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className='flex gap-2 items-center'>
                {ctabtn1.btnText}
                <FaArrowRight/>
            </div>
        </CTAButton>

        <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
        </CTAButton>
        </div>
        </div>
        <div className="h-fit flex flex-row text-[10px] w-[100%] py-4 lg:">
  <div className="items-center flex flex-col w-[5%] font-inter font-bold">
    {/* <p>1</p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
    <p>5</p>
    <p>6</p>
    <p>7</p>
    <p>8</p>
    <p>9</p>
    <p>10</p>
    <p>11</p> */}
  </div>

  {/* Wrapper for TypeAnimation with Blurry Gradient */}
  <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1 relative`}>
    {/* Gradient Background - Limited to TypeAnimation */}
    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-xl rounded-lg"></div>

    {/* TypeAnimation Content */}
    <div className="relative z-10 p-4">
      <TypeAnimation
        sequence={[codeblock, 2000, ""]}
        repeat={Infinity}
        cursor={true}
        style={{
          whiteSpace: "pre-line",
          display: "block",
          overflowX: "hidden",
          fontSize: "16px",
        }}
        omitDeletionAnimation={true}
      />
    </div>
  </div>
</div>
    </div>
  );
}

export default CodeBlocks;
