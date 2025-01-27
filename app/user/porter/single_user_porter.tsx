'use client'
import React, {useState, useEffect} from 'react'

import App_header from "../../component/app_header"
import { useChat } from '../../context/ChatContext'
import User_Dashboard from '../../pages/user_dashboard'
import User_profile_page from '../../pages/user_profile_page'
import Teams_page from '../../pages/teams_page'
import Trash_page from '../../pages/trash_page'
import Task_page from '../../pages/project_page'
import Todo_page from '../../pages/todo_page'
import Loading from '../../component/loading'
import NotificationPage from '../../pages/notification_page'
import Side_bar from '@/app/component/side_bar'
import Admin_dashboard from '@/app/pages/admin_dashboard'


const Single_User_porter = () => {
    const {route_nav, loadingDot} = useChat()


    return (
        <div className="bg-white flex items-start justify-start w-full min-h-[100vh] overflow-y-auto ">
            <div className="w-[285px] h-screen  ">
                <Side_bar />
            </div>
            <div className="flex-1 flex flex-col items-start justify-between h-full bg-slate-100 ">

                <App_header />

                {loadingDot ? 
                <span className="h-[400px] w-full flex items-center justify-center">
                    <Loading />
                </span>:
                <>
                    { route_nav == 'dashboard' && <Admin_dashboard /> }
                    { route_nav == 'project' && <Task_page /> }
                    
                </>  }

            </div>
        </div>
    )
}

export default Single_User_porter