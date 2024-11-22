'use client'
import React, {useState, useEffect} from 'react'
import { useChat } from '../context/ChatContext'

const User_profile_page = () => {
    const {profileToggle, setProfileToggle} = useChat()

    useEffect(() => {
        const item = localStorage.getItem('profile_toggle')
        if (item) {
            const toggles = JSON.parse(item)
        }
    }, [])


    function handle_toggle(data:string) {

        setProfileToggle({...profileToggle, [data]: !profileToggle[data as keyof typeof profileToggle]})
        localStorage.setItem('profile_toggles', JSON.stringify(profileToggle))
        
    }

    return (
        <div className='w-full flex items-start justify-center px-[75px] py-10 '  >
            <div className="w-full flex flex-col justify-start items-center gap-10">

                {/* personal information section */}
                <div className="w-full flex items-center justify-start gap-[50px]  ">
                    <span className="w-[500px] h-[300px] rounded-[5px] shadow-md border border-slate-200">

                    </span>
                    
                    <div className="flex-1 flex flex-col items-start justify-start gap-5">
                        <span className="flex items-center justify-start gap-10">
                            <p className="text-sm font-[500] w-[75px]  text-slate-700">Full Name</p>
                            <p className="text-md font-[600] text-slate-700 ">Benjamin Franklin</p>
                        </span>
                        
                        <span className="flex items-center justify-start gap-10">
                            <p className="text-sm font-[500] w-[75px] text-slate-700">Email</p>
                            <p className="text-md font-[600] text-slate-700 ">benjamin.franklin@gmail.com</p>
                        </span>

                        <span className="flex items-center justify-start gap-10">
                            <p className="text-sm font-[500] w-[75px] text-slate-700">Phone</p>
                            <p className="text-md font-[600] text-slate-700 ">+123 804 5590 7610</p>
                        </span>

                        <span className="flex items-center justify-start gap-10">
                            <p className="text-sm font-[500] w-[75px] text-slate-700">Address</p>
                            <p className="text-md font-[600] text-slate-700 ">14474 Johnson Rd
                            Summers, Arkansas(AR), 72769</p>
                        </span>

                        <div className="w-full flex items-center justify-start gap-10">
                            <span className="flex items-center justify-start gap-10">
                                <p className="text-sm font-[500] w-[75px] text-slate-700">Zip</p>
                                <p className="text-md font-[600] text-slate-700 ">12345</p>
                            </span>
                            <span className="flex items-center justify-start gap-5">
                                <p className="text-sm font-[500] w-[50px] text-slate-700">City</p>
                                <p className="text-md font-[600] text-slate-700 ">Summers</p>
                            </span>
                            <span className="flex items-center justify-start gap-5">
                                <p className="text-sm font-[500] w-[50px] text-slate-700">State</p>
                                <p className="text-md font-[600] text-slate-700 ">Arkansas</p>
                            </span>
                        </div>

                        <span className="flex items-center justify-start gap-10">
                            <p className="text-sm font-[500] w-[75px] text-slate-700">D.O.B</p>
                            <p className="text-md font-[600] text-slate-700 ">19 Feburary, 1988</p>
                        </span>

                    </div>

                </div>

                {/* Account information */}
                <div className="w-full flex flex-wrap items-center justify-between gap-5 h-[70px] rounded-[3px] shadow-md border border-slate-200 px-[15px] ">
                    <span className="flex items-center justify-start gap-5">
                        <p className="text-md font-[500] w-[150px]  text-slate-700">Account Number</p>
                        <p className="text-lg font-[600] text-slate-700 ">1234567890</p>
                    </span>
                    <span className="flex items-center justify-start gap-5">
                        <p className="text-md font-[500] w-[150px]  text-slate-700">Registration Date</p>
                        <p className="text-lg font-[600] text-slate-700 ">20 August, 2005</p>
                    </span>
                    <span className="flex items-center justify-start gap-5">
                        <p className="text-md font-[500] w-[150px]  text-slate-700">Account Status</p>
                        <p className="text-lg font-[600] text-teal-700 ">Active</p>
                    </span>
                </div>

                {/* changee  password */}
                <div className="w-full flex flex-wrap items-center justify-between gap-10">
                    <div className="w-auto flex items-center justify-start gap-10">
                        <span className="w-[200px] "> <input type="text" placeholder='Old Password' className='input-type-1' /> </span>
                        <span className="w-[200px] "> <input type="text" placeholder='New Password' className='input-type-1' /> </span>
                    </div>

                    <button className="px-5 h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white ">
                        reset password
                    </button>
                </div>

                {/* toggle sections */}
                <div className="w-full flex justify-start">

                    <div className="w-auto flex flex-col items-start justify-start gap-5 p-[15px] rounded-[5px] shadow-md border border-slate-200 ">
                        <span className="w-full flex items-center justify-start gap-5" onClick={()=> handle_toggle('two_fa')} >
                            <p className="text-md  w-[250px] cursor-pointer ">Two-Factor Authentication</p>
                            <span className={profileToggle.two_fa ? "active-toggle": "toggle"}> </span>
                        </span>
                        
                        <span className="w-full flex items-center justify-start gap-5" onClick={()=> handle_toggle('email_auth')} >
                            <p className="text-md  w-[250px] cursor-pointer ">Email Notification</p>
                            <span className={profileToggle.email_auth ? "active-toggle": "toggle"}> </span>
                        </span>

                        <span className="w-full flex items-center justify-start gap-5" onClick={()=> handle_toggle('sms_auth')}>
                            <p className="text-md  w-[250px] cursor-pointer ">SMS Notification</p>
                            <span className={profileToggle.sms_auth ? "active-toggle": "toggle"}> </span>
                        </span>

                        <span className="w-full flex items-center justify-start gap-5" onClick={()=> handle_toggle('web_push')}>
                            <p className="text-md  w-[250px] cursor-pointer ">Web Push Notification</p>
                            <span className={profileToggle.web_push ? "active-toggle": "toggle"}> </span>
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default User_profile_page