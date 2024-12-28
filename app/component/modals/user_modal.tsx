'use client'
import React, {useState, useEffect} from 'react'
import { useChat } from '../../context/ChatContext'
import { FaRegCircleXmark } from "react-icons/fa6"
import Drop_down_1 from '../drop_down'
import Alert, {Avatar} from '../helper'
import { delete_auth_request, patch_auth_request, post_auth_request } from '../../api'
import { IoWarningOutline } from 'react-icons/io5'


const User_modal = () => {
    const {modalSource, setModalSource, modalFor, setModalFor, setShowModal, setSelectedItem, selectedItem} = useChat()
    const [auth, setAuth] = useState({first_name: '', last_name: '', email: '', title: '', is_admin: false, is_active: true})
    const [loading, setLoading] = useState(false)
    const [dropArray, setDropArray] = useState<string[]>(['Intern','Graduate Student', 'Junior Research Associate', 'Senior Research Associate','Principal Investigator', 'Lab Manager'])
    const [selected_item, setSelected_item] = useState('')
    const [alert, setAlert] = useState({message: '', type: ''})
    const [isActive, setIsActive] = useState(true);
    const toggleActive = () => setIsActive(!isActive);

    useEffect(() => {
        if (modalFor == 'edit') {   
            const {last_name, first_name, email, title, is_admin,is_active } = selectedItem
            setAuth({...auth, last_name, first_name, email, title, is_admin, is_active})
            setIsActive(is_active)
            setSelected_item(title)
        }
    }, [])


    useEffect(() => {
        if (selected_item){ setAuth({...auth, title: selected_item}) }
    }, [selected_item])

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

    async function handle_submit(e: any) {
        e.preventDefault();        

        if (!auth.first_name || !auth.last_name || !auth.email || !auth.title  ) {
            if (!auth.first_name){showAlert('Please enter user\' first name', 'warning'); }
            if (!auth.last_name){showAlert('Please enter user\' last name', 'warning'); }
            if (!auth.email){showAlert('Please enter user\' email', 'warning'); }
            if (!auth.title){showAlert('Please select a title', 'warning'); }
            if (!auth.first_name || !auth.last_name || !auth.email && !auth.title) {showAlert('Please fill all fields ', 'warning')}
            
            return;
        } else {
            setLoading(true); 
            try {
                
                const response = await post_auth_request('app/add-user', auth)                
                
                if (response.status == 200 || response.status == 201){

                    setAuth({first_name: '', last_name: '', email: '', title: '', is_admin: false, is_active: true})

                    setSelected_item('Select')
                    showAlert(response.data.msg, "success")
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

    async function handle_update(e: any) {
        e.preventDefault();        

        if (!auth.first_name || !auth.last_name || !auth.email || !auth.title  ) {
            if (!auth.first_name){showAlert('Please enter user\' first name', 'warning'); }
            if (!auth.last_name){showAlert('Please enter user\' last name', 'warning'); }
            if (!auth.email){showAlert('Please enter user\' email', 'warning'); }
            if (!auth.title){showAlert('Please select a title', 'warning'); }
            if (!auth.first_name || !auth.last_name || !auth.email && !auth.title) {showAlert('Please fill all fields ', 'warning')}
            
            return;
        } else {
            setLoading(true); 
            try {
                
                const response = await patch_auth_request(`app/edit-member/${selectedItem.user_id}`, auth)                
                
                if (response.status == 200 || response.status == 201){

                    setAuth({first_name: '', last_name: '', email: '', title: '', is_admin: false, is_active: true})

                    setSelected_item('Select')
                    showAlert(response.data.msg, "success")
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

    async function handle_delete(e: any) {
        e.preventDefault();        

            setLoading(true); 
            try {
                
                const response = await delete_auth_request(`app/delete-user/${selectedItem.user_id}`)                

                if (response.status == 200 || response.status == 201){


                    console.log(response)
                    showAlert(response.data.msg, "success")
                    setLoading(false)
                    setShowModal(false)

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

    function handle_cancel(){

    }

    return (
        <div className="w-full">
            <div className=" bg-white max-h-[90vh] w-[450px] rounded-[5px] shadow-md border border-slate-200  overflow-y-auto relative " >
                <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>

                { (modalFor == 'create' || modalFor == 'edit') && <div className="w-full">

                    <span className="w-full px-[25px] h-[50px] border-b border-slate-300 flex items-center justify-between ">
                        {modalFor == 'create' ? <p className="text-md font-[500] ">New User</p> :
                        <div className="flex justify-start items-center gap-5">
                            <Avatar user={selectedItem} isActive={isActive} toggleActive={toggleActive} />
                            <p className="text-md font-[500] ">{selectedItem.first_name} {selectedItem.last_name}</p>
                        </div>}


                        {auth.is_admin && <p className="text-md font-[500] ">Admin</p>}
                        

                        {/* <span className="h-[20px] w-[20px] flex items-center justify-center cursor-pointer" onClick={handle_close_modal}><FaRegCircleXmark size={'100%'}  className='hover:text-red-600' /> </span> */}
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

                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-sm ">Title</p>
                            <span className="w-full h-[45px]"><Drop_down_1 dropArray={dropArray} setDropArray={setDropArray} selected_item={selected_item} setSelected_item={setSelected_item} showAlert={showAlert} /> </span>
                        </span>

                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-sm ">Email</p>
                            <input type="email" name='email' disabled={modalFor == 'edit'} placeholder='john.doe@gmail.com' value={auth.email} onChange={handle_change} className='input-type-1' />
                        </span>

                        <div className="w-full flex items-center justify-between">
                            <span className=" flex items-center justify-start gap-10 ">
                                <label htmlFor="is_admin" className="text-sm    cursor-pointer " >Admin Priveleges</label>
                                <input type="checkbox" name="is_admin" id="is_admin" className='h-[17.5px] w-[17.5px] ' checked={auth.is_admin} onChange={(e) => setAuth({...auth, is_admin: e.target.checked})} />
                            </span>

                            <span className=" flex items-center justify-start gap-10 ">
                                <label htmlFor="is_active" className="text-sm    cursor-pointer " >Suspend User</label>
                                <input type="checkbox" name="is_active" id="is_active" className='h-[17.5px] w-[17.5px] ' checked={!auth.is_active} onChange={(e) =>{ setAuth({...auth, is_active: !e.target.checked}); setIsActive(!auth.is_active)}} />
                            </span>
                        </div>

                        <span className="w-full flex items-center justify-end gap-3">
                            <button className=" h-[45px] px-5 border border-white hover:border-red-500 hover:text-red-500 text-sm rounded-[3px]  " onClick={handle_cancel}>Cancel</button>

                            {modalFor == 'create' &&  <button className="w-[90px] flex items-center justify-center h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white" onClick={handle_submit} disabled={loading}>
                                {loading ? (
                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                ) : 'submit'}
                            </button>}

                            {modalFor == 'edit' &&  <button className="w-[90px] flex items-center justify-center h-[45px] rounded-[3px] bg-amber-600 hover:bg-amber-700 text-white" onClick={handle_update} disabled={loading}>
                                {loading ? (
                                <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                ) : 'submit'}
                            </button>}
                        </span>
                    </div>

                </div>}

                {modalFor == 'delete' && 
                <div className="max-sm:w-[95vw] mx-auto w-[450px] ">
                    <div className="w-full p-[25px] border-b border-slate-200 flex flex-col items-center justify-center gap-5">
                        <div className="w-full flex flex-col items-center justify-center text-center gap-3 ">
                            <p className="text-md font-[500]">Are your sure you want to delete user with name </p>
                            <span className="w-full flex items-center justify-center gap-2">
                                <p className="text-md font-[600] ">{selectedItem.first_name} {selectedItem.last_name}</p> 
                                <p className="text-md font-[500]">and title</p> 
                                <p className="text-md font-[600] ">{selectedItem.title}</p> 
                            </span>
                            <span className="flex items-center gap-3">
                                <span className="h-[20px] w-[20px] text-red-600"><IoWarningOutline size={'100%'} /></span>
                                <p className="text-md font-[400]"> Please note, this action is not reversible</p>
                            </span>
                        </div>

                        <button className="w-[95px] flex items-center justify-center h-[45px] rounded-[3px] bg-red-600 hover:bg-red-700 text-white" onClick={handle_delete} disabled={loading}>
                            {loading ? (
                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            ) : 'Delete'}
                        </button>
                    </div>


                </div>}
            </div>
        </div>
    )
}

export default User_modal