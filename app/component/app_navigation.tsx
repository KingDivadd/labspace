'use client'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import { HiOutlinePower } from "react-icons/hi2";
import { useChat } from '../context/ChatContext';



const App_navigation = () => {
    const router = useRouter()
    const {user_role, setUser_role} = useChat()

    //  now this should be removed, it was added as i dont have a workind db
    
// useEffect(() => {
//     const user_role = localStorage.getItem('user_role')
//     if (!user_role || user_role == null || !['admin', 'single_user', 'business_user'].includes(user_role) ){
//         router.push('/auth/login')
//     }else{
//         setuser_role(user_role)
//     }
// }, [])

    function logout() {
        sessionStorage.clear()
        localStorage.clear()
        router.push('/auth/login')
    }
    return (
        <div className="w-full min-h-[100px] px-[75px] flex items-center justify-center  ">
            <div className="w-full h-full flex items-center justify-between">
                <div className="flex item-center justify-center ">
                    <p className="font-extrabold text-3xl text-blue-600 ">Fintaza</p>
                    <p className="font-extrabold text-3xl text-amber-600">Pdl</p>
                </div>

                <div className="h-full flex items-center justify-end gap-10 ">
                    <span className="h-[55px] flex items-center  ">
                        
                        {user_role == "admin"  && 

                        <p className="text-md flex items-end font-[400] ">[ Admin Account ]</p>}
                        
                    </span>

                    <button className="px-[20px] h-[55px] flex items-center justify-center rounded-[3px] gap-[5px]  text-red-500 cursor-pointer border border-red-500 text-red-600 hover:text-white hover:bg-red-500 " onClick={logout}>
                        <span className="h-[22.5px] w-[22.5px] "> <HiOutlinePower size={'100%'} /> </span>
                        <p className="text-md font-medium">Logout</p>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default App_navigation