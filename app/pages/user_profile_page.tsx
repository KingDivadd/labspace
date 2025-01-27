'use client'
import React, {useState, useEffect} from 'react'
import { useChat } from '../context/ChatContext'
import Modal from '../component/modals/modal'
import Alert, { ImageUpload } from '../component/helper'
import { patch_auth_request } from '../api'

const User_profile_page = () => {
    const {profileToggle, setProfileToggle, setLoggedInUser, loggedInUser, showModal, setShowModal, modalFor, setModalFor, setModalSource, modalSource, selectedItem, setSelectedItem} = useChat()
    const [alert, setAlert] = useState({message: '', type: ''})

    useEffect(() => {
        const item = localStorage.getItem('profile_toggle')
        if (item) {
            const toggles = JSON.parse(item)
            setProfileToggle(toggles)
            
        }
    }, [])


    function handle_toggle(data:string) {

        setProfileToggle({...profileToggle, [data]: !profileToggle[data as keyof typeof profileToggle]})
        localStorage.setItem('profile_toggles', JSON.stringify(profileToggle))
        
    }

    
    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }


    function handle_profile_update(){
        setShowModal(!showModal)
        setModalFor('edit')
        setModalSource('profile-modal')
    }

    
    async function handle_image_change(file:any) {
    
                try {
                    
                    const response = await patch_auth_request(`app/change-avatar`, {avatar: file.url})                
    
                    if (response.status == 200 || response.status == 201){
    
                        showAlert(response.data.msg, "success")
                        setLoggedInUser({...loggedInUser, avatar: response.data.user.avatar})
                    }
                    else{
                        showAlert(response.response.data.err, "error")
                    }
                } catch (err:any) {
                    console.error('Network or unexpected error:', err);
                    showAlert('An unexpected error occurred. Please try again later.', 'error');
                } 
            
        
    }

    return (
        <div className='w-full flex items-start justify-center px-[75px] py-5 '  >
            <div className="w-full flex flex-col justify-start items-center gap-10 relative">
                <span className=" flex items-center justify-end absolute top-[15px] w-full z-20 h-[50px]  ">

                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>

                {/* personal information section */}
                <div className="w-full flex items-center justify-start gap-[50px]  ">
                    <span className="w-[400px] h-[250px] rounded-[5px] p-[10px] shadow-md border border-slate-200">
                        <ImageUpload id='profile-image' initialImage={loggedInUser.avatar || ''} onImageChange={handle_image_change} />
                    </span>
                    
                    <div className="flex-1 flex flex-col items-start justify-start gap-5">
                        <span className="flex items-center justify-start gap-10">
                            <p className="text-sm w-[75px]  ">Full Name</p>
                            <p className="text-md font-[500]  ">{loggedInUser.first_name} {loggedInUser.last_name}</p>
                        </span>
                        
                        <span className="flex items-center justify-start gap-10">
                            <p className="text-sm w-[75px] ">Email</p>
                            <p className="text-md font-[500]  ">{loggedInUser.email}</p>
                        </span>

                        <span className="flex items-center justify-start gap-10">
                            <p className="text-sm w-[75px] ">Admin</p>
                            <p className="text-md font-[500]  ">{loggedInUser.is_admin ? 'true': 'false'}</p>
                        </span>

                        <span className="flex items-center justify-start gap-10">
                            <p className="text-sm w-[75px] ">Role</p>
                            <p className="text-md font-[500]  ">{loggedInUser.role}</p>
                        </span>

                        <span className="flex items-center justify-start gap-10">
                            <p className="text-sm w-[75px] ">Title</p>
                            <p className="text-md font-[500]  ">{loggedInUser.title}</p>
                        </span>

                    </div>

                </div>


                {/* changee  password */}
                <div className="w-full flex flex-wrap items-center justify-between gap-5 px-[15px] py-10 shadow-md border border-slate-200 ">

                    {/* toggle sections */}
                    <div className="w-full flex flex-wrap justify-between w-full ">

                        <div className="w-auto flex flex-wrap items-center justify-between gap-10 ">
                            
                            <span className="w-[270px] flex items-center justify-between " onClick={()=> handle_toggle('email_auth')} >
                                <p className="text-md cursor-pointer ">Email Notification</p>
                                <span className={profileToggle.email_auth ? "active-toggle": "toggle"}> </span>
                            </span>

                            <span className="w-[270px] flex items-center justify-between " onClick={()=> handle_toggle('web_push')}>
                                <p className="text-md cursor-pointer ">Web Push Notification</p>
                                <span className={profileToggle.web_push ? "active-toggle": "toggle"}> </span>
                            </span>
                        </div>

                        <button className="px-5 h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white text-sm" onClick={handle_profile_update}>
                            Update Profile
                        </button>
                    </div>
                </div>

            </div>
            {showModal && <Modal showModal={showModal} setShowModal={setShowModal} modalFor={modalFor} setModalFor={setModalFor} selectedItem={selectedItem} setSelectedItem={setSelectedItem} modalSource={modalSource} setModalSource={setModalSource} />}
        </div>
    )
}

export default User_profile_page