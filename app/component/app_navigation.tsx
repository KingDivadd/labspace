'use client'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import { HiOutlinePower } from "react-icons/hi2";
import { useChat } from '../context/ChatContext';



const App_navigation = () => {
    const router = useRouter()
    const {user_role, setUser_role} = useChat()


    function logout() {
        sessionStorage.clear()
        localStorage.clear()
        router.push('/auth/login')
    }
    return (
        <div className="w-full min-h-[80px] px-[20px] md:px-[55px] lg:px-[75px] flex items-center justify-center  ">
            <div className="w-full h-full flex items-center justify-between ">
                <div className="flex item-center justify-center ">
                    <p className="font-extrabold text-2xl md:text-3xl text-blue-600 ">Labp</p>
                    <p className="font-extrabold text-2xl md:text-3xl text-sky-500">space</p>
                </div>

                <div className="h-full flex items-center justify-end gap-10 ">
                    <span className="max-sm:hidden h-[55px] flex items-center  ">
                        
                        {user_role == "admin"  && 

                        <p className="text-md flex items-end font-[400] ">[ Admin Account ]</p>}
                        
                    </span>

                    <button className="px-[20px] h-[45px] flex items-center justify-center rounded-[3px] gap-[5px]  text-red-500 cursor-pointer border border-red-500 text-red-600 hover:text-white hover:bg-red-500 " onClick={logout}>
                        <span className="h-[20px] w-[20px] "> <HiOutlinePower size={'100%'} /> </span>
                        <p className="max-sm:hidden text-md font-medium">Logout</p>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default App_navigation