'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import { FaRegCircleXmark } from "react-icons/fa6";
import { useChat } from '../context/ChatContext';
import { get_todays_date, readable_day } from './helper';

const Welcome_navigation = () => {
    const {close_welcome_nav, setClose_welcome_nav, user_role, setUser_role} = useChat()
    const router = useRouter()

    return (
        <div className="w-full ">
            {!close_welcome_nav && <div className="w-full h-[50px] px-[75px] flex items-center justify-between bg-blue-600">
                <p className="text-md text-white font-semibold">Welcome to your FintazaPdl {user_role == 'admin' && 'Admin'} Porter</p>

                <p className="text-md text-white font-[500]"> {readable_day(Number(get_todays_date()) * 1000)} </p>

                {/* <span className="w-[20px] h-[20px] cursor-pointer " onClick={()=> setClose_welcome_nav(!close_welcome_nav)} >
                    <FaRegCircleXmark size={'100%'} className='text-white hover:text-red-500' />
                </span> */}
            </div>}
        </div>
    )
}

export default Welcome_navigation