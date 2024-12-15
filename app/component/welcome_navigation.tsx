'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import { FaRegCircleXmark } from "react-icons/fa6";
import { useChat } from '../context/ChatContext';
import { get_todays_date,  Show_current_date_time } from './helper';

const Welcome_navigation = () => {
    const {close_welcome_nav, setClose_welcome_nav, user_role, setUser_role, loggedInUser} = useChat()
    const router = useRouter()

    return (
        <div className="w-full ">
            {!close_welcome_nav && <div className="w-full h-[50px]  px-[20px] md:px-[55px] lg:px-[75px]  flex items-center justify-between bg-blue-600">
                <p className="text-md text-white font-semibold w-full truncate text-ellipsis">Welcome to your Labpspace {loggedInUser.is_admin  && 'Admin'} Porter</p>

                <span className="max-sm:hidden text-md text-white font-[500] whitespace-nowrap"> <Show_current_date_time /> </span>

                {/* <span className="w-[20px] h-[20px] cursor-pointer " onClick={()=> setClose_welcome_nav(!close_welcome_nav)} >
                    <FaRegCircleXmark size={'100%'} className='text-white hover:text-red-500' />
                </span> */}
            </div>}
        </div>
    )
}

export default Welcome_navigation