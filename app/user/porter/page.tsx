
'use client'
import React, {useState, useEffect} from 'react'
import Admin_User_porter from './admin_user_porter'
import Single_User_porter from './single_user_porter'

import { useRouter } from 'next/navigation'
import { useChat } from '@/app/context/ChatContext'
import { post_auth_request } from '@/app/api'

const vapid_public_key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY

const Dashboard = () => {
    const router = useRouter()
    const {user_role, setUser_role, setLoggedInUser, loggedInUser, setLoadingDot} = useChat()
    

    useEffect(() => {
        const x_id_key = localStorage.getItem('x-id-key')
        if (x_id_key) {
            handle_persist_login()
            handle_save_subscription()
        }else{
            router.push('/auth/login')
        }
    }, [])

    const urlBase64ToUint8Array = (base64String:string) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
    
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
    
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };

    const subscribeUser = async() => {
        try {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                throw new Error('Permission not granted for Notification');
            }

            const registration = await navigator.serviceWorker.register('/worker.js');

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapid_public_key || '')
            });

            return JSON.stringify(subscription)
        } catch (error) {
            console.error('Error during subscription:', error);
        }
    };

    async function handle_save_subscription() {
        try {
            const sub = await subscribeUser()
            const response = await post_auth_request(`app/save-subscription`, { subscription: sub })
            if (response.status == 200 || response.status == 201){
                
            }

        } catch (err:any) {
            
        }
    }

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
        <div className="bg-slate-100">
            
            {(loggedInUser.is_admin && loggedInUser.is_active) ?  <Admin_User_porter /> : <Single_User_porter />  }

        </div>
    )
}

export default Dashboard