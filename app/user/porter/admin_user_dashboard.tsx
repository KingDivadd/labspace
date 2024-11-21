'use client'
import React, {useState, useEffect} from 'react'
import App_navigation from "../../component/app_navigation"
import Welcome_navigation from "../../component/welcome_navigation"
import Route_navigation from "../../component/route_navigation"
import { useChat } from '../../context/ChatContext'
import Admin_dashboard from '../../component/admin_dashboard'



const Admin_User_dashboard = () => {
    const {route_nav} = useChat()

    return (
        <div className="bg-white flex items-start justify-center w-full min-h-[100vh] overflow-y-auto ">
            <div className="flex flex-col items-start justify-between h-full w-full ">

                    <App_navigation />
                    <Welcome_navigation />
                    <Route_navigation />

                    { route_nav == 'dashboard' && <Admin_dashboard /> }

                    {/* {nav === "dashboard" && <Dashboard />}
                    {nav === "profile-management" && <Profile_management />}
                    {nav === "user-management" && <User_management />} */}

            </div>
        </div>
    )
}

export default Admin_User_dashboard