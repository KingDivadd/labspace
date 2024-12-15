'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import { get_auth_request } from '../api'
import { useChat } from '../context/ChatContext'
import Alert, { formatted_time, AvatarUserInfo, AssetCont, SmallAvatar } from '../component/helper'
import Loading from '../component/loading'
import Modal from '../component/modals/modal'
import Link from 'next/link'

const Admin_dashboard = () => {
    const router = useRouter()
    const {admin_dash, setAdmin_dash, setShowModal, showModal, setModalFor, modalFor, setSelectedItem, selectedItem, setModalSource, modalSource} = useChat()
    const [page_number, setPage_number] = useState(1)
    const [alert, setAlert] = useState({message: '', type: ''})


    useEffect(() => {
        const x_id_key = localStorage.getItem('x-id-key')
        if (x_id_key) {
            handle_admin_dashboard()
        }else{
            router.push('/auth/login')
        }
    }, [])

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    async function handle_admin_dashboard( ) {

            try {
                
                const response = await get_auth_request('app/admin-dashboard')     
                console.log(response)           

                if (response.status == 200 || response.status == 201){

                    
                    console.log('admin_dashboard ', response.data)
                    setAdmin_dash(response.data)
                }else if(response.response.status == 401){
                    router.push('/auth/login')
                }
                else{
                    showAlert(response.response.data.err, "error")
                    // router.push('/auth/login')
                }
            } catch (err:any) {
                showAlert('An unexpected error occurred. Please try again later.', 'error');
            }
        
    }

    function handle_view(data:any) {
        setShowModal(!showModal)
        setModalFor('view')
        setModalSource('task-modal')
        setSelectedItem(data)
    }

    
    function handle_edit_payment(data:any) {
        setShowModal(!showModal)
        setModalFor('edit')
        setModalSource('payment')
        setSelectedItem(data)
    }
    
    function handle_edit(data:any) {
        setShowModal(!showModal)
        setModalFor('edit')
        setModalSource('user-modal')
        setSelectedItem(data)
    }

    function handle_delete(data:any) {
        setShowModal(!showModal)
        setModalFor('delete')
        setModalSource('user-modal')
        setSelectedItem(data)
    }

    function handle_task_delete(data:any) {
        setShowModal(!showModal)
        setModalFor('delete')
        setModalSource('task-modal')
        setSelectedItem(data)
    }

    return (
        <div className='relative w-full flex items-start justify-center  px-[20px] md:px-[55px] lg:px-[75px] py-5 '  >
            <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>
            
            <div className="w-full flex flex-col justify-start items-center gap-5 ">

                {/* section one metrics card */}
                <div className="w-full flex flex-wrap justify-between gap-[20px] sm:gap-10">
                    <div className="w-[45%] md:w-[250px] lg:w-[220px] h-[175px] rounded-[5px]  p-[25px] shadow-md flex flex-col items-center justify-center gap-5 border border-slate-200">
                            <p className="text-xl sm:text-2xl font-[600] text-blue-600">{admin_dash.total_no_of_tasks || '0'}</p>
                            <p className="text-sm sm:text-md font-[500] text-center text-blue-600 ">Total Tasks </p>
                    </div>

                    <div className="w-[45%] md:w-[250px] lg:w-[220px] h-[175px] rounded-[5px]  p-[25px] shadow-md flex flex-col items-center justify-center gap-5 border border-slate-200">
                            <p className="text-xl sm:text-2xl font-[600] text-amber-600">{admin_dash.total_no_of_todo_tasks || '0' }</p>
                            <p className="text-sm sm:text-md font-[500] text-center text-center text-amber-600 ">Todo Tasks </p>
                    </div>
                    
                    <div className="w-[45%] md:w-[250px] lg:w-[220px] h-[175px] rounded-[5px]  p-[25px] shadow-md flex flex-col items-center justify-center gap-5 border border-slate-200">
                            <p className="text-xl sm:text-2xl font-[600] text-blue-600">{admin_dash.total_no_of_assigned_tasks || '0'}</p>
                            <p className="text-sm sm:text-md font-[500] text-center text-blue-600 ">Assigned Tasks </p>
                    </div>
                    
                    <div className="w-[45%] md:w-[250px] lg:w-[220px] h-[175px] rounded-[5px]  p-[25px] shadow-md flex flex-col items-center justify-center gap-5 border border-slate-200">
                            <p className="text-xl sm:text-2xl font-[600] text-amber-600">{admin_dash.total_no_of_tasks_in_progress || '0' }</p>
                            <p className="text-sm sm:text-md font-[500] text-center text-center text-amber-600 ">Task In Progress</p>
                    </div>
                    
                    <div className="w-[45%] md:w-[250px] lg:w-[220px] h-[175px] rounded-[5px]  p-[25px] shadow-md flex flex-col items-center justify-center gap-5 border border-slate-200">
                            <p className="text-xl sm:text-2xl font-[600] text-teal-700">{admin_dash.total_no_of_completed_tasks || '0'}</p>
                            <p className="text-sm sm:text-md font-[500] text-center text-center text-teal-700 ">Completed Task</p>
                    </div>
                    
                    
                </div>


                {/* recent tasks table */}
                <div className="w-full flex flex-col items-start justify-start shadow-lg rounded-[3px] border border-slate-100">
                    <span className="h-[50px] w-full flex items-center justify-start px-[15px] border-b border-slate-200 ">
                        <p className="text-md font-[600] ">Recent Tasks</p>
                    </span>
                    

                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[1350px] p-[15px] flex flex-col items-start justify-start mx-auto ">
                            <span className="w-full h-[50px] flex items-center justify-between bg-blue-600 text-white rounded-[3px]">
                                <p className="text-sm w-[17.5%] px-[15px] ">Last Updated</p>
                                <p className="text-sm w-[8%] px-[15px] ">Task Id</p>
                                <p className="text-sm w-[14.5%] px-[15px] ">Task Title</p>
                                <p className="text-sm w-[10%] px-[15px] ">Priority</p>
                                <p className="text-sm w-[17.5%] px-[15px] ">Team</p>
                                <p className="text-sm w-[10%] px-[15px] ">Stage</p>
                                <p className="text-sm w-[15%] px-[15px] ">Assets</p>
                                <p className="text-sm w-[15%] px-[15px] ">Action</p>
                            </span>

                            {admin_dash.recent_tasks == null ? 
                            
                            <div className="w-full h-[500px] flex items-center justify-center  ">
                                <Loading />
                            </div>
                            :
                            <div className="w-full h-[500px] flex flex-col items-start justify-start overflow-y-auto">
                                <div className="w-full h-full flex flex-col justify-start">
                                    
                                    {admin_dash?.recent_tasks?.length ? 
                                    <>
                                    {admin_dash?.recent_tasks.map((data: any, ind: number)=>{
                                        const {task_id, updated_at, task_title, task_ind, priority, stage, team, activities, assets, sub_tasks } = data                                        

                                        const formated_stage = stage == 'todo' ? 'Todo' : stage == 'in_progress' ? 'In Progress' : stage == 'completed' ? 'Completed': ''

                                        const info = {activities: activities.length, assets: assets.length, sub_task: sub_tasks.length}

                                        return(
                                            <span key={ind} className=" table-body-row-1  " >
                                                <p className="text-sm font-[500] w-[17.5%] px-[15px] text-slate-600 ">{formatted_time(Number(updated_at))}</p>
                                                <p className="text-sm font-[500] w-[8%] px-[15px] cursor-pointer text-blue-600 hover:underline " onClick={()=> handle_view(data)}>{task_ind}</p>
                                                <p className="text-sm font-[500] w-[14.5%] overflow truncate text-ellipsis  px-[15px] text-slate-600 ">{task_title}</p>
                                                <p className={`text-sm font-[500] w-[10%] px-[15px] ${priority == 'high' ? 'text-red-600': priority == 'normal' ? 'text-teal-700': 'text-amber-600'}`}>{priority} </p>

                                                <span className="w-[17.5%] px-[15px] flex items-center justify-start overflow-visible ">
                                                    {team.slice(0, 5).map((data: any, indd: number) => {
                                                        const { user_id, avatar, first_name, last_name, email, title, is_active, is_admin } = data.user;
                                                        return (
                                                        <span key={indd} className="avatar-info">
                                                            <AvatarUserInfo key={indd} data={data.user} />
                                                        </span>
                                                        );
                                                    })}
                                                </span>

                                                <span className={`w-[10%] px-[15px] flex items-center justify-start gap-[5px] ${stage == 'todo'?'text-blue-600' : stage == 'in_progress' ? 'text-amber-600' : stage  == 'completed' ? 'text-teal-700' :'' } `}> {formated_stage} </span>
                                                <span className="w-[15%] px-[15px] flex items-center justify-start gap-[5px] "> <AssetCont activities={info.activities} assets={info.assets} sub_tasks={info.sub_task}  /> </span>

                                                <span className=" w-[15%] px-[15px] flex items-center justify-start gap-[10px]" >
                                                    <button className="px-[17.5px] h-[30px] text-sm rounded-[2.5px] text-white bg-sky-500 hover:bg-sky-600" onClick={()=> handle_view(data)} >View</button>
                                                    {/* <button className="px-[17.5px] h-[30px] text-sm rounded-[2.5px] text-white bg-amber-600 hover:bg-amber-700" onClick={()=> handle_edit(data)} >edit</button> */}
                                                    <button className="px-[17.5px] h-[30px] text-sm rounded-[2.5px] text-white bg-red-600 hover:bg-red-700" onClick={()=> handle_task_delete(data)}>Delete</button>
                                                </span>
                                                
                                            </span>
                                        )
                                    })}
                                    </>
                                    : 
                                    <div className="w-full flex items-center justify-center h-full  ">
                                        <p className="text-md font-[500] ">No Task has been created yet.</p>
                                    </div> }
                                </div>
                            </div>}

                        </div>
                    </div>

                    <span className="w-full h-[50px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-gray-300 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-md cursor-pointer">Prev</p>
                            <span className="w-[30px] h-[30px] flex items-center justify-center border border-slate-400 rounded-[2px]">
                            1
                            </span>
                            <p className="text-md cursor-pointer" >Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-md"> 
                                Showing 1-15 of {admin_dash.recent_tasks ? <>{admin_dash.recent_tasks.length} </>:'0'}
                            </p>
                        </span>
                    </span>
                </div>

                {/* recent users table */}
                <div className="w-full flex flex-col items-start justify-start shadow-lg  rounded-[3px] border border-slate-200">
                    <span className="h-[50px] w-full flex items-center justify-start px-[15px] border-b border-slate-300 ">
                        <p className="text-md font-[600] ">Team Memebers</p>
                    </span>
                    
                    <div className="w-full overflow-x-auto">

                        <div className="min-w-[1350px] p-[15px] flex flex-col items-start justify-start mx-auto ">
                            <span className="w-full h-[50px] flex items-center justify-between bg-blue-600 text-white rounded-[3px]">
                                <p className="text-sm font-[500] w-[15%] px-[15px] ">Last Updated</p>
                                <p className="text-sm font-[500] w-[18.5%] px-[15px] ">Full Name</p>
                                <p className="text-sm font-[500] w-[21.5%] px-[15px] ">Email</p>
                                <p className="text-sm font-[500] w-[17.5%] px-[15px] ">Title</p>
                                <p className="text-sm font-[500] w-[10%] px-[15px] ">Status</p>
                                <p className="text-sm font-[500] w-[17.5%] px-[15px] ">Action</p>
                            </span>

                            {admin_dash.recent_users == null ? 
                            
                            <div className="w-full h-[500px] flex items-center justify-center">
                                <Loading />
                            </div>
                            :
                            <div className="w-full h-[500px] flex flex-col items-start justify-start overflow-y-auto">
                                <div className="w-full h-full flex flex-col justify-start">
                                    {admin_dash?.recent_users.map((data: any, ind: number)=>{
                                        const {user_id, first_name, last_name, email, is_admin, title, role, created_at, updated_at,is_active } = data
                                        return(
                                            <span key={ind} className=" table-body-row-1  " >
                                                {/* <p className="text-sm font-[500] w-[15%] px-[15px] ">{readable_date(Number(updated_at) / 1000)}</p> */}
                                                <p className="text-sm font-[500] w-[15%] px-[15px] text-slate-600 ">{formatted_time(Number(updated_at))}</p>
                                                <div className="text-sm font-[500] w-[18.5%] px-[15px] flex items-center justify-start gap-[20px] text-slate-600">
                                                    <SmallAvatar user={data} isActive={is_active} toggleActive={true} />
                                                    {first_name} {last_name}
                                                </div>
                                                <p className="text-sm font-[500] w-[21.5%] px-[15px] flex-wrap text-start text-slate-600">{email}</p>
                                                <p className="text-sm font-[500] w-[17.5%] px-[15px] text-slate-600 ">{title}</p>
                                                <span className=" w-[10%] px-[15px] flex items-center justify-start text-slate-600 " >
                                                    {is_active ? <p className="text-sm text-sky-500 font-[500]  ">Active</p> : <p className="text-sm text-red-600 font-[500]  ">Inactive</p>}
                                                </span>
                                                <span className=" w-[17.5%] px-[15px] flex items-center justify-start gap-[15px]" >
                                                    <button className="px-5 h-[30px] text-sm rounded-[2.5px] text-white bg-amber-600 hover:bg-amber-700" onClick={()=> handle_edit(data)}>Edit</button>
                                                    <button className="px-5 h-[30px] text-sm rounded-[2.5px] text-white bg-red-600 hover:bg-red-700" onClick={()=> handle_delete(data)}>Delete</button>
                                                </span>
                                                
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>}

                        </div>
                    </div>

                    <span className="w-full h-[50px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-gray-300 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-md cursor-pointer" >Prev</p>
                            <span className="w-[30px] h-[30px] flex items-center justify-center rounded-[2px] border border-slate-400">1</span>
                            <p className="text-md cursor-pointer" >Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-md">Showing 1-15 of {admin_dash.recent_users ? admin_dash.recent_users.length : 0}</p>
                        </span>
                    </span>
                </div>

                {/* section four recent payments table */}
                <div className="w-full flex flex-col items-start justify-start shadow-lg rounded-[3px] border border-slate-100">
                    <span className="h-[50px] w-full flex items-center justify-start px-[15px] border-b border-slate-200 ">
                        <p className="text-md font-[600] ">Payment History</p>
                    </span>
                    
                    <div className="w-full flex flex-wrap items-center justify-between p-[15px] gap-5 pb-0 ">


                    </div>

                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[1350px] p-[15px] flex flex-col items-start justify-start mx-auto ">
                            <span className="w-full h-[50px] flex items-center justify-between bg-blue-600 text-white rounded-[3px]">
                                <p className="text-sm w-[10%] px-[15px] ">Payment Id</p>
                                <p className="text-sm w-[8%] px-[15px] ">Task Id</p>
                                <p className="text-sm w-[13%] px-[15px] ">Task Title</p>
                                <p className="text-sm w-[13%] px-[15px] ">Payer Name</p>
                                <p className="text-sm w-[8%] px-[15px] ">Amount</p>
                                <p className="text-sm w-[10%] px-[15px] ">Added By</p>
                                <p className="text-sm w-[15%] px-[15px] ">Payment File</p>
                                <p className="text-sm w-[15%] px-[15px] ">Date</p>
                                <p className="text-sm w-[8%] px-[15px] ">Action</p>
                            </span>

                            {admin_dash.recent_payments == null ? 
                            
                            <div className="w-full h-[500px] flex items-center justify-center  ">
                                <Loading />
                            </div>
                            :
                            <div className="w-full h-[500px] flex flex-col items-start justify-start overflow-y-auto">
                                <div className="w-full h-full flex flex-col justify-start">
                                    
                                    {admin_dash.recent_payments.length ? 
                                    <>
                                    {admin_dash.recent_payments.map((data: any, ind: number)=>{
                                        const {payment_id, task, payer_name, amount, added_by, stage, payment_receipt, created_at } = data    
                                        
                                        const id = payment_id.split('-')

                                        const formatted_payment_id = `PY${id[0]}`

                                        const formated_stage = stage == 'todo' ? 'Todo' : stage == 'in_progress' ? 'In Progress' : stage == 'completed' ? 'Completed': ''

                                        return(
                                            <span key={ind} className=" table-body-row-1  " >
                                                <p className="text-sm font-[500] w-[10%] px-[15px] text-slate-600 ">{formatted_payment_id}</p>
                                                <p className="text-sm font-[500] w-[8%] px-[15px] text-slate-600 ">{task.task_ind}</p>
                                                <p className="text-sm font-[500] w-[13%] px-[15px] text-slate-600 ">{task.task_title}</p>
                                                <p className="text-sm font-[500] w-[13%] px-[15px] text-slate-600 ">{payer_name}</p>
                                                <p className="text-sm font-[500] w-[8%] px-[15px] text-slate-600 ">{Number(amount).toLocaleString()}</p>
                                                <p className="text-sm font-[500] w-[10%] px-[15px] text-slate-600 ">{added_by.first_name} {added_by.last_name}</p>
                                                <p className="text-sm font-[500] w-[15%] px-[15px] text-slate-600 hover:text-blue-600 hover:underline">
                                                    <Link href={payment_receipt[0].url} >{payment_receipt[0].name}</Link>
                                                </p>
                                                <p className="text-sm font-[500] w-[15%] px-[15px] text-slate-600 ">{formatted_time(Number(created_at))}</p>
                                                <span className="px-[15px] w-[8%] flex items-center ">
                                                    <button className="h-[30px] rounded-[2.5px] bg-amber-600 hover:bg-amber-700 text-white px-5 text-sm " onClick={()=> handle_edit_payment(data)}>Edit</button>
                                                </span>

                                                
                                            </span>
                                        )
                                    })}
                                    </>
                                    : 
                                    <div className="w-full flex items-center justify-center h-full  ">
                                        <p className="text-md font-[500] ">No payment has been made yet.</p>
                                    </div> }
                                </div>
                            </div>}

                        </div>
                    </div>

                    <span className="w-full h-[50px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-gray-300 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-md cursor-pointer" >Prev</p>
                            <span className="w-[30px] h-[30px] flex items-center justify-center rounded-[2px] border border-slate-400">1</span>
                            <p className="text-md cursor-pointer" >Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-md">Showing 1-15 of {admin_dash.recent_users ? admin_dash.recent_users.length : 0}</p>
                        </span>
                    </span>
                </div>

            
            </div>
            
            {showModal && <Modal showModal={showModal} setShowModal={setShowModal} modalFor={modalFor} setModalFor={setModalFor} selectedItem={selectedItem} setSelectedItem={setSelectedItem} modalSource={modalSource} setModalSource={setModalSource} />}
        </div>
    )
}

export default Admin_dashboard