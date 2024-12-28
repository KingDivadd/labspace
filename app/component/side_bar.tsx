'use client'
import React, {useState, useEffect} from 'react'
import { useChat } from '../context/ChatContext';
import { MdDashboard, MdLogout, MdOutlineAddTask, MdSettings } from 'react-icons/md';
import { FaTasks, FaTrashAlt, FaUsers } from 'react-icons/fa';
import { useRouter } from 'next/navigation';


const Side_bar = () => {
    const router = useRouter()
    const { close_welcome_nav, route_nav, setRoute_nav, user_role, trigger_notification, setTrigger_notification, showNotification, setShowNotification, loggedInUser, notification, setNotification } = useChat();
    
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

    function handle_logout(){
        localStorage.clear()
        sessionStorage.clear()
        router.push('/auth/login')
    }


    return (
        <div className="relative w-full h-full flex flex-col items-start justif-start gap-[50px] bg-white  ">
            <span className="h-[60px] pl-[20px] flex items-center justify-start gap-3 w-full ">
                <span className="h-[40px] w-[40px] font-[600] text-white bg-blue-500 rounded-[40px] flex items-center justify-center ">
                    <MdOutlineAddTask size={22} className='' />
                </span>
                <span className="flex items-center justify-center">
                    <p className="font-bold text-2xl md:text-3xl text-blue-500 ">Labp</p>
                    <p className="font-bold text-2xl md:text-3xl text-sky-500">space</p>
                </span>
            </span>

            <div className="w-full h-auto  flex-col px-[20px] ">
                <div className=" h-auto flex flex-col items-center gap-[10px]  overflow-x-auto" style={{height: 'fit-content'}}>
                    <span className={route_nav === 'dashboard' ? 'active-nav-box' : 'nav-box'} onClick={() => {select_nav('dashboard') }}>
                        <MdDashboard />
                        <p className=" text-center"> Dashboard </p>
                    </span>

                    <span className={route_nav === 'task' ? 'active-nav-box' : 'nav-box'} onClick={() => {select_nav('task') }}>
                        <FaTasks />
                        <p className="text-sm text-center">Projects</p>
                    </span>

                    {loggedInUser.is_admin && <span className={route_nav === 'team' ? 'active-nav-box' : 'nav-box'} onClick={() => {select_nav('team') }}>
                        <FaUsers />
                        <p className="text-sm text-center"> Team </p>
                    </span>}

                    {loggedInUser.is_admin && <span className={route_nav === 'trash' ? 'active-nav-box' : 'nav-box'} onClick={() => {select_nav('trash') }}>
                        <FaTrashAlt />
                        <p className="text-sm text-center"> Trash </p>
                    </span>}

                </div>

            </div>
            <div className="absolute bottom-[25px] left-0 w-full flex flex-col items-start justify-end gap-[10px] px-[20px]">

                <span className={'logout-box'} onClick={handle_logout} >
                    <MdLogout />
                    <p className=" text-center"> Logout </p>
                </span>
            </div>

        </div>
    )
}

export default Side_bar