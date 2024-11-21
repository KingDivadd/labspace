'use client'
import React, {useState, useEffect} from 'react'

import App_navigation from "../../component/app_navigation"
import Welcome_navigation from "../../component/welcome_navigation"
import Route_navigation from "../../component/route_navigation"
import { useChat } from '../../context/ChatContext'
import User_Dashboard from '../../component/user_dashboard'
import My_loans from '../../pages/my_loans_page'


const Single_User_dashboard = () => {
    const {route_nav} = useChat()


    return (
        <div className=" flex items-start justify-center w-full h-[100vh] overflow-y-auto ">
            <div className="flex flex-col items-start justify-start h-full w-full ">
                    <App_navigation />
                    <Welcome_navigation />
                    <Route_navigation  />

                    {route_nav == 'dashboard' && <User_Dashboard /> }
                    {route_nav == 'my-loans' && <My_loans /> }

            </div>
        </div>
    )
}

export default Single_User_dashboard