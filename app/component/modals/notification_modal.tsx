'use client'
import React, {useState, useEffect} from 'react'
import { useChat } from '../../context/ChatContext'
import { FaRegCircleXmark } from "react-icons/fa6"
import Drop_down_1 from '../drop_down'
import Alert, {Avatar, UserInfo} from '../helper'
import { patch_auth_request, post_auth_request } from '../../api'
import { useRouter } from 'next/navigation'


const Notification_modal = () => {

    const router = useRouter() 
    const {modalSource, setModalSource, modalFor, setModalFor, setShowModal, loggedInUser, selectedItem} = useChat()
    const [auth, setAuth] = useState({first_name: '', last_name: '', email: '', title: '', is_admin: false, is_active: true})
    const [is_read, setIs_read] = useState(false)
    const [dropArray, setDropArray] = useState<string[]>(['Intern','Graduate Student', 'Junior Research Associate', 'Senior Research Associate','Principal Investigator', 'Lab Manager'])
    const [selected_item, setSelected_item] = useState('')
    const [alert, setAlert] = useState({message: '', type: ''})
    const [isActive, setIsActive] = useState(true);
    const toggleActive = () => setIsActive(!isActive);
    const [notification_info, setNotification_info] = useState({formatted_status: '', display_title: '', description: '',})


    useEffect(() => {
        if (modalFor == 'view') {   
            console.log('selected notifications ',selectedItem)
            const {created_at, is_read, updated_at, notificationAssignment_id, notification_id, user_id, notification,   } = selectedItem
            const {status, notification_sub_type, notification_type, task,  team} = notification

            const formatted_status = is_read == true ? 'Opened' : 'Not Opened'
            const is_user_match = loggedInUser.user_id === user_id;
            const is_task_creation = notification_sub_type === "task_creation" && notification_type === "task";
            const display_title = (is_user_match  && is_task_creation) ? 'New Task Created':''
            const description = is_user_match ? `Task with ${task? task.priority : 'selected'} Priority has been created. Current stage: ${task ? (task.stage == 'todo' ? 'Todo' : task.stage == 'in_progress'? 'In Progress': 'Completed' ): 'Todo'} and ${team? team.length: 1} Team members assigned.`:``

            setNotification_info({...notification_info, formatted_status, display_title, description})
            setIs_read(is_read)

        }
    }, [])

    
    useEffect(() => {
        const x_id_key = localStorage.getItem('x-id-key')
        if (x_id_key) {
            handle_read_notification()
        }else{
            router.push('/auth/login')
        }
    }, [])

    async function handle_read_notification( ) {

            try {
                
                const response = await patch_auth_request(`app/read-notification/${selectedItem.notificationAssignment_id}`, {})                

                if (response.status == 200 || response.status == 201){
                    
                    const updated_notification = response.data
                    setIs_read(true)
                    // setNotification_info({...notification_info, is_read:true})
                }else if(response.response.status == 401){
                    router.push('/auth/login')
                }
                else{
                    showAlert(response.response.data.err, "error")
                }
            } catch (err:any) {
                showAlert('An unexpected error occurred. Please try again later.', 'error');
            }
        
    }
    

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    function handle_close_modal() {
        setShowModal(false)
    }

    
    return (
        <div className="w-full">
            <div className=" bg-white  w-[450px] rounded-[5px] shadow-md border border-slate-200  overflow-y-auto relative " >
                <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                    {alert.message && <Alert message={alert.message} type={alert.type} />} 
                </span>

                <div className="w-full ">

                    <span className="relative w-full px-[25px] h-[60px] border-b border-slate-300 flex items-center justify-between ">
                        <p className="text-lg font-[500] ">{notification_info.display_title}</p>

                        {is_read ? 
                        <p className="text-md font-[500] text-blue-600 ">Read</p>
                        :
                        <p className="text-md font-[500] text-amber-600 ">Unread</p>
                        }
                        
                    </span>

                    <div className="w-full flex flex-col items-start justify-start gap-5 p-[25px]">
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-sm ">Title</p>
                            <p className="text-md font-[500]">{notification_info.display_title}</p>
                        </span>

                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-sm ">Description</p>
                            <p className="text-md font-[500]">{notification_info.description}</p>
                        </span>

                        {
                            (selectedItem.notification.notification_type == 'task' && selectedItem.notification.task) &&
                            <div className="w-full border-b border-slate-300"></div>
                        }

                        {
                            (selectedItem.notification.notification_type == 'task' && selectedItem.notification.task) &&
                            <div className="w-full flex flex-col min-h-[200px]  gap-5 ">
                                <p className="text-md font-semibold">Task Information</p>
                                <span className="w-full flex items-center justify-start gap-2">
                                    <p className="text-md font-[500]">{selectedItem.notification.task.task_ind}</p>:
                                    <p className="text-md font-[500]">{selectedItem.notification.task.task_title}</p>
                                </span>

                                <span className=" w-full flex items-center justify-start gap-10 ">

                                    <span className="flex items-center gap-[10px]">
                                        <span className={`h-[15px] w-[15px] ${selectedItem.notification.task.priority == 'normal' ? 'bg-teal-700' : selectedItem.notification.task.priority == 'low' ? 'bg-amber-600': selectedItem.notification.task.priority == 'high' ? 'bg-red-600': ''} rounded-[17.5px] `} ></span>

                                        <p className="text-sm font-[500] text-slate-700">{selectedItem.notification.task.priority.toUpperCase().replace(/_/g, ' ')} PRIORITY</p>
                                    </span>

                                    <span className="flex items-center gap-[10px]">
                                        <span className={`h-[15px] w-[15px] ${selectedItem.notification.task.stage == 'todo' ? 'bg-blue-600' : selectedItem.notification.task.stage == 'in_progress' ? 'bg-amber-600': selectedItem.notification.task.stage == 'completed' ? 'bg-teal-600': ''} rounded-[17.5px] `} ></span>

                                        <p className="text-sm font-[500] text-slate-700">{selectedItem.notification.task.stage.toUpperCase().replace(/_/g, ' ')}</p>
                                    </span>
                                </span>

                                <div className="w-full flex flex-col items-start justify-start">
                                    <p className="text-md text-slate-700 font-[500] h-[40px]">Task Team</p>
                                    <div className="w-full flex flex-col items-start justify-start gap-2">
                                        {selectedItem.notification.task.team.map((data:any,ind:number)=>{
                                            return(
                                                <span className='w-full' key={ind}><UserInfo data={data.user} /></span>
                                            )
                                        })}
                                    </div>
                                </div>

                            </div>
                        }

                        

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Notification_modal