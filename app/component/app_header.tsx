'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useChat } from '../context/ChatContext';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { get_auth_request } from '../api';
import Loading from './loading';
import NotificationComponent from './notification'
import { Show_current_date_time, getInitials } from './helper';
import { MdDashboard, MdLogout, MdOutlineAddTask } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from "react-icons/io5";
import { FaTasks, FaTrashAlt } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';

const App_header = () => {
    const [show_side_bar, setShow_side_bar] = useState(false)
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [show_profile_info, setShow_profile_info] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownRef2 = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { close_welcome_nav, route_nav, setRoute_nav, user_role, trigger_notification, setTrigger_notification, showNotification, setShowNotification, loggedInUser, notification, setNotification } = useChat();

    useEffect(() => {
        const x_id_key = localStorage.getItem('x-id-key')
        if (x_id_key) {
            handle_trigger_notification()
        }else{
            router.push('/auth/login')
        }
    }, [trigger_notification])

    async function handle_trigger_notification( ) {

            try {
                
                const response = await get_auth_request('app/unread-notification')                

                if (response.status == 200 || response.status == 201){

                    
                    setNotification(response.data)

                }else if(response.response.status == 401){
                    router.push('/auth/login')
                }
                else{
                    showAlert(response.response.data.err, "error")
                }
            } catch (err:any) {
                showAlert('An unexpected error occurred. Please try again later.', 'error');
            }
        
    }

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick2 = (event: MouseEvent) => {
            if (
                dropdownRef2.current &&
                !dropdownRef2.current.contains(event.target as Node)
            ) {
                setShow_profile_info(false);
            }
        };
    
        document.addEventListener('mousedown', handleOutsideClick2);
    
        // Prevent closing when clicking inside the dropdown
        if (dropdownRef2.current) {
            dropdownRef2.current.addEventListener('mousedown', (e) => {
                e.stopPropagation();
            });
        }
    
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick2);
    
            if (dropdownRef2.current) {
                dropdownRef2.current.removeEventListener('mousedown', (e) => {
                    e.stopPropagation();
                });
            }
        };
    }, []);
    // 

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowNotification(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const showAlert = (message: string, type: string) => {
        setAlert({ message, type });
        setTimeout(() => {
            setAlert({ message: '', type: '' });
        }, 3000);
    };

    useEffect(() => {
        const route = sessionStorage.getItem('nav')
        if (!route){setRoute_nav('dashboard')}
        else{
            setRoute_nav(route)
        }
    }, [])
    
    const select_nav = (item: string) => {
        sessionStorage.setItem('nav', item);
        setRoute_nav(item);
    };

    
    useEffect(() => {
        const route = sessionStorage.getItem('nav')
        if (!route){setRoute_nav('dashboard')}
        else{
            setRoute_nav(route)
        }
    }, [])

    function handle_logout() {
        localStorage.clear()
        sessionStorage.clear()
        router.push('/auth/login')
    }



    return (
        <div className=" relative w-full max-xs:h-[50px] h-[60px] flex items-center justify-beteen px-[10px] bg-white gap-5 overflow-visible"  ref={dropdownRef}>
            <div className="w-full flex items-center justify-start">
                <span className="lg:hidden h-[40px] w-[40px] font-[600] text-white bg-blue-500 rounded-[40px] flex items-center justify-center ">
                    <MdOutlineAddTask size={22} className='' />
                </span>
            </div>

            <div className="w-full flex items-center justify-end gap-5">

                <span className=" max-xs:hidden text-md whitespace-nowrap"> <Show_current_date_time /> </span>

                <div className="relative flex items-center justify-end gap-5 " >
                    <button className="  rounded-[3px] text-sm whitespace-nowrap flex items-center justify-center gap-2 relative" >
                        <span className="h-[20px] w-[20px]">
                            <IoMdNotificationsOutline size={20} />
                        </span>
                        
                            {(notification.number_of_unread_notification > 0) && <span className="h-[5px] w-[5px] bg-red-500 absolute top-[-1px] right-[2.5px] rounded-[15px] "></span>}
                    </button>

                </div>

                <div className="max-xs:hidden relative flex items-center">

                    <span className="h-[40px] w-[40px] rounded-[40px] bg-blue-500 flex items-center justify-center text-white text-sm font-[500] cursor-pointer" onClick={() => setShowNotification(!showNotification)}>
                        {loggedInUser.first_name && getInitials(`${loggedInUser.first_name} ${loggedInUser.last_name}`)}
                    </span>

                    {showNotification && 
                    <ul className="absolute right-0 top-[45px] z-10 bg-white rounded-[3px] shadow-lg border border-slate-100 p-[10px]" >
                        <div className=" min-w-[300px] bg-white rounded-[5px] border border-slate-200 z-10 p-4">
                            <div className="flex items-center gap-3">
                                {/* Avatar in Dropdown */}
                                <div className="relative">
                                    <div className={`w-[50px] h-[50px] rounded-full ${ 'bg-blue-500 text-white flex items-center justify-center' }`}
                                        style={{
                                            backgroundImage: `url()` ,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    >
                                        {<span className="text-sm font-semibold">{getInitials(`${loggedInUser.first_name} ${loggedInUser.last_name}`)}</span>}
                                    </div>
                                    {/* Green Dot on Dropdown Avatar */}
                                    <span
                                        className={`absolute top-0 right-[2.5px] w-[10.5px] h-[10.5px] rounded-full border-2 border-white ${
                                            loggedInUser.is_active ? 'bg-green-500' : 'bg-gray-300'
                                        }`}
                                        title={loggedInUser.is_active ? 'Active' : 'Suspended'}
                                    ></span>
                                </div>

                                {/* User Info */}
                                <div className="flex flex-col gap-[2px]">
                                    <span className="flex items-center justify-between gap-2">
                                        <h4 className="text-md text-slate-600 font-[600] whitespace-nowrap">{`${loggedInUser.first_name} ${loggedInUser.last_name}`}</h4>
                                        {loggedInUser.is_admin && <p className="text-sm text-slate-600 font-[500]">(Admin)</p>}
                                    </span>
                                    <p className="text-sm text-slate-600 font-[500] whitespace-nowrap">{loggedInUser.email}</p>
                                    <p className="text-sm text-slate-600 font-[500]">{loggedInUser.title}</p>
                                </div>
                            </div>
                        </div>

                        <li className="h-[45px] flex items-center hidden">
                            <button className="h-[30px] bg-blue-500 hover:bg-blue-600 text-white text-sm px-5 rounded-[30px] ">View Profile</button>
                        </li>
                        <li className="h-[45px] flex items-center justify-start gap-2 hover:text-red-500 " onClick={handle_logout}>
                            <MdLogout size={18} />
                            <p className="text-md cursor-pointer">Logout</p>
                        </li>
                    </ul>}

                </div>

                <span className="lg:hidden h-[40px] w-[40px] font-[600] rounded-[40px] flex items-center justify-center " onClick={()=> setShow_side_bar(true)}>
                    <FiMenu size={22} className='' />
                </span>
            </div>

            <div className={show_side_bar ? 'lg:hidden show-side-bar' : 'lg:hidden hide-side-bar'}>
                <div className="relative w-full h-full flex flex-col items-start justif-start gap-[50px] bg-white ">

                    <span className="h-[60px] w-full px-[10px] flex items-center justify-end">
                        <span className="lg:hidden h-[40px] w-[40px] font-[600] rounded-[40px] flex items-center justify-center " onClick={()=> setShow_side_bar(false)}>
                            <IoClose  size={22} />
                        </span>
                    </span>

                    <div className="w-full h-auto  flex-col px-[10px] xl:px-[20px] ">
                        <div className=" h-auto flex flex-col items-center gap-[10px] overflow-visible" style={{height: 'fit-content'}}>
                            <span className={route_nav === 'dashboard' ? 'active-nav-box' : 'nav-box'} onClick={() => {select_nav('dashboard'); setShow_side_bar(false) }}>
                                <MdDashboard size={17} />
                                <p className=" text-sm text-center"> Dashboard </p>
                            </span>

                            <span className={route_nav === 'project' ? 'active-nav-box' : 'nav-box'} onClick={() => {select_nav('project'); setShow_side_bar(false) }}>
                                <FaTasks size={17} />
                                <p className=" text-sm text-center">Projects</p>
                            </span>

                            {loggedInUser.is_admin && <span className={route_nav === 'team' ? 'active-nav-box' : 'nav-box'} onClick={() => {select_nav('team'); setShow_side_bar(false) }}>
                                <FaTrashAlt size={16} />
                                <p className=" text-sm text-center"> Team </p>
                            </span>}
                            

                            {loggedInUser.is_admin && <span className={route_nav === 'trash' ? 'active-nav-box' : 'nav-box'} onClick={() => {select_nav('trash'); setShow_side_bar(false) }}>
                                <FaTrashAlt size={16} />
                                <p className=" text-sm text-center"> Trash </p>
                            </span>}

                        </div>

                    </div>

                    <div className="absolute bottom-[25px] left-0 w-full flex flex-col items-start max-xl:items-center justify-end gap-[10px] px-[10px]  xl:px-[20px]">

                        <span className={'logout-box'} onClick={handle_logout} >
                            <MdLogout size={17} />
                            <p className=" text-sm text-center"> Logout </p>
                        </span>
                    </div>
                </div>

            </div>



        </div>

    );
};

export default App_header;
