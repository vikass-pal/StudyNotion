import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {categories} from '../services/apis'
import Footer from "../components/core/HomePage/common/footer"
import {apiConnector} from '../services/apiconnector'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import Course_Card from '../components/core/Catalog/Course_Card'
import {getCatalogPageData} from '../services/pageAndComponentData'
import { fetchCourseCategories } from './../services/operations/courseDetailsAPI';
import { useState } from 'react'


const Catalog = () => {

  const {catalogName} = useParams();
   const [active, setActive] = useState(1)
  const [loading, setLoading] = useState(false);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

//   useEffect(() => {
//     ; (async () => {
//         try {
//             const res = await fetchCourseCategories();
//             const category_id = res.filter(
//                 (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
//             )[0]._id
//             setCategoryId(category_id)
//         } catch (error) {
//             console.log("Could not fetch Categories.", error)
//         }
//     })()
// }, [catalogName])

useEffect(() => {
  const getCategories = async () => {
    const res = await apiConnector("GET",categories.CATEGORIES_API);
    const category_id = res?.data?.data?.filter(
                      (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
                  )[0]._id;
                  console.log("Category ID:", category_id); 
                  setCategoryId(category_id);

  }
  getCategories();
},[catalogName]);


// useEffect(() => {
//     if (categoryId) {
//         ; (async () => {
//             setLoading(true)
//             try {
//                 const res = await getCatalogPageData(categoryId)
//                 setCatalogPageData(res)
//             } catch (error) {
//                 console.log(error)
//             }
//             setLoading(false)
//         })()
//     }
// }, [categoryId])

useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        console.log("Catalog Page Data:", res); // Debugging API response
        setCatalogPageData(res);
      } catch (error) {
        console.log("Error fetching catalog page data:", error);
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
}, [categoryId])


  return (
    <div className='text-white '>

      <div className='flex  bg-richblack-800 p-6  '>
      <div className='mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ' >
        <p className='text-sm text-richblack-100 mt-5'>{`Home  / Catalog  / `}
        <span className='text-yellow-100'>{catalogPageData?.selectedCategory?.name}</span></p>
        <p className='text-2xl font-bold'>{catalogPageData?.selectedCategory?.name}</p>
        <p className='text-sm text-richblack-100'>{catalogPageData?.selectedCategory?.description}</p>
     </div>
     <div className='w-[280px] h-[300px] p-10 flex flex-col items-center bg-richblack-800'>
      <h3 className='font-bold text-xl'>Related Resourses</h3>
      <ul className='text-richblack-200 text-[15px] mt-3 flex flex-col items-start list-disc pl-5'>
        <li>Doc Python</li>
        <li>Cheatsheets</li>
        <li>Articles</li>
        <li>Community Forums</li>
        <li>Projects</li>
      </ul>
     </div>

      </div>
     
    
     <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading text-2xl font-bold text-richblack-100 mb-8">Courses to get you started</div>
                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <p
                        className={`px-4 py-2 ${active === 1
                            ? "border-b border-b-yellow-25 text-yellow-25"
                            : "text-richblack-50"
                            } cursor-pointer`}
                        onClick={() => setActive(1)}
                    >
                        Most Populer
                    </p>
                    <p
                        className={`px-4 py-2 ${active === 2
                            ? "border-b border-b-yellow-25 text-yellow-25"
                            : "text-richblack-50"
                            } cursor-pointer`}
                        onClick={() => setActive(2)}
                    >
                        New
                    </p>
                </div>
                <div>
                    <CourseSlider
                        Courses={catalogPageData?.selectedCategory?.courses}
                    />
                </div>
            </div>
     {/* section2 */}
     <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
    <div className='text-2xl font-bold text-richblack-100 mb-8'>Top Courses in {catalogPageData?.selectedCategory?.name} </div>
      <div>
        {/* <CourseSlider  Courses={catalogPageData?.data?.differentCategory?.courses} /> */}
        <CourseSlider Courses={catalogPageData?.selectedCategory?.courses || []} />
        {console.log("Courses in selectedCategory:", catalogPageData?.selectedCategory?.courses)}

      </div>
     </div>
     {/* section 3 */}
      <div className=" mx-auto box-content  px-4 py-12 w-[1200px] p-5 gap-x-2">
        <div className='section_heading text-2xl font-bold text-richblack-100 mb-8'>Frequently Bought</div>
        <div className='grid grid-cols-1 lg:grid-cols-2'> 
          {
            catalogPageData?.mostSellingCourses?.slice(0,4).
            map((course, index) => {
              return (
                <Course_Card course={course} key={index} Height={'h-[300px]'} />

              )
              
            })
          }
        </div>

      </div>

          <Footer />

    </div>
  )
}

export default Catalog