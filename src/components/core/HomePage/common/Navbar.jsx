import React from 'react'
import logo from "../../../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from "../../../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaShoppingCart } from "react-icons/fa";
import { categories } from '../../../../services/apis'
import { apiConnector } from '../../../../services/apiconnector'
import ProfileDropDown from '../Auth/ProfileDropDown'
import { useState } from 'react'
import { useEffect } from 'react'
import { IoIosArrowDropdown } from "react-icons/io";

const subLinks = [{
  title: "python",
  link:"/catelog/python"
},
{
  title: "web-dev",
  link:"/catelog/webdevelopment"
}
  
]

const Navbar = () => {

  const {token} = useSelector((state)=> state.auth);
  const {user} = useSelector((state) => state.profile);
  const {totalItems} = useSelector((state) => state.cart);
  // const [subLinks, setSubLinks] = useState([]);

  // const fetchLinks =  async() => {
  //   try{
  //     const result = await apiConnector("GET", categories.CATEGORIES_API);
  //     console.log("Printing Sublinks result:", result);
  //     setSubLinks(result.data.data);
  //   } catch(error) {
  //     console.log("could not fetch the category list");
  //   }
  // }

  // useEffect( () => {
  //  fetchLinks();
  // }, [])



const location = useLocation();
  const matchRoute = (route) => {
     return matchPath({path:route}, location.pathname)
  }
  return (
    <div className='flex h-14 items-cente justify-center border-b-[1px] border-b-richblack-600'>
      <div className='w-11/12 flex max-w-maxContent items-center justify-between'>
      <Link to="/">
      <img src={logo} width={160} height={42} loading="lazy" />
      </Link>
      {/* nav links */}
      <nav>
        <ul className='flex gap-x-6 text-richblack-25'>
          {
            NavbarLinks.map(
              (link, index) => (
                 <li key={index}>
                  {
                    link.title === "Catalog" ? (
                    <div className=' relative flex items-center gap-2 group'>
                      <p>{link.title}</p>
                      <IoIosArrowDropdown />
                      <div className='invisible absolute left-[50%] top-[50%] 
                      flex flex-col transition-all duration-200 rounded-md p-4 bg-richblack-5
                       text-richblack-900 opacity-0 translate-x-[-50%] translate-y-[80%]
                      group-hover:visible group-hover:opacity-100 lg:w-[300px]'>

                        <div className='absolute left-[50%] top-0 w-6 h-6 rotate-45 translate-y-[-45%] translate-x-[80%]  rounded bg-richblack-5  '>

                        </div>
                        {
                          subLinks.length ? (
                            subLinks.map((subLink, index) => (
                              <Link to={`${subLink.link}`} key={index} >
                              <p>{subLink.title}</p>
                              
                              </Link>
                            ))
                          ) : (<div></div>)
                        }

                      </div>
                    </div>
                  ) : (
                      <Link to={link?.path}>
                        <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                          {link.title}
                        </p>
                      </Link>
                    )
                  }
                </li>
              )
            )
              
            
          }
        </ul>
      </nav>
      {/* LOgin/ signup/ dashboard */}
      <div className='flex items-center gap-3'>
        {
          user && user?.accountType != "Instructor" && (
            <Link to="/dashboard/cart" className='relative'>
              <FaShoppingCart />
              {
                totalItems > 0 && (
                  // HW styling karna hai
                  <span>
                    {totalItems}
                  </span>
                )
              }
            </Link>
          )
        }
        {
          token === null && (
            <Link to="/login">
              <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[12px] text-richblack-5 rounded-md'>
                Log in
              </button>
            </Link>
          )
        }
        {
          token === null && (
            <Link to="/signup">
              <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[12px] text-richblack-5 rounded-md'>
                Sign Up
              </button>
            </Link>
          )
        }
        {
          token !== null && <ProfileDropDown/>
        }



      </div>



      </div>
      
    </div>
  )
}

export default Navbar