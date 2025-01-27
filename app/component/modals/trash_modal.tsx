'use client'
import React, {useState, useEffect} from 'react'
import { useChat } from '../../context/ChatContext'
import Alert, {Avatar, Dropdown, FileDisplay, FileUpload, UserInfo, convert_to_unix, readable_date, readable_date_time} from '../helper'
import { FaTimes } from 'react-icons/fa'
import { LuCheck } from 'react-icons/lu'
import Loading from '../loading'
import { delete_auth_request, patch_auth_request, post_auth_request } from '../../api'
import { useRouter } from 'next/navigation'
import moment from 'moment'
import { IoWarningOutline } from 'react-icons/io5'

type TaskBox = {
    project_title: string;
    priority: string;
    stage: string;
    team: string[];
    assets: any[];
};

const Trash_modal = () => {
    const router = useRouter()
    const { modalFor, setModalFor, setShowModal, selectedItem, app_users, setTrigger_notification,trigger_notification} = useChat()
    const [alert, setAlert] = useState({message: '', type: ''})
    const [project_box, setTask_box] = useState<TaskBox>({project_title: "", priority: '', stage: '', team: [], assets: []})
    const [sub_project, setSub_project] = useState({title:'', tag: '', due_date:'2024-12-10', project_id: '', })
    const [team_members, setTeam_members] = useState([])
    const [loading, setLoading] = useState(false)
    const [user_drop, setUser_drop] = useState(false)
    const [current_project_nav, setCurrent_project_nav] = useState('project_details')

    
    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function handle_delete(e: any) {
        e.preventDefault();        

            setLoading(true); 
            try {
                
                const response = await delete_auth_request(`app/delete-trash/${selectedItem.trash_id}`)                

                if (response.status == 200 || response.status == 201){

                    console.log(response)
                    showAlert(response.data.msg, "success")
                    setLoading(false)
                    setShowModal(false)
                    setTrigger_notification(!trigger_notification)

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

    async function handle_restore(e: any) {
        e.preventDefault();        

            setLoading(true); 
            try {
                
                const response = await patch_auth_request(`app/restore-trash/${selectedItem.trash_id}`,{})                

                if (response.status == 200 || response.status == 201){

                    console.log(response)
                    showAlert(response.data.msg, "success")
                    setLoading(false)
                    setShowModal(false)
                    setTrigger_notification(!trigger_notification)

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


    return (
        <div className="w-full ">
            <div className=" w-full bg-white  rounded-[5px]  border border-slate-200  overflow-y-auto relative " >
                <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>

                {modalFor == 'delete' && 
                <div className="max-sm:w-[95vw] mx-auto w-[450px] ">
                    <div className="w-full p-[30px] border-b border-slate-200 flex flex-col items-center justify-center gap-5">
                        {selectedItem.deleted_project ? 
                            <div className="w-full flex flex-col items-center justify-center text-center gap-3 ">
                                <p className="text-md font-[500]">Are your sure you want to permanently delete Project with Id of</p>
                                <span className="w-full flex items-center justify-center gap-2">
                                    <p className="text-md font-[600] ">{selectedItem.deleted_project.project_ind}</p> 
                                    <p className="text-md font-[500]">and title</p> 
                                    <p className="text-md font-[600] ">{selectedItem.deleted_project.project_title}</p> 
                                </span>
                                <span className="flex items-center gap-3">
                                    <span className="h-[20px] w-[20px] text-red-600"><IoWarningOutline size={'100%'} /></span>
                                    <p className="text-md font-[400]"> Please note, this action is not reversible</p>
                                </span>
                            </div>
                            :
                            <div className="w-full flex flex-col items-center justify-center text-center gap-3 ">
                                <p className="text-md font-[500]">Are your sure you want to permanently delete </p>
                                <span className="w-full flex items-center justify-center gap-2">
                                    <p className="text-md font-[600] ">{selectedItem.deleted_user.first_name} {selectedItem.deleted_user.last_name}</p> 
                                    <p className="text-md font-[500]">who is a</p> 
                                    <p className="text-md font-[600] ">{selectedItem.deleted_user.title}</p> 
                                </span>
                                <span className="flex items-center gap-3">
                                    <span className="h-[20px] w-[20px] text-red-600"><IoWarningOutline size={'100%'} /></span>
                                    <p className="text-md font-[400]"> Please note, this action is not reversible</p>
                                </span>
                            </div>
                        
                        }

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

                {modalFor == 'restore' && 
                <div className="max-sm:w-[95vw] mx-auto w-[450px] ">
                    <div className="w-full p-[30px] border-b border-slate-200 flex flex-col items-center justify-center gap-5">
                        {selectedItem.deleted_project ? 
                            <div className="w-full flex flex-col items-center justify-center text-center gap-3 ">
                                <p className="text-md font-[500]">Are your sure you want to restore project with Id of</p>
                                <span className="w-full flex items-center justify-center gap-2">
                                    <p className="text-md font-[600] ">{selectedItem.deleted_project.project_ind}</p> 
                                    <p className="text-md font-[500]">and title</p> 
                                    <p className="text-md font-[600] ">{selectedItem.deleted_project.project_title}</p> 
                                </span>
                            </div>
                            :
                            <div className="w-full flex flex-col items-center justify-center text-center gap-3 ">
                                <p className="text-md font-[500]">Are your sure you want to restore user with name </p>
                                <span className="w-full flex items-center justify-center gap-2">
                                    <p className="text-md font-[600] ">{selectedItem.deleted_user.first_name} {selectedItem.deleted_user.last_name}</p> 
                                    <p className="text-md font-[500]">and title</p> 
                                    <p className="text-md font-[600] ">{selectedItem.deleted_user.title}</p> 
                                </span>
                            </div>
                        
                        }

                        <button className="w-[95px] flex items-center justify-center h-[45px] rounded-[3px] bg-amber-600 hover:bg-amber-700 text-white" onClick={handle_restore} disabled={loading}>
                            {loading ? (
                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            ) : 'Restore'}
                        </button>
                    </div>


                </div>}

            </div>
        </div>
    )
}

export default Trash_modal