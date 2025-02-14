'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import { get_auth_request } from '../api'
import { useChat } from '../context/ChatContext'
import Alert, { formatted_time, AvatarUserInfo, AssetCont, SmallAvatar, ProjectActionBtn } from '../component/helper'
import Loading from '../component/loading'
import Modal from '../component/modals/modal'
import Link from 'next/link'
import { FaExclamation, FaMoneyBillWave } from 'react-icons/fa6'
import { GoProjectRoadmap } from 'react-icons/go'
import { LiaMoneyBillWaveSolid } from 'react-icons/lia'

const Admin_dashboard = () => {
    const router = useRouter()
    const {admin_dash, setAdmin_dash, setShowModal, showModal, setModalFor, modalFor, setSelectedItem, selectedItem, setModalSource, modalSource, loggedInUser} = useChat()
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

                if (response.status == 200 || response.status == 201){
                    console.log(response.data)
                    
                    setAdmin_dash(response.data)
                }else if(response.response.status == 401){
                    router.push('/auth/login')
                }
                else{
                    showAlert(response.response.data.err, "error")
                }
            } catch (err:any) {
                showAlert('An unexpected error occurred. Please try again later.', 'error');
                showAlert('Network error, check internet connection.', 'error');
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
        <div className='relative w-full flex items-start justify-center overflow-y-auto'style={{height: 'calc(100vh - 60px)'}}  >
            <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>
            
            <div className="w-full flex flex-col justify-start items-center gap-[10px] overflow-y-auto">

                {/* section one metrics card */}
                    <div className="w-full flex flex-col items-start justif-start gap-5 p-[10px] py-5 bg-blue-500">

                        <p className="text-xl text-white font-[500]">Welcome {loggedInUser.first_name}</p>

                        <div className="w-full flex flex-wrap justify-between 2xl:justify-between gap-[10px]  ">
                
                                {/* project due */}

                            <div className={` ${loggedInUser.is_admin && "hidden"} bg-white min-w-[180px] max-xs:h-[75px] flex-grow max-xl:h-[80px] h-[90px] rounded-[5px]  p-[15px] shadow-md flex items-center justify-start gap-[10px] sm:gap-2`}>
                                <span className="h-full max-xs:w-[70px] w-[60px] sm:w-[55px] flex items-center justify-center">
                                    <span className="h-[50px] w-[50px] text-white  rounded-[50px] bg-blue-500 flex items-center justify-center">
                                        <GoProjectRoadmap size={'50%'} />
                                    </span>
                                </span>
                                <div className="flex-1 flex  flex-col items-start just1ify-center ">
                                    <p className="text-md font-[400] ">Assigned Project</p>
                                    <p className="text-md font-[500]">{admin_dash?.total_no_of_assigned_projects.toLocaleString() || 0}</p>
                                </div>

                            </div>

                            <div className={`${!loggedInUser.is_admin && 'hidden'} bg-white min-w-[180px] max-xs:h-[75px] flex-grow max-xl:h-[80px] h-[90px] rounded-[5px]  p-[15px] shadow-md flex items-center justify-start gap-[10px] sm:gap-2`}>
                                <span className="h-full max-xs:w-[70px] w-[60px] sm:w-[55px] flex items-center justify-center">
                                    <span className="h-[50px] w-[50px] text-white  rounded-[50px] bg-blue-500 flex items-center justify-center">
                                        <GoProjectRoadmap size={'50%'} />
                                    </span>
                                </span>
                                <div className="flex-1 flex  flex-col items-start just1ify-center ">
                                    <p className="text-md font-[400] ">Project Due</p>
                                    <p className="text-md font-[500]">{admin_dash?.pending_project.toLocaleString() || 0}</p>
                                </div>

                            </div>

                                {/* project pending */}
                            <div className={` bg-white min-w-[180px] max-xs:h-[75px] flex-grow max-xl:h-[80px] h-[90px] rounded-[5px]  p-[15px] shadow-md flex items-center justify-start gap-[10px] sm:gap-2`}>
                                <span className="h-full max-xs:w-[70px] w-[60px] sm:w-[55px] flex items-center justify-center">
                                    <span className="h-[50px] w-[50px] text-white  rounded-[50px] bg-amber-500 flex items-center justify-center">
                                        <GoProjectRoadmap size={'50%'} />
                                    </span>
                                </span>
                                <div className="flex-1 flex  flex-col items-start just1ify-center ">
                                    <p className="text-md font-[400] ">Project Pending</p>
                                    <p className="text-md font-[500]">{admin_dash?.pending_project.toLocaleString() || 0}</p>
                                </div>

                            </div>

                            {/* Gross (Total Project Cost) */}
                            <div className={`${!loggedInUser.is_admin && 'hidden'} bg-white min-w-[180px] max-xs:h-[75px] flex-grow max-xl:h-[80px] h-[90px] rounded-[5px]  p-[15px] shadow-md flex items-center justify-start gap-[10px] sm:gap-2`}>
                                <span className="h-full max-xs:w-[70px] w-[60px] sm:w-[55px] flex items-center justify-center">
                                    <span className="h-[50px] w-[50px] text-white  rounded-[50px] bg-blue-500 flex items-center justify-center">
                                        <LiaMoneyBillWaveSolid size={'50%'} />
                                    </span>
                                </span>
                                <div className="flex-1 flex  flex-col items-start just1ify-center ">
                                    <p className="text-md font-[400] ">Total Project Cost</p>
                                    <p className="text-md font-[500]">#{admin_dash?.total_project_cost.toLocaleString() || 0}</p>
                                </div>

                            </div>

                            {/* Gross (Total Project Cost) */}
                            <div className={`${!loggedInUser.is_admin && 'hidden'} bg-white min-w-[180px] max-xs:h-[75px] flex-grow max-xl:h-[80px] h-[90px] rounded-[5px]  p-[15px] shadow-md flex items-center justify-start gap-[10px] sm:gap-2`}>
                                <span className="h-full max-xs:w-[70px] w-[60px] sm:w-[55px] flex items-center justify-center">
                                    <span className="h-[50px] w-[50px] text-white  rounded-[50px] bg-green-600 flex items-center justify-center">
                                        <LiaMoneyBillWaveSolid size={'50%'} />
                                    </span>
                                </span>
                                <div className="flex-1 flex  flex-col items-start just1ify-center ">
                                    <p className="text-md font-[400] ">Amount Paid</p>
                                    <p className="text-md font-[500]">#{admin_dash?.total_amount_paid.toLocaleString() || 0}</p>
                                </div>

                            </div>

                            <div className={`${!loggedInUser.is_admin && 'hidden'} bg-white min-w-[180px] max-xs:h-[75px] flex-grow max-xl:h-[80px] h-[90px] rounded-[5px]  p-[15px] shadow-md flex items-center justify-start gap-[10px] sm:gap-2`}>
                                <span className="h-full max-xs:w-[70px] w-[60px] sm:w-[55px]  flex items-center justify-center">
                                    <span className="h-[50px] w-[50px] text-white  rounded-[50px] bg-amber-500 flex items-center justify-center">
                                        <FaExclamation size={'50%'} />
                                    </span>
                                </span>
                                <div className="flex-1 flex flex-col items-start just1ify-center ">
                                    <p className="text-md font-[400] ">Amount Due</p>
                                    <p className="text-md font-[500]">#{admin_dash?.total_amount_due.toLocaleString() || 0}</p>
                                </div>

                            </div>

                        </div>
                    
                    </div>


                {/* recent tasks table */}
                <div className="w-full flex items-start justify-start p-[10px] pt-0">
                    <div className="bg-white w-full flex flex-col items-start justify-start shadow-lg rounded-[5px] border border-slate-100 ">
                        <span className="h-[45px] w-full flex items-center justify-start px-[10px] sm:px-[15px] ">
                            <p className="text-md font-[500] ">Recent Projects</p>
                        </span>
                        

                        <div className="overflow-x-auto table-cont" >
                            <div className="min-w-[950px] px-[10px] sm:px-[15px] py-[10px] flex flex-col items-start justify-start mx-auto ">
                                <span className="w-full max-xl:h-[40px] h-[45px] flex items-center justify-between bg-blue-500 text-white rounded-[3px]">
                                    <p className="text-sm w-[18%] px-[10px] sm:px-[15px] ">Last Updated</p>
                                    <p className="text-sm w-[14.5%] px-[10px] sm:px-[15px] ">Project Title</p>
                                    <p className="text-sm w-[12%] px-[10px] sm:px-[15px] ">Project Cost</p>
                                    <p className="text-sm w-[15%] px-[10px] sm:px-[15px] ">Assigned To</p>
                                    <p className="text-sm w-[12%] px-[10px] sm:px-[15px] ">Stage</p>
                                    <p className="text-sm w-[10%] px-[10px] sm:px-[15px] ">Assets</p>
                                    <p className="text-sm w-[11%] px-[10px] sm:px-[15px] "></p>
                                </span>

                                {admin_dash && admin_dash.recent_projects == null ? 
                                
                                <div className="w-full  flex items-center justify-center  " style={{ height: 'calc(100vh - 355px)'}}>
                                    <Loading />
                                </div>
                                :
                                <div className="w-full  flex flex-col items-start justify-start overflow-y-auto" style={{ height: 'calc(100vh - 355px)'}}>
                                    <div className="w-full h-full flex flex-col justify-start">
                                        
                                        {admin_dash?.recent_projects?.length ? 
                                        <>
                                        {admin_dash?.recent_projects.map((data: any, ind: number)=>{
                                            const {task_id, updated_at, project_title, task_ind, priority, stage, team, activities, assets, tasks,cost } = data                                        

                                            const formated_stage = stage == 'todo' ? 'Todo' : stage == 'in_progress' ? 'In Progress' : stage == 'completed' ? 'Completed': ''

                                            const info = {activities: activities.length, assets: assets.length, sub_task: tasks.length}

                                            return(
                                                <span key={ind} className=" table-body-row-1  " >
                                                <p className="text-sm font-[500] w-[18%] px-[10px] sm:px-[15px] text-slate-600 ">{formatted_time(Number(updated_at))}</p>
                                                <p className="text-sm font-[500] w-[14.5%] overflow truncate text-ellipsis  px-[10px] sm:px-[15px] text-slate-600 ">{project_title}</p>
                                                <p className="text-sm font-[500] w-[12%] overflow truncate text-ellipsis  px-[10px] sm:px-[15px] text-slate-600 "> {Number(cost).toLocaleString()}</p>

                                                <span className="w-[15%] px-[10px] sm:px-[15px] flex items-center justify-start overflow-visible ">
                                                    {team.slice(0, 5).map((data: any, indd: number) => {
                                                        const { user_id, avatar, first_name, last_name, email, title, is_active, is_admin } = data.user;
                                                        return (
                                                        <span key={indd} className="avatar-info">
                                                            <AvatarUserInfo key={indd} data={data.user} />
                                                        </span>
                                                        );
                                                    })}
                                                </span>

                                                <span className={`w-[12%] px-[10px] sm:px-[15px] flex items-center justify-start gap-[5px] text-sm `}> {formated_stage} </span>

                                                <span className="w-[10%] px-[10px] sm:px-[15px] flex items-center justify-start gap-[5px] "> <AssetCont activities={info.activities} assets={info.assets} tasks={info.sub_task}  /> </span>

                                                <span className=" w-[11%] px-[10px] sm:px-[15px] flex items-center justify-start gap-[10px]" >
                                                    <ProjectActionBtn data={data} />
                                                </span>
                                                
                                            </span>
                                            )
                                        })}
                                        </>
                                        : 
                                        <div className="w-full flex items-center justify-center h-full  ">
                                            <p className="text-md font-[500] ">{loggedInUser.is_admin ? 'No Project has been created yet' : 'No Project has been assigned to you yet.'}</p>
                                        </div> }
                                    </div>
                                </div>}

                            </div>
                        </div>

                        <span className="w-full h-[45px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-slate-200 px-[10px] sm:px-[15px] ">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className="text-md cursor-pointer">Prev</p>
                                <span className="w-[30px] h-[27.5px] flex items-center justify-center border border-slate-400 rounded-[2px]">
                                1
                                </span>
                                <p className="text-md cursor-pointer" >Next</p>
                            </span>
                            <span className="flex flex-row items-center justify-end gap-3 h-full">
                                <p className="text-md"> 
                                    Showing 1-15 of {admin_dash && admin_dash.recent_projects ? <>{admin_dash.recent_projects.length} </>:'0'}
                                </p>
                            </span>
                        </span>
                    </div>
                </div>

            
            </div>
            
            
            {showModal && <Modal showModal={showModal} setShowModal={setShowModal} modalFor={modalFor} setModalFor={setModalFor} selectedItem={selectedItem} setSelectedItem={setSelectedItem} modalSource={modalSource} setModalSource={setModalSource} />}
        </div>
    )
}

export default Admin_dashboard