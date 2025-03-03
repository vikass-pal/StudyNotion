import React from 'react'


const Stats = [
    {count: "5K", label:"Active Stuents"},
    {count: "10+", label:"Mentors"},
    {count: "200+", label:"Courses"},
    {count: "50+", label:"Awards"},
]


const StatsComponent = () => {
  return (
   <section>
    <div className=' w-full h-[260px] flex items-center justify-center p-7 bg-richblack-800  mt-[80px] mb-[50px]' >
        <div className='flex gap-60 '>
            {
               Stats.map((data, index) => {
                return (
                    <div key={index}>
                        <h1 className='text-richblack-5 text-4xl font-bold'>
                            {data.count}
                        </h1>
                        <h1 className='text-richblack-100 text-sm mt-3'>
                            {data.label}
                        </h1>
                    </div>
                )
               }) 
            }
        </div>
    </div>
   </section>
  )
}

export default StatsComponent;