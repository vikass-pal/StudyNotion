import React, { useState } from 'react';
import { sidebarLinks } from "../../../data/dashboard-links"; 
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from 'react-redux';
import SidebarLinks from './SidebarLinks';
import { VscSettingsGear, VscSignOut } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../core/HomePage/common/ConfirmationModal';

const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if (profileLoading || authLoading) {
        return (
            <div className='mt-10'>Loading...</div>
        );
    }
    return (
        <div> 
            <div className='flex max-w-[222px] flex-col border-r-[1px] border-r-richblack-700 
            h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 '>
                {
                    sidebarLinks.map((link) => {
                        if (link.type && user?.accountType !== link.type) return null;
                        return (
                            <SidebarLinks link={link} iconName={link.icon} key={link.id} />
                        );
                    })
                }
                <div className='mx-auto h-[1px] bg-richblack-600 w-full'></div>

                <SidebarLinks 
                    link={{ name: "Settings", path: "dashboard/settings" }}
                    iconName="VscSettingsGear"
                />
                <button onClick={() => setConfirmationModal({
                    text1: "Are you Sure?",
                    text2: "You Will be logged out of your Account",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null),
                })} className='text-white flex '>
                    <div className='flex mx-auto gap-x-2 -translate-x-5 mt-3'>
                        <VscSignOut className="text-lg" />
                        <span>Logout</span>
                    </div>
                </button>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
}

export default Sidebar;
