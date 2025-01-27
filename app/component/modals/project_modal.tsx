'use client'
import React, {useState, useEffect, useRef} from 'react'
import { useChat } from '../../context/ChatContext'
import Alert, {Avatar, Dropdownlg, FileDisplay, FileUpload, TaskActionBtn, UserInfo, convert_to_unix, formatted_time, readable_date, readable_date_time} from '../helper'
import { FaTimes } from 'react-icons/fa'
import { LuCheck } from 'react-icons/lu'
import Loading from '../loading'
import { delete_auth_request, patch_auth_request, post_auth_request } from '../../api'
import { useRouter } from 'next/navigation'
import moment from 'moment'
import { IoWarningOutline } from 'react-icons/io5'
import Payment_page from '../../pages/payment_page'
import { HiOutlineDotsVertical } from 'react-icons/hi'

type ProjectBox = {
    project_title: string;
    priority: string;
    stage: string;
    cost: number;
    team: string[];
    assets: any[];
};

const Project_modal = () => {
    const router = useRouter()
    const { modalFor, setModalFor, setShowModal, selectedItem, app_users, setTrigger_notification,trigger_notification, current_project_nav, setCurrent_project_nav} = useChat()
    const [alert, setAlert] = useState({message: '', type: ''})
    const [project_box, setProject_box] = useState<ProjectBox>({project_title: "", priority: 'normal', cost: 0, stage: 'todo', team: [], assets: []})
    const [tasks, setTasks] = useState({title:'', is_completed: false, date:'2024-12-10', due_date: 0  })
    const [activity, setActivity] = useState({description: '', activity_type: 'commented'})
    const [team_members, setTeam_members] = useState([])
    const [loading, setLoading] = useState(false)
    const [user_drop, setUser_drop] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);

    

    useEffect(() => {
        // setTasks({...tasks, due_date: convert_to_unix()})
        if (modalFor != 'create') {

            const { project_title, priority, stage, team, assets, cost } = selectedItem

            if (current_project_nav == 'edit-project') {
                setModalFor('edit')
            }else if (current_project_nav == 'create-project') {
                setModalFor('create-project')
            }

            // const project_stage = stage == 'todo' ? 'Todo' : stage == 'completed' ? 'Completed' : stage == 'in_progress' ? "In Progress" :  ""
            // const project_priority = priority == 'high' ? 'High' : priority == 'low' ? 'Low' : priority == 'normal' ? 'Normal': ''                    

            const user_ids = team.map((data: any) => data.user.user_id)

            const team_members_info = team.map((data: any) => ({
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                user_id: data.user.user_id
            }));

            setTeam_members(team_members_info)
            
            setProject_box({ ...project_box, project_title, priority: priority, stage: stage, team: user_ids, assets, cost: Number(cost) })
        }
    }, [])


    function handle_activity_change(e:any) {
        const name = e.target.name
        const value = e.target.value
        setActivity({...activity, [name]:value})
    }

    function handle_change(e:any){
        const name = e.target.name;
        const value = e.target.value;
        if(name == 'cost'){
            setProject_box({...project_box, [name]: Number(value.replace(/,/g,''))})
            
            setTasks({...tasks, [name]: Number(value.replace(/,/g,''))})
        }else{
            setProject_box({...project_box, [name]: value})
            
            setTasks({...tasks, [name]: value})
        }

    }

    function handle_cancel_project() {
        setProject_box({...project_box, project_title: '', priority: '', stage: ''})
        setShowModal(false)
    }

    
    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }


    async function handle_create_activity(e: any) {
        e.preventDefault();        

        console.log(activity)

        if (!activity.description || !activity.activity_type) {
            if (!activity.description){showAlert('Please enter activity description', 'warning')}
            if (!activity.activity_type){showAlert('Please select an activity type', 'warning')}

            if (!activity.description || !activity.activity_type) {
                showAlert('Please fill all fields', 'warning')
            }

            return;
        } else {
            setLoading(true); 
            try {
                
                const response = await post_auth_request(`app/add-activity/${selectedItem.project_id}`, activity)                

                if (response.status == 200 || response.status == 201){

                    showAlert(response.data.msg, "success")
                    setLoading(false)
                    setTrigger_notification(!trigger_notification)

                    setActivity({description: '', activity_type: ''})

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

    async function handle_create_task(e: any) {
        e.preventDefault();        

        if (!tasks.title ) {
            if (!tasks.title){showAlert('Please enter task title', 'warning')}

            return;
        } else {
            setLoading(true); 
            try {
                
                const box = {title: tasks.title, due_date: convert_to_unix(tasks.date) * 1000}
                const response = await post_auth_request(`app/create-task/${selectedItem.project_id}`, box)                

                if (response.status == 200 || response.status == 201){


                    showAlert(response.data.msg, "success")
                    setLoading(false)
                    setTrigger_notification(!trigger_notification)

                    setTimeout(() => {
                        setModalFor('view')
                        setCurrent_project_nav('project_details')
                    }, 1500);

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

    async function handle_submit(e: any) {
        e.preventDefault();        

        if (!project_box.project_title || !project_box.priority || !project_box.stage || !project_box.team.length) {
            if (!project_box.project_title){showAlert('Please provide the project title ', 'warning')}
            if (!project_box.priority){showAlert('Please select the project priority ', 'warning')}
            if (!project_box.stage){showAlert('Please select the project stage', 'warning')}
            if (!project_box.team.length){showAlert('Project not assiged to anyone yet! ', 'warning')}

            if (!project_box.project_title && !project_box.priority && !project_box.stage && !project_box.team.length){
                showAlert('Please provide all project required information', 'warning')
            }

            return;
        } else {
            setLoading(true); 
            try {
                
                const response = await post_auth_request('app/create-project', project_box)                

                if (response.status == 200 || response.status == 201){


                    setProject_box({project_title: "", priority: '', stage: '', team: [], assets: [], cost: 0})
                    setTeam_members([])
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
    }

    async function handle_edit(e: any) {
        e.preventDefault();        

        if (!project_box.project_title || !project_box.priority || !project_box.stage || !project_box.team.length) {
            if (!project_box.project_title){showAlert('Please provide the project title ', 'warning')}
            if (!project_box.priority){showAlert('Please select the project priority ', 'warning')}
            if (!project_box.stage){showAlert('Please select the project stage', 'warning')}
            if (!project_box.team.length){showAlert('Project not assiged to anyone yet! ', 'warning')}

            if (!project_box.project_title && !project_box.priority && !project_box.stage && !project_box.team.length){
                showAlert('Please provide all project required information', 'warning')
            }

            return;
        } else {
            setLoading(true); 
            try {
                
                const response = await patch_auth_request(`app/edit-project/${selectedItem.project_id}`, project_box)                

                if (response.status == 200 || response.status == 201){


                    // setProject_box({project_title: "", priority: '', stage: '', team: [], assets: []})
                    setTeam_members([])
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
    }

    async function handle_delete(e: any) {
        e.preventDefault();        

            setLoading(true); 
            try {
                
                const response = await delete_auth_request(`app/delete-project/${selectedItem.project_id}`)                

                if (response.status == 200 || response.status == 201){


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

    const handleSelect = (selected: string, id?: string) => {
        const value = selected.replace(/ /g, '_').toLowerCase()
        if (id === 'stage'){
            setProject_box({...project_box, stage: value})
        }else if (id === 'priority'){
            setProject_box({...project_box, priority: value})
        }
    };

    function handle_file_change(files:any[], id: string) {
        setProject_box({...project_box, assets: files})
    }

    function select_team_member(data:any) {
        const {user_id, first_name, last_name} = data

        const box:string[] = project_box.team
        const team_member_box:any = team_members || []

        if (!box.includes(user_id)){    
            box.push(user_id)
            setProject_box({...project_box, team: box })

            team_member_box.push(data)
            setTeam_members(team_member_box)
        }else{
            const dat = {user_id: user_id}
            remove_member(dat)
        }
    }

    function remove_member(data:any) {
        const {user_id} = data

        if (project_box.team.includes(user_id)) {
            const array = project_box.team;

            const updatedArray = array.filter(item => item !== user_id);

            const updatedUsers = team_members.filter((user:any) => user.user_id !== user_id);

            setTeam_members(updatedUsers)
            setProject_box({...project_box, team: updatedArray})

        }
    }

    function handle_edit_projet() {
        setModalFor('edit')
        
    }

    function handle_edit_cancel(){
        setModalFor('view')
        setCurrent_project_nav('project_details')
    }

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setUser_drop(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);


    return (
        <div className="w-full ">
            <div className=" w-full bg-white  rounded-[5px]  border border-slate-200  relative " >
                <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>

                {modalFor == 'delete' && 
                <div className="max-sm:w-[95vw] mx-auto w-[450px] ">
                    <div className="w-full p-[25px] border-b border-slate-200 flex flex-col items-center justify-center gap-5">
                        <div className="w-full flex flex-col items-center justify-center text-center gap-3 ">
                            <p className="text-md font-[500]">Are your sure you want to delete project with Id of</p>
                            <span className="w-full flex items-center justify-center gap-2">
                                <p className="text-md font-[600] ">{selectedItem.project_ind}</p> 
                                <p className="text-md font-[500]">and title</p> 
                                <p className="text-md font-[600] ">{selectedItem.project_title}</p> 
                            </span>
                            
                        </div>

                        <button className="text-sm w-[95px] flex items-center justify-center h-[45px] rounded-[3px] bg-red-600 hover:bg-red-700 text-white" onClick={handle_delete} disabled={loading}>
                            {loading ? (
                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            ) : 'Delete'}
                        </button>
                    </div>


                </div>}

                {(modalFor == 'create' || modalFor == 'edit') && <div className="max-sm:w-[95vw] mx-auto w-[450px] max-h-[92vh] sm:max-h-[92.5vh] overflow-y-auto">
                    <span className="w-full px-[25px] h-[50px]  border-b border-slate-200 flex items-center justify-between ">
                        {modalFor == 'create' ? <p className="text-md font-[500]  ">New Project</p> : <p className="text-md font-[500]  "> {selectedItem.project_ind}</p>  }
                        

                        {/* <span className="h-[15px] w-[15px] flex items-center justify-center cursor-pointer" onClick={handle_close_modal}><FaRegCircleXmark size={'100%'}  className='hover:text-red-600' /> </span> */}
                    </span>

                    <div className="w-full flex flex-col items-start justify-start gap-[30px] p-[25px]">
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-sm ">Project Title</p>
                            <input type="text" name='project_title' placeholder='Title' value={project_box.project_title} onChange={handle_change} className='input-type-1' />
                        </span>

                        <span className="w-full flex flex-col items-start justify-start gap-2"  ref={dropdownRef}>
                            <p className="text-sm ">Assign Project to</p>
                            <span className="w-full flex  items-centeer ">
                                <div className=" " style={{width: 'calc(100% - 95px)'}} > 
                                    <div className="w-full flex flex-col items-start justify-start relative ">
                                        <span className="h-[45px] w-full flex items-center justify-start rounded-l-[3px] border border-slate-400 overflow-x-auto px-2  gap-2  ">
                                            { team_members.length ? <>
                                                {
                                                    team_members.map((data:any, ind: number)=>{
                                                        return(
                                                            <span key={ind} className="flex items-center gap-2 bg-gray-200 rounded-[3px] px-2 py-1 text-xs  whitespace-nowrap"  >
                                                                {data.first_name} {data.last_name}
                                                                <button className="text-sm text-red-500 hover:text-red-700" onClick={()=> remove_member(data)}> <FaTimes size={12} /> </button>
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </> : '' }
                                        </span>

                                        {user_drop &&  <ul className="absolute z-10 mt-[53px] h-[245px] w-full bg-white border border-slate-200 rounded-[3px]  bg-white overflow-y-auto " >
                                            <div className="w-full h-full" >
                                                {app_users ?
                                                <>
                                                {/* when users is still being fetchined */}
                                                    { 
                                                        app_users.map((data: any, ind:number)=> {
                                                            const {user_id, last_name, first_name} = data
                                                            return(
                                                                    <li key={ind} className="px-[10px] h-[40px] flex items-center justify-between text-sm  hover:bg-blue-500 hover:text-white cursor-pointer" onClick={()=> select_team_member(data)}>
                                                                        {first_name} {last_name}
                                                    
                                                                        {project_box.team.includes(user_id) && <span className="h-[15px] w-[15px] text-blue-600 float-end "><LuCheck size={'100%'} /> </span>}
                                                                    </li>
                                                            )
                                                        })
                                                    }
                                                </>

                                                :
                                                
                                                <div className='h-full w-full flex items-center justify-center '>
                                                    <Loading />
                                                </div>}

                                            </div>
                                        </ul>}
                                    </div>
                                </div>

                                <button className="text-sm h-[45px] rounded-r-[3px] bg-blue-500 hover:bg-blue-600 text-white w-[95px] text-sm" onClick={()=> setUser_drop(!user_drop)} >{user_drop ? "Hide" : "Select"}</button>
                            </span>
                        </span>

                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-sm ">Cost </p>

                            <input type="text" name='cost' placeholder='00,000.00' value={project_box.cost == 0 ? '': Number(project_box.cost).toLocaleString()} onChange={handle_change} className='input-type-1' />
                        </span>


                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                <p className="text-sm ">Project Stage</p>
                                <span className="w-full h-[45px] "><Dropdownlg id='stage' placeholder={project_box.stage == 'todo' ? 'Todo' : project_box.stage } options={['Todo', 'Completed', 'In Progress']} onSelect={handleSelect} /> </span>
                            </span>

                            {/* <span className="w-full flex flex-col items-start justify-start gap-2">
                                <p className="text-sm ">Priority Level</p>
                                <span className="w-full h-[45px] "><Dropdownlg id='priority' placeholder={project_box.priority || 'Select Priority level'} options={['Low', 'Normal', 'High']} onSelect={handleSelect} /> </span>
                            </span> */}

                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-sm ">Add Asset</p>
                            <div className="w-full flex items-center justify-end">
                                <FileUpload id='assets' maxFiles={5} onFileChange={handle_file_change} initialFiles={project_box.assets} />
                            </div>
                        </span>

                    </div>

                    <div className="w-full flex items-center justify-end gap-5 p-[25px] pt-0 ">
                        <button className="text-sm w-[95px] bg-white text-sm rounded-[3px] hover:text-red-600 border border-white h-[45px] hover:border-red-600 " onClick={modalFor == 'edit' ?  handle_edit_cancel : handle_cancel_project } > Cancel </button>

                        {modalFor == 'create'?  <button className="text-sm w-[95px] flex items-center justify-center h-[45px] rounded-[3px] bg-blue-500 hover:bg-blue-600 text-white" onClick={handle_submit} disabled={loading}>
                            {loading ? (
                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            ) : 'Submit'}
                        </button> : <button className="text-sm w-[95px] flex items-center justify-center h-[45px] rounded-[3px] bg-amber-600 hover:bg-amber-700 text-white" onClick={handle_edit} disabled={loading}>
                            {loading ? (
                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            ) : 'Update'}
                        </button> }
                    </div>


                </div>}

                {(modalFor == 'create-task' || modalFor == 'edit-subproject') && <div className="sm:w-[450px] w-[400px]">
                    <span className="w-full px-[25px] h-[50px]  border-b border-slate-200 flex items-center justify-between ">
                        <p className="text-md font-[500]  ">New Task</p> 
                        
                    </span>

                    <div className="w-full flex flex-col items-start justify-start gap-[30px] p-[25px]">
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-sm ">Title</p>
                            <input type="text" name='title' placeholder='Title' value={tasks.title} onChange={handle_change} className='input-type-1' />
                        </span>

                        <span className="hidden w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-sm ">Due Date</p>
                            <input type="date" name='date' placeholder='' value={tasks.date} onChange={handle_change} className='input-type-1' />
                        </span>

                    </div>

                    <div className="mt-10 w-full flex items-center justify-end gap-5 p-[25px] pt-0 ">
                        <button className="text-sm w-[95px] bg-white text-sm rounded-[3px] hover:text-red-600 border border-white h-[45px] hover:border-red-600 " onClick={handle_edit_cancel} > Cancel </button>

                        <button className="text-sm w-[95px] flex items-center justify-center h-[45px] rounded-[3px] bg-blue-500 hover:bg-blue-600 text-white" onClick={handle_create_task} disabled={loading}>
                            {loading ? (
                            <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            ) : 'submit'}
                        </button>
                        
                    </div>


                </div>}

                {(modalFor == 'view') && 

                    <div className="w-[90vw] flex flex-col items-start gap-2 mx-auto">
                        <span className=" w-full px-[15px] h-[50px] flex items-center justify-between ">
                            <span className="flex items-center justify-start gap-5">
                                <p className="text-md font-[500] "> {selectedItem.project_ind}</p> 
                                <p className="text-md font-[500] ">{project_box.project_title}</p>
                            </span>

                            <button className="text-sm h-[35px] text-sm rounded-[35px] hover:text-white hover:bg-red-500 px-5  " onClick={()=> setShowModal(false)}  >Close</button>
                        </span>

                        <div className="w-full flex flex-col items-start justify-start gap-[15px] ">

                            {/* nav section */}
                            <div className="w-full flex items-center justify-start gap-2 px-[15px] bg-white">
                                <button className={ current_project_nav == 'project_details' ? `active-prj-nav-btn` : `prj-nav-btn`} onClick={()=> setCurrent_project_nav('project_details')}>
                                    Project Details
                                </button>
                                
                                <button className={ current_project_nav == 'activities' ? `active-prj-nav-btn` : `prj-nav-btn`} onClick={()=> setCurrent_project_nav('activities')}>
                                    Activities / Timeline
                                </button>
                                
                                <button className={ current_project_nav == 'payment-history' ? `active-prj-nav-btn` : `prj-nav-btn`} onClick={()=> setCurrent_project_nav('payment-history')}>
                                    Payment History
                                </button>
                                
                                <button className={ current_project_nav == 'edit-project' ? `active-prj-nav-btn` : `prj-nav-btn`} onClick={()=> {setCurrent_project_nav('edit-project'); handle_edit_projet()}}>
                                    Edit Project
                                </button>
                                
                                <button className={ current_project_nav == 'create-task' ? `active-prj-nav-btn` : `prj-nav-btn`} onClick={()=> {setCurrent_project_nav('create-task'); setModalFor('create-task')}}>
                                    Create Task
                                </button>
                            </div>

                            {current_project_nav == 'project_details' && 
                            <div className="w-full px-[15px]  h-[535px] mb-[15px] flex flex-wrap items-start justify-between bg-white  gap-[25px] overflow-y-auto ">
                                <div className="w-[430px] max-sm:w-full h-[530px] overflow-y-auto  rounded-[5px] border border-slate-200  p-[15px] ">
                                    <div className='w-full flex flex-col items-start justify-start gap-5 '>
                                        {/* first section Priority and stage */}
                                        <span className=" w-full flex items-center justify-between gap-10 ">

                                            <span className="flex items-center gap-[10px]">
                                                <span className={`h-[15px] w-[15px] ${selectedItem.priority == 'normal' ? 'bg-teal-700' : selectedItem.priority == 'low' ? 'bg-amber-600': selectedItem.priority == 'high' ? 'bg-red-600': ''} rounded-[17.5px] `} ></span>

                                                <p className="text-sm font-[500] ">{selectedItem.priority.toUpperCase().replace(/_/g, ' ')} PRIORITY</p>
                                            </span>

                                            <span className="flex items-center gap-[10px]">
                                                <span className={`h-[15px] w-[15px] ${selectedItem.stage == 'todo' ? 'bg-blue-500' : selectedItem.stage == 'in_progress' ? 'bg-amber-600': selectedItem.stage == 'completed' ? 'bg-teal-600': ''} rounded-[17.5px] `} ></span>

                                                <p className="text-sm font-[500] ">{selectedItem.stage.toUpperCase().replace(/_/g, ' ')} STAGE</p>
                                            </span>
                                        </span>

                                        {/* creation and update date stage */}

                                        <span className="w-full  flex flex-col items-start justify-start gap-5">
                                            <span className="w-full flex items-center justify-between gap-2 ">
                                                <p className="text-sm w-[150px]  ">Created On</p>
                                                <p className="text-sm  font-[500] ">{readable_date(Number(selectedItem.created_at)/1000)}</p>
                                            </span>
                                            <span className="w-full flex items-center justify-between gap-2 ">
                                                <p className="text-sm w-[150px]  ">Last Updated</p>
                                                <p className="text-sm font-[500] ">{moment(Number(selectedItem.updated_at)).calendar()}</p>
                                            </span>
                                        </span>

                                        <div className="w-full flex items-center justify-between flex-wrap gap-5">
                                            <span className="flex items-center gap-3 whitespace-nowrap">
                                                <p className="text-sm">Project Cost</p>
                                                <p className="text-sm font-[500]"># {Number(selectedItem.cost).toLocaleString()}</p>
                                            </span>
                                            <span className="flex items-center gap-3 whitespace-nowrap">
                                                <p className="text-sm">Total Amount Paid</p>
                                                <p className="text-sm font-[500] text-teal-700"># {selectedItem.total_amount_paid ? Number(selectedItem.total_amount_paid).toLocaleString(): '0'}</p>
                                            </span>
                                            <span className="flex items-center gap-3 whitespace-nowrap">
                                                <p className="text-sm">Amount Due</p>
                                                <p className="text-sm font-[500] text-red-600"># {selectedItem.amount_due ? Number(selectedItem.amount_due).toLocaleString() : '0'}</p>
                                            </span>
                                        </div>

                                        <span className=" w-full h-[50px] bg-slate-100 rounded-[2px] flex items-center justify-between px-10 gap-10">
                                            <span className="h-[40px] my-auto flex items-center justify-start gap-[15px]">
                                                <p className="text-md font-[500]">Assets:</p>
                                                <p className="text-md font-[500]">{selectedItem.assets.length}</p>
                                            </span>
                                            <span className="h-[40px] my-auto flex items-center justify-start gap-[15px]">
                                                <p className="text-md font-[500]">Tasks:</p>
                                                <p className="text-md font-[500]">{selectedItem.tasks.length}</p>
                                            </span>

                                        </span>

                                        {/* project teams */}
                                        <div className="w-full flex flex-col items-start justify-start">
                                            <p className="text-md  font-[500] h-[40px]">Project Team</p>
                                            <div className="w-full flex flex-col items-start justify-start gap-2">
                                                {selectedItem.team.map((data:any,ind:number)=>{
                                                    return(
                                                        <span className='w-full' key={ind}><UserInfo data={data.user} /></span>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-[430px] max-sm:w-full h-[530px] flex items-start justify-center  rounded-[5px] border border-slate-200  p-[15px] overflow-y-auto">
                                    {selectedItem.tasks.length ?
                                        <div className="w-full  flex flex-wrap items-start justify-between gap-3">
                                            {
                                                selectedItem.tasks.map((data:any, ind: number)=>{
                                                    const {title, is_completed, due_date, created_at, task_id} = data

                                                    return(
                                                        <span key={ind} className="min-w-[190px] min-h-[100px]  border border-slate-200 rounded-[3px] p-[10px] flex flex-col gap-3">
                                                            <span className="flex items-start justify-between gap-3">
                                                                <p className={`text-sm font-[500] whitespace-nowrap ${is_completed ? 'text-teal-500': 'text-amber-600'}`}> {is_completed ? "Completed":"Not Completed"} </p>

                                                                <TaskActionBtn data={data} />
                                                            </span>
                                                            <span className="flex items-start justify-start gap-3">
                                                                <p className="text-sm font-[500]"> {title} </p>
                                                            </span>


                                                            <span className="flex items-start justify-start gap-3">
                                                                <p className="text-[11px] font-[400]"> {formatted_time(Number(created_at))} </p>
                                                            </span>

                                                        </span>
                                                    )
                                                })
                                            }
                                        </div>
                                        :
                                        <div className="w-full h-full flex items-center justify-center">
                                            <p className="text-sm font-[500]">No Task Created Yet</p>
                                        </div>
                                    }
                                </div>

                                <div className="w-[430px] max-sm:w-full h-[530px] flex flex-wrap items-start justify-between gap-[10px] overflow-y-auto border border-slate-200 rounded-[5px] p-[15px]">
                                    {selectedItem.assets.length ? <>
                                        {selectedItem.assets.map((data:any, ind:number)=>{
                                            return(
                                                <div className="w-[177.5px]  h-[250px]" key={ind} >
                                                    <FileDisplay file={data}  />
                                                </div>
                                            )
                                        })}
                                    </>:
                                    <div className="w-full h-full flex items-center justify-center">
                                        <p className="text-sm font-[500]">No Assets Uploaded Yet</p>
                                    </div>
                                    }

                                </div>

                            </div>}

                            {
                                ( current_project_nav == 'activities') && 
                                
                                <div className="mx-auto h-[535px] max-sm:h-[70vh] max-lg:h-[600px]  mb-[15px] flex flex-wrap items-start justify-between bg-white  gap-[25px] overflow-y-auto">
                                    <div className="w-[775px] max-lg:w-[450px] max-xl:w-[500px] max-md:w-full h-[530px] max-lg:h-[375px] flex flex-col items-start gap-[25px] ">
                                        <p className="text-md font-[500] ">Activities</p>

                                        <div className="w-full flex flex-col  overflow-y-auto ">
                                            <div className="w-full h-full flex flex-col items-start justify-start">
                                                {/* each activity */}
                                                {selectedItem.activities.map((data:any,ind:number)=>{

                                                    const {description, date, created_by, activity_type} = data
                                                    const formattedTime = moment(Number(date)).fromNow();
                                                    const user = {first_name: created_by.first_name, last_name: created_by.last_name, avatar: created_by.avatar}
                                                    return(
                                                        <div key={ind} className="md:w-[80%] activity-cont-1 "> 
                                                            <span className="w-[60px] h-full flex flex-col items-center justify-start gap-[5px] activity-col-1 ">
                                                                    <Avatar user={user} isActive={true} toggleActive={true} />  
                                                                <span className="w-[1px] bg-slate-400 activity-line-1" style={{height: 'calc(100% - 50px)'}} ></span>
                                                            </span>
                                                            <div className="w-full flex flex-1 flex-col items-start justify-start gap-[5px] ">
                                                                <p className="text-sm font-[600] ">{created_by.first_name} {created_by.last_name}</p>
                                                                <p className="text-sm font-[400] ">{activity_type} {formattedTime}</p>
                                                                <p className="text-sm font-[500] ">{description}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full  lg:w-[400px] xl:w-[450px]  h-[530px] max-lg:h-auto flex flex-col items-start gap-[25px]  ">
                                        <p className="text-md font-[500] ">Add Activity</p>

                                        <div className="w-full flex flex-wrap items-start justify-start gap-5">
                                            <span className="h-[] whitespace-nowrap flex items-center justify-start gap-[15px]">
                                                <input type="radio" name="activity_type" value="started" checked={activity.activity_type === "started"} onChange={handle_activity_change} id="started" className="h-[17px] w-[17px] cursor-pointer"
                                                />
                                                <label htmlFor="started" className="text-sm cursor-pointer">Started</label>
                                            </span>
                                            <span className="h-[] whitespace-nowrap flex items-center justify-start gap-[15px]"> <input type="radio" name="activity_type" value="in_progress" checked={activity.activity_type === "in_progress"} onChange={handle_activity_change} id="in_progress" className="h-[17px] w-[17px] cursor-pointer" />
                                                <label htmlFor="in_progress" className="text-sm cursor-pointer">In Progress</label>
                                            </span>
                                            <span className="h-[] whitespace-nowrap flex items-center justify-start gap-[15px]">
                                                <input
                                                type="radio" name="activity_type" value="completed" checked={activity.activity_type === "completed"} onChange={handle_activity_change}
                                                id="completed"
                                                className="h-[17px] w-[17px] cursor-pointer"
                                                />
                                                <label htmlFor="completed" className="text-sm cursor-pointer">Completed</label>
                                            </span>
                                            <span className="h-[] whitespace-nowrap flex items-center justify-start gap-[15px]">
                                                <input
                                                type="radio" name="activity_type" value="commented" checked={activity.activity_type === "commented"} onChange={handle_activity_change}
                                                id="commented"
                                                className="h-[17px] w-[17px] cursor-pointer"
                                                />
                                                <label htmlFor="commented" className="text-sm cursor-pointer">Commented</label>
                                            </span>
                                            <span className="h-[] whitespace-nowrap flex items-center justify-start gap-[15px]">
                                                <input
                                                type="radio" name="activity_type" value="bug" checked={activity.activity_type === "bug"} onChange={handle_activity_change}
                                                id="bug"
                                                className="h-[17px] w-[17px] cursor-pointer"
                                                />
                                                <label htmlFor="bug" className="text-sm cursor-pointer">Bug</label>
                                            </span>
                                            <span className="h-[] whitespace-nowrap flex items-center justify-start gap-[15px]">
                                                <input
                                                type="radio" name="activity_type" value="assigned" checked={activity.activity_type === "assigned"} onChange={handle_activity_change}
                                                id="assigned"
                                                className="h-[17px] w-[17px] cursor-pointer"
                                                />
                                                <label htmlFor="assigned" className="text-sm cursor-pointer">Assigned</label>
                                            </span>
                                            </div>


                                        <div className="w-full h-full max-lg:h-[150px]   flex flex-col items-start justify-between gap-[25px]">
                                            <textarea name="description" id="description" value={activity.description} onChange={handle_activity_change} placeholder='Type...' className=' text-area-input-1' style={{height: 'calc(100% - 70px)'}}></textarea>

                                            <span className="w-full flex items-center justify-end gap-[15px] ">

                                                <button className="text-sm h-[45px] px-5 rounded-[2.5px] hover:border hover:border-red-600 hover:text-red-600 " onClick={()=> setShowModal(false)}>Cancel </button>

                                                <button className="text-sm w-[95px] flex items-center justify-center h-[45px] rounded-[3px] bg-blue-500 hover:bg-blue-600 text-white" onClick={handle_create_activity} disabled={loading}>
                                                    {loading ? (
                                                    <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                    ) : 'Submit'}
                                                </button> 
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                current_project_nav == 'payment-history' &&
                                <div className=" w-[100%] h-[535px] max-sm:h-[70vh] max-lg:h-[600px]  mb-[15px] flex flex-wrap items-start justify-between bg-white  gap-[25px]  overflow-y-auto">
                                    <Payment_page />
                                </div>
                            }


                        </div>

                    </div>
                }
            </div>
        </div>
    )
}

export default Project_modal

