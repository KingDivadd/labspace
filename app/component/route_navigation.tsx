'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import { get_auth_request } from '../api';
import { useChat } from '../context/ChatContext';
import { endianness } from 'os';

interface NavProps {
    nav: string;
    setNav: (nav: string)=>void
}

const Route_navigation = () => {
    const [alert, setAlert] = useState({message: '', type: ''})
    const [user_name, setUser_name] = useState('')
    const router = useRouter()
    const {close_welcome_nav, setClose_welcome_nav, route_nav, setRoute_nav, user_role, trigger_notification, setTrigger_notification} = useChat()

        //  now this should be removed, it was added as i dont have a workind db

    // useEffect(() => {
    //     const user_role = localStorage.getItem('user_role')
    //     console.log('user role ', user_role)
    //     if (!user_role || user_role == null || !['admin', 'user', 'business_user'].includes(user_role) ){
    //         router.push('/auth/login')
    //     }else{
    //         setuser_role(user_role)
    //     }
    // }, [])

    useEffect(() => {
        get_user_data()
        const item = sessionStorage.getItem('nav')
        if (!item) {
            setRoute_nav('dashboard')
        }else{
            setRoute_nav(item)
        }
    }, [])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function get_user_data() {
        try {
            const response = await get_auth_request('app/navigation')
                            
            if (response.status == 201 || response.status == 200){
                
                const name = `${response.data.user.first_name} ${response.data.user.last_name}`

                setUser_name(name)

            }else if (response.response.status == 402){
                showAlert('Session Expired Login again ', 'error')
            }
            else{
                showAlert(response.response.data.err, "error")
                return;
            }

        } catch (err:any) {
            showAlert('Something went worong, try again later ', 'error')
        }
    }

    function select_nav(item:string) {
        sessionStorage.setItem('nav', item)
        setRoute_nav(item)
        console.log('route  in route nav ',route_nav);
        
    }

    return (
        <div className="w-full  px-[75px] flex flex-col justify-center items-center justify-center border-b border-slate-300 shadow-md ">
            {close_welcome_nav && <span className="w-full border-b border-slate-400 mx-auto"></span>}
            <div className="w-full h-[90px] flex items-center justify-between border-b border-slate-400">
                <span className="flex-1 flex items-center justify-start">
                    <h4 className="text-3xl font-semibold  flex items-center gap-[10px] ">{user_name || "- -"} </h4>
                </span>

                {user_role === 'admin' && 
                <div className="relative  flex items-center justify-ed">

                    <button className="px-[20px] h-[45px] rounded-[3px] bg-amber-600 hover:bg-amber-800 text-white text-sm " onClick={()=> setTrigger_notification(!trigger_notification)} >notifications</button>

                    {trigger_notification && <div className="absolute z-20 top-[50px] w-[400px] h-[360px] right-0 rounded-[5px] shadow-md border border-slate-200 bg-white flex items-center justify-center ">
                        no new notification
                    </div>}

                </div> }

                {user_role === 'user' && <div className="w-[400px]  h-full flex items-center justify-between">

                    <button className="px-[20px] h-[45px] rounded-[3px] bg-amber-700 hover:bg-amber-800 text-white text-sm ">New Loan</button>

                    <button className="px-[20px] h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white text-sm ">Support</button>
                </div>}
            </div>

            <div className="w-full flex items-center  gap-[10px] h-[70px] overflow-x-auto ">
                <span className={route_nav == "dashboard" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('dashboard')}}>
                    <p className="text-sm"> {user_role == "user" ? "My Dashboard" : "Dashboard"} </p>
                </span>


                { user_role === 'user' && 
                <span className={route_nav == "my-loans" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('my-loans')}}>
                    <p className="text-sm">My Loans </p>
                </span>}

                { user_role === 'user' && 
                <span className={route_nav == "payment" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('payment')}}>
                    <p className="text-sm">Payments </p>
                </span>}

                { user_role === 'user' && <span className={route_nav == "transaction" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('transaction')}}>
                    <p className="text-sm">Transactions </p>
                </span>}

                <span className={route_nav == "notification" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('notification')}}>
                    <p className="text-sm">Notifications</p>
                </span>

                {user_role === 'user' && <span className={route_nav == "documents" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('documents')}}>
                    <p className="text-sm">Documents </p>
                </span>}

                {user_role === 'user' && <span className={route_nav == "support" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('support')}}>
                    <p className="text-sm">Support </p>
                </span>}

                {user_role === 'user' && <span className={route_nav == "profile" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('profile')}}>
                    <p className="text-sm">Profile </p>
                </span>}

                {/* For admin */}

                {user_role === 'admin' && <span className={route_nav == "loan-management" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('loan-management')}}>
                    <p className="text-sm">Loan Management </p>
                </span>}

                {user_role === 'admin' && <span className={route_nav == "user-management" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('user-management')}}>
                    <p className="text-sm">User Management </p>
                </span>}

                {user_role === 'admin' && <span className={route_nav == "payments" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('payments')}}>
                    <p className="text-sm">Payments </p>
                </span>}

                {user_role === 'admin' && <span className={route_nav == "reports" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('reports')}}>
                    <p className="text-sm">Reports & Analytics </p>
                </span>}

                {user_role === 'admin' && <span className={route_nav == "documents" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('documents')}}>
                    <p className="text-sm">Documents </p>
                </span>}

                {user_role === 'admin' && <span className={route_nav == "settings" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('settings')}}>
                    <p className="text-sm">Settings </p>
                </span>}

                {user_role === 'admin' && <span className={route_nav == "support-center" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('support-center')}}>
                    <p className="text-sm">Support Center </p>
                </span>}

                {user_role === 'admin' && <span className={route_nav == "audit-logs" ? "active-nav-box" : "nav-box"} onClick={()=>{select_nav('audit-logs')}}>
                    <p className="text-sm">Audit Logs </p>
                </span>}


                
            
            </div>
            
            
        </div>
    )
}

export default Route_navigation