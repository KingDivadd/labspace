'use client'
import React, {useState, useEffect} from 'react'
import Modal from '../component/modals/modal'
import { useChat } from '../context/ChatContext'
import { useRouter } from 'next/navigation'
import { get_auth_request } from '../api'
import Alert, {AssetCont, AvatarUserInfo, Dropdown, SmallAvatar, formatted_time} from '../component/helper'
import moment from 'moment'
import Loading from '../component/loading'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'

const Task_page = () => {
    const router = useRouter()
    const [page_number, setPage_number] = useState(1)
    const [list_number, setList_number] = useState(15)
    const [task_box, setLead_box] = useState<Props | null>(null);
    const [filtered_task_box, setFiltered_task_box] = useState<Props | null>(null);
    const [filters, setFilters] = useState({filter_input: '', disposition: ''})
    const {loggedInUser, modalFor, setModalFor, selectedItem, setSelectedItem, showModal, setShowModal, setModalSource, modalSource, setApp_users} = useChat()
    const [alert, setAlert] = useState({message: '', type: ''})
    const [loading, setLoading] = useState(true)
    const [isActive, setIsActive] = useState(true);
    const toggleActive = () => setIsActive(!isActive);
    const [drop_list_no, setDrop_list_no] = useState(false)
    const [filter_task, setFilter_task] = useState('all')



    interface Props {
        forEach?(arg0: (data: any, ind: number) => void): unknown;
        filter?(arg0: (task: any) => any): unknown;
        map?(arg0: (data: any) => void): unknown;
        total_number_of_pages?: number; // Now optional and can be undefined
        total_number_of_tasks?: number; // Now optional can be undefined
        no_of_assigned_task?: number;
        tasks: any[];
        users: any
    } 

    useEffect(() => {
        const x_id_key = localStorage.getItem('x-id-key')
        if (x_id_key) {
            handle_fetch_tasks(list_number, page_number)
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
    

    async function handle_fetch_tasks(list_num: number, page_num: number) {

            try {
                const response = await get_auth_request(`app/all-paginated-tasks/${list_num}/${page_num}`)  

                if (response.status == 200 || response.status == 201){

                    const tasks = response.data
                    setLoading(false);
                    setLead_box(tasks)
                    setFiltered_task_box(tasks)
                    setApp_users(tasks?.users)

                    console.log('all tasks \n',tasks)
                                        
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


    async function app_tasks_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = task_box?.total_number_of_pages

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

        handle_fetch_tasks(list_number, new_page_number)
        setPage_number(new_page_number);
        
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = task_box?.total_number_of_pages || 1;
        const max_displayed_pages = 3;

        if (max_page_number <= max_displayed_pages) {
        for (let i = 1; i <= max_page_number; i++) {
            pages.push(
            <p
                key={i}
                className={`text-md font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-600 text-white' : ''
                }`}
                onClick={() => app_tasks_action(i)}
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
                onClick={() => app_tasks_action(i)}
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
    
        if (task_box && task_box.tasks) {
            if (value.trim() !== '') {
                const filtered_tasks:any = task_box.tasks.filter((data: any) => {

                    const task_ind = data.task_ind?.toLowerCase() || '';
                    const task_title = data.task_title?.toLowerCase() || ''
                    const priority = data.priority?.toLowerCase() || ''
                    const stage = data.stage?.toLowerCase() || ''
                    
                    return (
                        task_ind.includes(value) ||
                        task_title.includes(value) ||
                        priority.includes(value) ||
                        stage.includes(value) 

                    );
                });
                
                console.log(filtered_tasks)

                // setFiltered_task_box({...filtered_task_box, tasks: filtered_tasks})
    
            } else {
                setFiltered_task_box(task_box); // Reset to the original list
            }
        }
    }


    function handle_add_task() {
        setShowModal(!showModal)
        setModalFor('create')
        setModalSource('task-modal')
        
    }

    function handle_edit(data:any) {
        setShowModal(!showModal)
        setModalFor('edit')
        setModalSource('task-modal')
        setSelectedItem(data)
    }

    function handle_view(data:any) {
        setShowModal(!showModal)
        setModalFor('view')
        setModalSource('task-modal')
        setSelectedItem(data)
    }

    function handle_delete(data:any) {
        setShowModal(!showModal)
        setModalFor('delete')
        setModalSource('task-modal')
        setSelectedItem(data)
    }

    function handle_list_no(data:any) {
        if (data == 'all') {
            setList_number(100000000000000)
        }else{
            setList_number(data)
        }
        setDrop_list_no(!drop_list_no)
    }

    function handle_selected(selected: string, id?:string){
        console.log(id, selected)
        if (selected === 'All Tasks'){
            if (filtered_task_box?.tasks && task_box?.tasks) {
                
                setFiltered_task_box({...filtered_task_box, tasks:task_box?.tasks})
            }


        }else if(selected === 'Assigned Tasks' ){
            if (filtered_task_box?.tasks) {
                console.log('Logging filtered_task_box: ', filtered_task_box);
        
                const tasks = filtered_task_box?.tasks;
        
                // Filter tasks assigned to the logged-in user
                const new_tasks = tasks.filter((task: any) => {
                    return task.team.some((member: any) => {
                        console.log('Logged-in user:', loggedInUser.user_id, '\n', 'User ID:', member.user.user_id);
                        return member.user.user_id === loggedInUser.user_id;
                    });
                });
            
                setFiltered_task_box({...filtered_task_box, tasks:new_tasks})
            }

        }else if (selected === 'Task Created'){

            if(filtered_task_box?.tasks){
        
                    const tasks = filtered_task_box?.tasks
        
                    const new_tasks =  tasks.filter((task:any)=>{
                        return task.task_creator_id == loggedInUser.user_id
                    })
        
                    setFiltered_task_box({...filtered_task_box, tasks:new_tasks})            
            }

        }
    }


    return (
        <div className='w-full flex items-start justify-center  px-[20px] md:px-[55px] lg:px-[75px] py-5 relative '  >
            <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>

            <div className="w-full flex flex-col justify-start items-center gap-5">

                {/* section showing metrics */}

                {loggedInUser.is_admin && <div className="w-full flex items-center justify-end">

                    {/* <div className="w-full flex  items-center justify-start max-sm:justify-between gap-5">

                        <span className="flex items-center jusitify-center gap-[10px] sm:gap-5 h-[45px] shadow-md border border-gray-100 w-[120px] ">

                            <p className="text-sm md:text-md text-blue-600 text-center">All Tasks</p>
                            <p className="text-xl md:text-2xl font-[600] text-blue-600"> {loading ? '--': <>{task_box?.total_number_of_tasks}</> } </p>

                        </span>
                        <span className="flex items-center jusitify-center gap-[10px] sm:gap-5">

                            <p className="text-sm md:text-md text-teal-700 text-center">Assigned Tasks</p>
                            <p className="text-xl md:text-2xl font-[600] text-teal-700"> {loading ? '--': <>{task_box?.no_of_assigned_task}</> } </p>

                        </span>

                    </div> */}

                    {loggedInUser.is_admin && <button className="text-sm max-sm:hidden px-5 whitespace-nowrap h-[45px] rounded-[3px] text-white bg-blue-600 hover:bg-blue-700" onClick={handle_add_task} >Add Task</button>}
                </div>}


                {/* section four recent transaction table */}
                <div className="w-full flex flex-col items-start justify-start shadow-lg rounded-[3px] border border-slate-100">
                    <span className="h-[50px] w-full flex items-center justify-start px-[15px] border-b border-slate-200 ">
                        <p className="text-md font-[600] ">Tasks</p>
                    </span>
                    
                    <div className="w-full flex flex-wrap items-center justify-between p-[15px] gap-5 pb-0 ">

                        <span className="flex items-center max-sm:w-full max-sm:justify-between gap-5">
                            <p className="text-sm max-md:hidden">Showing</p>
                            <div className="w-[100px] relative flex flex-col items-start justify-start z-10">
                                <span className="h-[45px] w-full border border-slate-400 rounded-[3px] flex items-center justify-between px-[15px] " onClick={()=> setDrop_list_no(!drop_list_no)} > 
                                    {list_number == 100000000000000 ? "All": list_number }
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

                            <button className="text-sm sm:hidden px-5 whitespace-nowrap h-[45px] rounded-[3px] text-white bg-blue-600 hover:bg-blue-700" onClick={handle_add_task} >Add Task</button>
                        </span>

                        <div className="max-sm:w-full flex items-center max-sm:justify-between justify-end gap-5">
                            {loggedInUser.is_admin && <span className=" w-[150px] lg:w-[300px] h-[45px] ">
                                <Dropdown options={['All Tasks', 'Assigned Tasks', 'Task Created']} id='task' placeholder='All Tasks' onSelect={handle_selected} />
                            </span>}

                            <span className="w-[150px] lg:w-[300px] ">
                                <input type="text" placeholder='search' onChange={handle_filter} className='input-type-1 ' />
                            </span>
                        </div>

                    </div>

                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[1350px] p-[15px] flex flex-col items-start justify-start mx-auto ">
                            <span className="w-full h-[50px] flex items-center justify-between bg-blue-600 text-white rounded-[3px]">
                                <p className="text-sm w-[15%] px-[15px] ">Last Updated</p>
                                <p className="text-sm w-[8%] px-[15px] ">Task Id</p>
                                <p className="text-sm w-[14.5%] px-[15px] ">Task Title</p>
                                <p className="text-sm w-[10%] px-[15px] ">Project Cost</p>
                                <p className="text-sm w-[10%] px-[15px] ">Priority</p>
                                <p className="text-sm w-[15%] px-[15px] ">Assigned To</p>
                                <p className="text-sm w-[10%] px-[15px] ">Stage</p>
                                <p className="text-sm w-[10%] px-[15px] ">Assets</p>
                                <p className="text-sm w-[15%] px-[15px] ">Action</p>
                            </span>

                            {loading ? 
                            
                            <div className="w-full h-[500px] flex items-center justify-center  ">
                                <Loading />
                            </div>
                            :
                            <div className="w-full h-[500px] flex flex-col items-start justify-start overflow-y-auto">
                                <div className="w-full h-full flex flex-col justify-start">
                                    
                                    {filtered_task_box?.tasks.length ? 
                                    <>
                                    {filtered_task_box?.tasks.map((data: any, ind: number)=>{
                                        const {task_id, updated_at, task_title, task_ind, priority, stage, team, activities, assets, sub_tasks,cost } = data                                        

                                        const formated_stage = stage == 'todo' ? 'Todo' : stage == 'in_progress' ? 'In Progress' : stage == 'completed' ? 'Completed': ''

                                        const info = {activities: activities.length, assets: assets.length, sub_task: sub_tasks.length}

                                        return(
                                            <span key={ind} className=" table-body-row-1  " >
                                                <p className="text-sm font-[500] w-[15%] px-[15px] text-slate-600 ">{formatted_time(Number(updated_at))}</p>
                                                <p className="text-sm font-[500] w-[8%] px-[15px] cursor-pointer hover:text-blue-600 hover:underline " onClick={()=> handle_view(data)}>{task_ind}</p>
                                                <p className="text-sm font-[500] w-[14.5%] overflow truncate text-ellipsis  px-[15px] text-slate-600 ">{task_title}</p>
                                                <p className="text-sm font-[500] w-[10%] overflow truncate text-ellipsis  px-[15px] text-slate-600 "> {Number(cost).toLocaleString()}</p>
                                                <p className={`text-sm font-[500] w-[10%] px-[15px]`}>{priority} </p>

                                                <span className="w-[15%] px-[15px] flex items-center justify-start overflow-visible ">
                                                    {team.slice(0, 5).map((data: any, indd: number) => {
                                                        const { user_id, avatar, first_name, last_name, email, title, is_active, is_admin } = data.user;
                                                        return (
                                                        <span key={indd} className="avatar-info">
                                                            <AvatarUserInfo key={indd} data={data.user} />
                                                        </span>
                                                        );
                                                    })}
                                                </span>

                                                <span className={`w-[10%] px-[15px] flex items-center justify-start gap-[5px] text-sm `}> {formated_stage} </span>

                                                <span className="w-[10%] px-[15px] flex items-center justify-start gap-[5px] "> <AssetCont activities={info.activities} assets={info.assets} sub_tasks={info.sub_task}  /> </span>

                                                <span className=" w-[15%] px-[15px] flex items-center justify-start gap-[10px]" >
                                                    <button className="text-sm px-[15px] h-[30px] text-sm rounded-[2.5px] text-white bg-sky-500 hover:bg-sky-600" onClick={()=> handle_view(data)} >View</button>
                                                    {/* <button className="text-sm px-[17.5px] h-[30px] text-sm rounded-[2.5px] text-white bg-amber-600 hover:bg-amber-700" onClick={()=> handle_edit(data)} >edit</button> */}
                                                    {loggedInUser.is_admin && <button className="text-sm px-[15px] h-[30px] text-sm rounded-[2.5px] text-white bg-red-600 hover:bg-red-700" onClick={()=> handle_delete(data)}>Delete</button>}
                                                </span>
                                                
                                            </span>
                                        )
                                    })}
                                    </>
                                    : 
                                    <div className="w-full flex items-center justify-center h-full  ">
                                        {loggedInUser.is_admin ? <p className="text-md font-[500] ">Click on Add Task to begin creating Task</p>:
                                        <p className="text-md font-[500] ">No Task has been assigned to you yet.</p>}
                                    </div> }
                                </div>
                            </div>}

                        </div>
                    </div>

                    <span className="w-full h-[50px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-gray-300 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-md cursor-pointer" onClick={() => app_tasks_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className="text-md cursor-pointer" onClick={() => app_tasks_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-md"> 
                                {
                                    list_number != 100000000000000 ? 
                                    <> Showing 1-{ list_number} of {(filtered_task_box && filtered_task_box.tasks.length)  || 0} </>:
                                    <> Showing All of {(filtered_task_box && filtered_task_box.tasks.length) || 0}</>
                                }
                            </p>
                        </span>
                    </span>
                </div>


            </div>

            {showModal && <Modal showModal={showModal} setShowModal={setShowModal} modalFor={modalFor} setModalFor={setModalFor} selectedItem={selectedItem} setSelectedItem={setSelectedItem} modalSource={modalSource} setModalSource={setModalSource} />}
        </div>
    )
}

export default Task_page