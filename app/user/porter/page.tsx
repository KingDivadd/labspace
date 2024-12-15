
'use client'
import React, {useState, useEffect} from 'react'
import Admin_User_porter from './admin_user_porter'
import Single_User_porter from './single_user_porter'

import { useRouter } from 'next/navigation'
import { useChat } from '@/app/context/ChatContext'
import { post_auth_request } from '@/app/api'

const Dashboard = () => {
    const router = useRouter()
    const {user_role, setUser_role, setLoggedInUser, loggedInUser, setLoadingDot} = useChat()
    

    useEffect(() => {
        const x_id_key = localStorage.getItem('x-id-key')
        if (x_id_key) {
            handle_persist_login()
        }else{
            router.push('/auth/login')
        }
    }, [])

    async function handle_persist_login() {
            try {
                
                const response = await post_auth_request('app/persist-login', {})                

                if (response.status == 200 || response.status == 201){
                    
                    const user_data = response.data.user_data

                    const {user_id, first_name, last_name, email, avatar, is_admin, is_active, role, title} = user_data

                    setLoggedInUser({...loggedInUser, user_id, first_name, last_name, email, avatar, is_admin, is_active, role, title})

                    setLoadingDot(false)
                    
                }else if(response.response.status == 401){
                    router.push('/auth/login')
                }
                else{
                    // showAlert(response.response.data.err, "error")
                    
                }
            } catch (err:any) {
                // console.error('Network or unexpected error:', err);
                // showAlert('An unexpected error occurred. Please try again later.', 'error');
            }
        
    }


    return (
        <div className="">
            
            {loggedInUser.is_admin ?  <Admin_User_porter /> : <Single_User_porter />  }

        </div>
    )
}

export default Dashboard