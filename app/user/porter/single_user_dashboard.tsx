'use client'
import React, {useState, useEffect} from 'react'

import App_navigation from "../../component/app_navigation"
import Welcome_navigation from "../../component/welcome_navigation"
import Route_navigation from "../../component/route_navigation"
import { useChat } from '../../context/ChatContext'
import User_Dashboard from '../../component/user_dashboard'
import My_loans from '../../pages/my_loans_page'
import User_payment_page from '../../pages/user_payment_page'
import User_transaction_page from '../../pages/user_transaction_page'
import User_notification_page from '../../pages/user_notification_page'
import User_document_page from '../../pages/user_document_page'
import User_support_page from '../../pages/user_support_page'
import User_profile_page from '../../pages/user_profile_page'


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
                    {route_nav == 'payment' && <User_payment_page /> }
                    {route_nav == 'transaction' && <User_transaction_page /> }
                    {route_nav == 'notification' && <User_notification_page /> }
                    {route_nav == 'documents' && <User_document_page /> }
                    {route_nav == 'support' && <User_support_page /> }
                    {route_nav == 'profile' && <User_profile_page /> }

            </div>
        </div>
    )
}

export default Single_User_dashboard