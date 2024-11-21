'use client'
import React, {useState, useEffect} from 'react'

import App_navigation from "../component/app_navigation"
import Welcome_navigation from "../component/welcome_navigation"
import Route_navigation from "../component/route_navigation"
import { useChat } from '../context/ChatContext'
import User_Dashboard from '../component/user_dashboard'


const Single_User_dashboard = () => {
    const {route_nav} = useChat()

    useEffect(() => {
        console.log('testing one two four ', route_nav);
    }, [])
    return (
        <div className=" flex items-start justify-center w-full h-[100vh] overflow-y-auto ">
            <div className="flex flex-col items-start justify-start h-full w-full ">
                    <App_navigation />
                    <Welcome_navigation />
                    <Route_navigation  />

                    {route_nav == 'dashboard' && <User_Dashboard /> }

            </div>
        </div>
    )
}

export default Single_User_dashboard