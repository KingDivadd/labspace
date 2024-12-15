'use client'
import React, {useState, useEffect} from 'react'

import App_navigation from "../../component/app_navigation"
import Welcome_navigation from "../../component/welcome_navigation"
import Route_navigation from "../../component/route_navigation"
import { useChat } from '../../context/ChatContext'
import User_Dashboard from '../../pages/user_dashboard'
import User_profile_page from '../../pages/user_profile_page'
import Teams_page from '../../pages/teams_page'
import Trash_page from '../../pages/trash_page'
import Task_page from '../../pages/task_page'
import Todo_page from '../../pages/todo_page'
import Loading from '../../component/loading'
import NotificationPage from '../../pages/notification_page'


const Single_User_porter = () => {
    const {route_nav} = useChat()


    return (
        <div className=" flex items-start justify-center w-full h-[100vh] overflow-y-auto ">
            <div className="flex flex-col items-start justify-start h-full w-full ">
                    <App_navigation />
                    <Welcome_navigation />
                    <Route_navigation  />

                    {route_nav == 'dashboard' && <User_Dashboard /> }
                    {route_nav == 'task' && <Task_page /> }
                    {route_nav == 'todo' && <Todo_page /> }
                    {route_nav == 'notification' && <NotificationPage /> }

                    {route_nav == 'profile' && <User_profile_page /> }

            </div>
        </div>
    )
}

export default Single_User_porter