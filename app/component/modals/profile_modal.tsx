'use client'
import React, {useState, useEffect} from 'react'
import { useChat } from '../../context/ChatContext'
import { FaRegCircleXmark } from "react-icons/fa6"
import Drop_down_1 from '../drop_down'
import Alert, {Avatar} from '../helper'
import { delete_auth_request, patch_auth_request, post_auth_request } from '../../api'
import { IoEye, IoWarningOutline } from 'react-icons/io5'
import { IoMdEyeOff } from 'react-icons/io'


const Profile_modal = () => {
    const {modalSource, loggedInUser, setLoggedInUser, modalFor, setModalFor, setShowModal, setSelectedItem, selectedItem} = useChat()
    const [auth, setAuth] = useState({first_name: '', last_name: '', password: '', confirm_password: '' })
    const [loading, setLoading] = useState(false)
    const [selected_item, setSelected_item] = useState('')
    const [alert, setAlert] = useState({message: '', type: ''})
    const [showPassword, setShowPassword] = useState({password: false, confirm_password: false})

    useEffect(() => {
        if (modalFor == 'edit') {   
            const {first_name, last_name, } = loggedInUser
            setAuth({...auth, last_name, first_name,})
        }
    }, [])


    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    function handle_change(e:any) {
        const name = e.target.name
        const value = e.target.value
        setAuth({...auth, [name]: value})
    }

    function handle_close_modal() {
        setShowModal(false)
    }

    async function handle_update(e: any) {
        e.preventDefault();        

        if (!auth.first_name || !auth.last_name ) {
            if (!auth.first_name){showAlert('Please enter first name', 'warning'); }
            if (!auth.last_name){showAlert('Please enter last name', 'warning'); }
            
            return;
        }else if ((auth.password.trim() !== auth.confirm_password.trim())) {
            showAlert('Password do not match', 'warning')
        }
        else {
            setLoading(true); 
            try {
                
                const response = await patch_auth_request(`app/update-profile`, auth)                
                
                if (response.status == 200 || response.status == 201){

                    setAuth({...auth, password: '', confirm_password: '' })

                    showAlert(response.data.msg, "success")
                    setLoggedInUser(response.data.user)
                    setTimeout(() => {
                        setShowModal(false)
                    }, 1500);
                    
                    setLoading(false)
                }
                else{
                    showAlert(response.response.data.err, "error")
                    setLoading(false)
                }
            } catch (err:any) {
                console.error('Network or unexpected error:', err);
                showAlert('An unexpected error occurred. Please try again later.', 'error');
            } finally {
                setLoading(false); 
            }
        }
    }


    return (
        <div className="w-full">
            <div className=" bg-white max-h-[90vh] w-[450px] rounded-[5px] shadow-md border border-slate-200  overflow-y-auto relative " >
                <span className="px-[25px] flex items-center justify-end absolute top-[10px] w-full z-20 h-[50px] ">

                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>

                { modalFor == 'edit' && <div className="w-full">

                    <span className="w-full px-[25px] h-[60px] border-b border-slate-300 flex items-center justify-between ">
                        <p className="text-md font-[500] ">Update Profile</p> 


                    </span>

                    <div className="w-full flex flex-col items-start justify-start gap-[37.5px] p-[25px]">
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-sm ">First Name</p>
                            <input type="text" name='first_name' placeholder='john' value={auth.first_name} onChange={handle_change} className='input-type-1' />
                        </span>

                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-sm ">Last Name</p>
                            <input type="text" name='last_name' placeholder='doe' value={auth.last_name} onChange={handle_change} className='input-type-1' />
                        </span>

                        <span className="w-full relative flex flex-col items-start justify-start gap-2 ">
                            <p className="text-sm ">Password</p>
                            <span className="w-full relative  ">
                                <input type={showPassword.password ? "text" : "password"} name='password' placeholder='Password' className={'input-type-1'} value={auth.password} onChange={handle_change} />

                                <span className='absolute w-[40px] flex items-center justify-center top-[12.5px] right-0 text-blue-600' onClick={()=> setShowPassword({...showPassword, password: !showPassword.password})} >
                                    {showPassword ? <IoEye size={20} className='cursor-pointer' /> : <IoMdEyeOff size={20} className='cursor-pointer' />}
                                </span>
                            </span>
                        </span>
                        
                        <span className="w-full relative flex flex-col items-start justify-start gap-2 ">
                            <p className="text-sm ">Confirm Password</p>
                            <span className="w-full relative  ">
                                <input type={showPassword.confirm_password ? "text" : "password"} name='confirm_password' placeholder='Confirm Password' className={ 'input-type-1'} value={auth.confirm_password} onChange={handle_change} />

                                <span className='absolute w-[40px] flex items-center justify-center top-[12.5px] right-0 text-blue-600' onClick={()=> setShowPassword({...showPassword, confirm_password: !showPassword.confirm_password})} >
                                    {showPassword ? <IoEye size={20} className='cursor-pointer' /> : <IoMdEyeOff size={20} className='cursor-pointer' />}
                                </span>
                            </span>
                        </span>

                        <span className="w-full flex items-center justify-end gap-5">
                            <button className="h-[45px] w-[90px] text-sm rounded-[3px] hover:text-red-600 hover:border hover:border-red-600  " onClick={()=> setShowModal(false)}>Cancel</button>

                            <button className="w-[90px] text-sm flex items-center justify-center h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white" onClick={handle_update} disabled={loading}>
                                {loading ? (
                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                ) : 'Submit'}
                            </button>
                        </span>
                    </div>

                </div>}

            </div>
        </div>
    )
}

export default Profile_modal