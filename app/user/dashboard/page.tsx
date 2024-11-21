
'use client'
import React, {useState, useEffect} from 'react'
import Admin_User_dashboard from '../../pages/admin_user_dashboard'
import Single_User_dashboard from '../../pages/single_user_dashboard'

import { useRouter } from 'next/navigation'
import { useChat } from '@/app/context/ChatContext'

const Dashboard = () => {
    const router = useRouter()
    const {user_role, setUser_role} = useChat()

    useEffect(() => {
        setUser_role('user')
    }, [])

    // useEffect(() => {
    //     const user_role = localStorage.getItem('user_role')
    //     if (!user_role || user_role == null || !['admin', 'single_user', 'business_user'].includes(user_role) ){
    //         router.push('/auth/login')
    //     }else{
    //         setUser_role(user_role)
    //     }
    // }, [])

    return (
        <div className="">
            {user_role === 'admin' && <Admin_User_dashboard />  }
            {user_role === 'user' && <Single_User_dashboard />  }

        </div>
    )
}

export default Dashboard