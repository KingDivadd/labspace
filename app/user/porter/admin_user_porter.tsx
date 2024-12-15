'use client'
import React, {useState, useEffect} from 'react'
import App_navigation from "../../component/app_navigation"
import Welcome_navigation from "../../component/welcome_navigation"
import Route_navigation from "../../component/route_navigation"
import { useChat } from '../../context/ChatContext'
import Admin_dashboard from '../../pages/admin_dashboard'
import User_profile_page from '../../pages/user_profile_page'
import Teams_page from '../../pages/teams_page'
import Trash_page from '../../pages/trash_page'
import Task_page from '../../pages/task_page'
import Payment_page from '../../pages/payment_page'
import Todo_page from '../../pages/todo_page'
import Loading from '../../component/loading'
import NotificationPage from '../../pages/notification_page'



const Admin_User_porter = () => {
    const {route_nav, loggedInUser, loadingDot} = useChat()

    return (
        <div className="bg-white flex items-start justify-center w-full min-h-[100vh] overflow-y-auto ">
            <div className="flex flex-col items-start justify-between h-full w-full ">

                    <App_navigation />
                    <Welcome_navigation />
                    <Route_navigation />

                    {loadingDot ? 
                    <span className="h-[400px] w-full flex items-center justify-center">
                        <Loading />
                    </span>:
                    <>
                        { route_nav == 'dashboard' && <Admin_dashboard /> }
                        { route_nav == 'profile' && <User_profile_page /> }
                        { route_nav == 'team' && <Teams_page /> }
                        { route_nav == 'task' && <Task_page /> }
                        { route_nav == 'todo' && <Todo_page /> }
                        { route_nav == 'payments' && <Payment_page /> }
                        { route_nav == 'notification' && <NotificationPage /> }
                        { route_nav == 'trash' && <Trash_page /> }
                    </>  }

            </div>
        </div>
    )
}

export default Admin_User_porter