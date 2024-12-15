'use client'
import React, {useState, useEffect} from 'react'
import Modal from '../component/modals/modal'
import { useChat } from '../context/ChatContext'
import { useRouter } from 'next/navigation'
import { get_auth_request } from '../api'
import Alert, {SmallAvatar, formatted_time, readable_date} from '../component/helper'
import moment from 'moment'
import Loading from '../component/loading'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'

const NotificationPage = () => {
    const {loggedInUser} = useChat()
    const router = useRouter()
    const [page_number, setPage_number] = useState(1)
    const [list_number, setList_number] = useState(15)
    const [notification_box, setNotification_box] = useState<Props | null>(null);
    const [filtered_notification_box, setFiltered_notification_box] = useState<Props | null>(null);
    const [filters, setFilters] = useState({filter_input: '', disposition: ''})
    const {modalFor, setModalFor, selectedItem, setSelectedItem, showModal, setShowModal, setModalSource, modalSource} = useChat()
    const [alert, setAlert] = useState({message: '', type: ''})
    const [isActive, setIsActive] = useState(true);
    const toggleActive = () => setIsActive(!isActive);
    const [drop_list_no, setDrop_list_no] = useState(false)


    interface Props {
        forEach?(arg0: (data: any, ind: number) => void): unknown;
        filter?(arg0: (user: any) => any): unknown;
        map?(arg0: (data: any) => void): unknown;
        total_number_of_pages?: number; // Now optional and can be undefined
        total_number_of_notifications?: number; // Now optional can be undefined
        notifications: any;
    } 

    useEffect(() => {
        const x_id_key = localStorage.getItem('x-id-key')
        if (x_id_key) {
            handle_fetch_notifications(list_number, page_number)
        }else{
            router.push('/auth/login')
        }
    }, [showModal, list_number])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function handle_fetch_notifications(list_num: number, page_num: number) {

            try {
                
                const response = await get_auth_request(`app/all-paginated-notification/${list_num}/${page_num}`)  
                
                if (response.status == 200 || response.status == 201){
                    
                    const notifications = response.data
                    
                    setNotification_box(notifications)
                    setFiltered_notification_box(notifications)
    
                    console.log(response)
                    
                }else if(response.response.status == 401){
                    router.push('/auth/login')
                }
                else{
                    showAlert(response.response.data.err, "error")
                }
            } catch (err:any) {
                console.error('Network or unexpected error:', err);
                showAlert('An unexpected error occurred. Please try again later.', 'error');
            } 
        
    }


    async function app_notifications_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = notification_box?.total_number_of_pages

        if (item === 'prev') {
        if (page_number > 1) {
            new_page_number = page_number - 1;
        }
        } else if (item === 'next') {
        if (max_page_number && page_number < max_page_number) {
            new_page_number = page_number + 1;
        }
        } else {
        new_page_number = item;
        }

        setPage_number(new_page_number);
        
        handle_fetch_notifications(list_number, new_page_number)
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = notification_box?.total_number_of_pages || 1;
        const max_displayed_pages = 3;

        if (max_page_number <= max_displayed_pages) {
        for (let i = 1; i <= max_page_number; i++) {
            pages.push(
            <p
                key={i}
                className={`text-md font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-600 text-white' : ''
                }`}
                onClick={() => app_notifications_action(i)}
            >
                {i}
            </p>
            );
        }
        } else {
        let startPage = Math.max(1, page_number - 1);
        let endPage = Math.min(page_number + 1, max_page_number);

        if (page_number === 1) {
            startPage = 1;
            endPage = max_displayed_pages;
        } else if (page_number === max_page_number) {
            startPage = max_page_number - 2;
            endPage = max_page_number;
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
            <p
                key={i}
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-700 text-white' : ''
                }`}
                onClick={() => app_notifications_action(i)}
            >
                {i}
            </p>
            );
        }
        }

        return pages;
    };  

    async function handle_filter(e: any) {
        const value = e.target.value.toLowerCase();
        setFilters({ ...filters, filter_input: value });
    
        if (notification_box && notification_box.notifications) {
            if (value.trim() !== '') {
                const filtered_notifications = notification_box.notifications.filter((data: any) => {

                    const user_id = data.user_ind?.toLowerCase() || '';
                    const first_name = data.first_name?.toLowerCase() || '';
                    const last_name = data.last_name?.toLowerCase() || '';
                    const title = data.title?.toLowerCase() || '';
                    const email = data.email || ''
                    
                    return (
                        user_id.includes(value) ||
                        first_name.includes(value) ||
                        last_name.includes(value) ||
                        title.includes(value) ||
                        email.includes(value)
                    );
                });
                
    
                setFiltered_notification_box({...filtered_notification_box, notifications:filtered_notifications});
            } else {
                setFiltered_notification_box(notification_box); // Reset to the original list
            }
        }
    }


    function handle_new_user() {
        setShowModal(!showModal)
        setModalFor('create')
        setModalSource('user-modal')
        
    }

    function handle_view(data:any) {
        setShowModal(!showModal)
        setModalFor('view')
        setModalSource('notification')
        setSelectedItem(data)
    }

    function handle_list_no(data:any) {
        if (data == 'all') {
            setList_number(0)
        }else{
            setList_number(data)
        }
        setDrop_list_no(!drop_list_no)
    }

    return (
        <div className='relative w-full flex items-start justify-center px-[75px] py-5 '  >
            <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>

            <div className="w-full flex flex-col justify-start items-center gap-5">

                {/* section user table */}
                <div className="w-full flex flex-col items-start justify-start shadow-lg  rounded-[3px] border border-slate-200">
                    <span className="h-[50px] w-full flex items-center justify-start px-[15px] border-b border-slate-300 ">
                        <p className="text-md font-[600] ">Notificationss</p>
                    </span>
                    
                    <div className="w-full flex items-center justify-between p-[15px] pb-0 ">

                        <span className="flex items-center gap-5">
                            <p className="text-sm">Showing</p>
                            <div className="w-[100px] relative flex flex-col items-start justify-start z-10">
                                <span className="h-[45px] w-full border border-slate-400 rounded-[3px] flex items-center justify-between px-[15px] " onClick={()=> setDrop_list_no(!drop_list_no)} > 
                                    {list_number == 0 ? "All": list_number }
                                    <span className="h-[20px] w-[20px] flex items-center justify-center">
                                        {drop_list_no ? <FaCaretUp size={'100%'} /> : <FaCaretDown size={'100%'} /> }
                                    </span>
                                </span>

                                {drop_list_no && <div className="w-full absolute top-[50px] left-0 flex flex-col items-start bg-white shadow-md rounded-[3px]">
                                    <span className="rounded-t-[3px] h-[45px] w-full text-sm hover:bg-blue-600 hover:text-white flex items-center justify-center" onClick={()=> handle_list_no(15)}>15</span>
                                    <span className="rounded-t-[3px] h-[45px] w-full text-sm hover:bg-blue-600 hover:text-white flex items-center justify-center" onClick={()=> handle_list_no(25)}>25</span>
                                    <span className=" h-[45px] w-full text-sm hover:bg-blue-600 hover:text-white flex items-center justify-center" onClick={()=> handle_list_no(50)}>50</span>
                                    <span className=" h-[45px] w-full text-sm hover:bg-blue-600 hover:text-white flex items-center justify-center" onClick={()=> handle_list_no(100)}>100</span>
                                    <span className="rounded-b-[3px] h-[45px] w-full text-sm hover:bg-blue-600 hover:text-white flex items-center justify-center" onClick={()=> handle_list_no('all')}>All</span>
                                </div>}
                            </div>
                        </span>

                        <span className="w-[250px] ">
                            <input type="text" placeholder='search' onChange={handle_filter} className='input-type-1 ' />
                        </span>

                    </div>

                    <div className="w-full overflow-x-auto">

                        <div className="min-w-[1350px] p-[15px] flex flex-col items-start justify-start mx-auto ">
                            <span className="w-full h-[50px] flex items-center justify-between bg-blue-600 text-white rounded-[3px]">
                                <p className="text-sm font-[500] w-[15%] px-[15px] ">Date</p>
                                <p className="text-sm font-[500] w-[17.5%] px-[15px] ">Title</p>
                                <p className="text-sm font-[500] w-[47.5%] px-[15px] ">Description</p>
                                <p className="text-sm font-[500] w-[10%] px-[15px] ">Status</p>
                                <p className="text-sm font-[500] w-[10%] px-[15px] ">Action</p>
                            </span>

                            {!filtered_notification_box?.notifications ? 
                            
                            <div className="w-full h-[500px] flex items-center justify-center">
                                <Loading />
                            </div>
                            :
                            <div className="w-full h-[500px] flex flex-col items-start justify-start overflow-y-auto">
                                {filtered_notification_box.notifications.length ? <div className="w-full h-full flex flex-col justify-start">
                                    {filtered_notification_box?.notifications.map((data: any, ind: number)=>{
                                        const {created_at, is_read, updated_at, notificationAssignment_id, notification_id, user_id, notification,   } = data
                                        const {status, notification_sub_type, notification_type, task,  team} = notification
                                        

                                        const formated_status = is_read == true ? 'Opened' : 'Not Opened'
                                        const is_user_match = loggedInUser.user_id === user_id;
                                        const is_task_creation = notification_sub_type === "task_creation" && notification_type === "task";
                                        const dislay_title = (is_user_match  && is_task_creation) ? 'New Task Created':''
                                        const description = is_user_match ? `Task with ${task? task.priority : 'selected'} Priority has been created. Current stage: ${task ? (task.stage == 'todo' ? 'Todo' : task.stage == 'in_progress'? 'In Progress': 'Completed' ): 'Todo'} and ${team? team.length: 1} Team members assigned.`:``

                                        return(
                                            <span key={ind} className=" table-body-row-1  " >
                                                {/* <p className="text-sm font-[500] w-[15%] px-[15px] ">{readable_date(Number(updated_at) / 1000)}</p> */}
                                                <p className="text-sm font-[500] w-[15%] px-[15px] text-slate-600 ">{formatted_time(Number(notification.created_at))}</p>
                                                <p className={`text-sm font-[500] w-[17.5%] px-[15px] flex items-center justify-start gap-[20px] text-slate-600 truncate text-ellipsis`} >
                                                    {dislay_title}
                                                </p>
                                                <p className="text-sm font-[500] w-[47.5%] px-[15px] flex-wrap text-start text-slate-600 whitespace-nowrap truncate text-ellipsis">{description}</p>

                                                <span className={`w-[10%] px-[15px] flex items-center justify-start gap-[5px] text-sm ${is_read == true?'text-teal-700' : 'text-amber-600' } `}> {formated_status} </span>
                                                <span className=" w-[10%] px-[15px] flex items-center justify-start gap-[15px]" >
                                                    <button className="px-5 h-[30px] text-sm rounded-[2.5px] text-white bg-sky-500 hover:bg-sky-600" onClick={()=> handle_view(data)}>View</button>
                                                </span>
                                                
                                            </span>
                                        )
                                    })}
                                </div> 
                                :
                                <div className="w-full flex items-center justify-center h-full  ">
                                    <p className="text-md font-[500] ">No Notification yets.</p>
                                </div> 
                                }
                            </div>}

                        </div>
                    </div>

                    <span className="w-full h-[50px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-gray-300 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-md cursor-pointer" onClick={() => app_notifications_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className="text-md cursor-pointer" onClick={() => app_notifications_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-md">Showing 1-{list_number == 0 ? 'All' : list_number} of {(filtered_notification_box && filtered_notification_box.notifications.length) || 0}</p>
                        </span>
                    </span>
                </div>


            </div>

            {showModal && <Modal showModal={showModal} setShowModal={setShowModal} modalFor={modalFor} setModalFor={setModalFor} selectedItem={selectedItem} setSelectedItem={setSelectedItem} modalSource={modalSource} setModalSource={setModalSource} />}
        </div>
    )
}

export default NotificationPage