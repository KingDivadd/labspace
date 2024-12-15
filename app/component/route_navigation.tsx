'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useChat } from '../context/ChatContext';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { get_auth_request } from '../api';
import Loading from './loading';
import NotificationComponent from './notification'

const Route_navigation = () => {
    const [alert, setAlert] = useState({ message: '', type: '' });
    const dropdownRef = useRef<HTMLDivElement>(null);
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

                    
                    console.log('notification ', response.data)
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

    const handle_new_loan = () => {
        setRoute_nav('my-loans');
    };

    const handle_support = () => {
        setRoute_nav('support');
    };

    return (
        <div className="w-full px-[20px] md:px-[55px] lg:px-[75px] flex flex-col justify-center items-center border-b border-slate-200 shadow-md">
            {close_welcome_nav && <span className="w-full border-b border-slate-400 mx-auto"></span>}
            <div className="w-full h-[70px] flex items-center justify-between border-b border-slate-400">
                <span className="flex-1 flex items-center justify-start">
                    <h4 className="text-2xl sm:text-3xl font-semibold flex items-center gap-[10px] text-blue-600 whitespace-nowrap">
                        {`${loggedInUser.first_name} ${loggedInUser.last_name}` || '- -'}
                    </h4>
                </span>

                <div className="relative flex items-center justify-end" ref={dropdownRef}>
                    <button className="px-5 h-[45px] rounded-[3px] bg-sky-500 hover:bg-sky-600 text-white text-sm whitespace-nowrap flex items-center justify-center gap-2"
                        onClick={() => {setShowNotification(!showNotification); setTrigger_notification(!trigger_notification)}}
                    >
                        <span className="h-[20px] w-[20px]">
                            <IoMdNotificationsOutline size={20} />
                        </span>
                        <p className="text-sm">
                            {(notification.number_of_unread_notification > 0) ? `${notification.number_of_unread_notification} New Notification` : 'Notifications'}
                        </p>
                    </button>

                    {showNotification && (
                        <div className="absolute z-20 top-[50px] max-sm:w-[90vw] w-[500px] h-[360px] right-0 rounded-[5px] shadow-md border border-slate-200 bg-white flex flex items-start justify-start gap-[10px] whitespace-nowrap p-[10px] " >
                            {
                                notification.unread_notifications ? 
                                <div className="w-full h-[100%] flex flex-col overflow-y-auto">
                                    {notification.unread_notifications.length ? 
                                    
                                        <div className="w-full h-auto flex flex-col ">
                                            {notification.unread_notifications.map((data:any, ind:number)=>{
                                                return(
                                                    <span key={ind} className="notification-item-cont">
                                                        <NotificationComponent fetchedData={data}  />
                                                    </span>
                                                )
                                            })}
                                        </div>
                                        :
                                        <div className="w-full h-full flex items-center justify-center">
                                            <p className="text-sm font-[500]">No New Notifications</p>
                                        </div>
                                    }

                                </div>
                                :
                                <div className="w-full h-full flex items-center justify-center">
                                    <Loading />
                                </div>
                            }
                            
                        </div>
                    )}
                </div>

                {user_role === 'user' && (
                    <div className="w-[400px] h-full flex items-center justify-between">
                        {route_nav !== 'my-loans' ? (
                            <button
                                className="px-[20px] h-[45px] rounded-[3px] bg-amber-700 hover:bg-amber-800 text-white text-sm"
                                onClick={handle_new_loan}
                            >
                                New Loan
                            </button>
                        ) : (
                            <p></p>
                        )}

                        <button
                            className="px-[20px] h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white text-sm"
                            onClick={handle_support}
                        >
                            Support
                        </button>
                    </div>
                )}
            </div>

            {loggedInUser.user_id && <div className="w-full flex items-center gap-[10px] h-[70px] overflow-x-auto">
                <span className={route_nav === 'dashboard' ? 'active-nav-box' : 'nav-box'} onClick={() => {select_nav('dashboard') }}>
                    <p className="text-sm text-center"> Dashboard </p>
                </span>

                <span className={route_nav === 'task' ? 'active-nav-box' : 'nav-box'} onClick={() => {select_nav('task') }}>
                    <p className="text-sm text-center">
                        {loggedInUser.is_admin ? 'Lab Tasks' : 'My Tasks'}
                    </p>
                </span>

                <span className={route_nav === 'todo' ? 'active-nav-box' : 'nav-box'} onClick={() => {select_nav('todo') }}>
                    <p className="text-sm text-center"> Todo Tasks</p>
                </span>

                {loggedInUser.is_admin && <span className={route_nav === 'payments' ? 'active-nav-box' : 'nav-box'} onClick={() => {select_nav('payments') }}>
                    <p className="text-sm text-center"> Payment History </p>
                </span>}

                {loggedInUser.is_admin && <span className={route_nav === 'team' ? 'active-nav-box' : 'nav-box'} onClick={() => {select_nav('team') }}>
                    <p className="text-sm text-center"> Team Members </p>
                </span>}

                {loggedInUser.is_admin && <span className={route_nav === 'trash' ? 'active-nav-box' : 'nav-box'} onClick={() => {select_nav('trash') }}>
                    <p className="text-sm text-center"> Recycle Bin </p>
                </span>}

                <span className={route_nav === 'notification' ? 'active-nav-box' : 'nav-box'} onClick={() => {select_nav('notification') }}>
                    <p className="text-sm text-center"> Notification </p>
                </span>

                <span className={route_nav === 'profile' ? 'active-nav-box' : 'nav-box'} onClick={() => {select_nav('profile') }}>
                    <p className="text-sm text-center"> Profile Managment </p>
                </span>
            </div>}
        </div>
    );
};

export default Route_navigation;
