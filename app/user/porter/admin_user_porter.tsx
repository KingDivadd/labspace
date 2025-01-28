'use client'
import React, {useState, useEffect} from 'react'
import App_header from "../../component/app_header"
import { useChat } from '../../context/ChatContext'
import Admin_dashboard from '../../pages/admin_dashboard'
import User_profile_page from '../../pages/user_profile_page'
import Teams_page from '../../pages/teams_page'
import Trash_page from '../../pages/trash_page'
import Project_page from '../../pages/project_page'
import Payment_page from '../../pages/payment_page'
import Todo_page from '../../pages/todo_page'
import Loading from '../../component/loading'
import NotificationPage from '../../pages/notification_page'
import Side_bar from '../../component/side_bar'


const Admin_User_porter = () => {
    const {route_nav, loggedInUser, loadingDot} = useChat()

    return (
        <div className="bg-white flex items-start justify-start w-full min-h-[100vh] overflow-y-auto ">
            <div className="max-lg:hidden w-[200px] lg:w-[70px] bg-green-300 xl:w-[285px] h-screen overflow-visible ">
                <Side_bar />
            </div>
            <div className="flex-1 flex flex-col items-start justify-between h-full bg-slate-100 ">

                <App_header />

                {loadingDot ? 
                <span className=" w-full flex items-center justify-center" style={{height: 'calc( 100vh - 60px )'}}>
                    <Loading />
                </span>:
                <>
                    { route_nav == 'dashboard' && <Admin_dashboard /> }
                    { route_nav == 'project' && <Project_page /> }
                    { route_nav == 'team' && <Teams_page /> }
                    { route_nav == 'trash' && <Trash_page /> } 

                    {/* { route_nav == 'profile' && <User_profile_page /> }
                    { route_nav == 'todo' && <Todo_page /> }
                    { route_nav == 'payments' && <Payment_page /> }
                    { route_nav == 'notification' && <NotificationPage /> } */}


                </>  }

            </div>
        </div>
    )
}

export default Admin_User_porter