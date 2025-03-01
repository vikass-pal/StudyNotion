import React, { useState } from 'react'
import {sidebarLinks} from "../../../data/dashboard-links" 
import {logout} from "../../../services/operations/authAPI"
import { useSelector } from 'react-redux'
import { sidebarLinks } from '../../../data/dashboard-links'

const Sidebar = () => {
    const {user, loading:profileLoading} = useSelector((state) => state.profile)
    const { loading:authLoading} = useSelector((state) => state.auth)

    if(profileLoading || authLoading) {
        return (
            <div className='mt-10'>Loading...</div>
        )
    }
  return (
    <div> 
        <div className='flex m-w-[222px] flex-col border-r-[1px] border-r-richblack-700 
        h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
            {
                sidebarLinks.map((link) => {
                     if(link.type && user?.accountType !== link.type) return null;
                     return(
                        <SidebarLinks link={link} iconName={link.icon} key={link.id}  />
                     )
                })
            }
        </div>

    </div>
  )
}

export default Sidebar