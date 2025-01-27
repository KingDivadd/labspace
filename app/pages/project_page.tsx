'use client'
import React, {useState, useEffect} from 'react'
import Modal from '../component/modals/modal'
import { useChat } from '../context/ChatContext'
import { useRouter } from 'next/navigation'
import { get_auth_request } from '../api'
import Alert, {AssetCont, AvatarUserInfo, Dropdown, ProjectActionBtn, formatted_time} from '../component/helper'
import moment from 'moment'
import Loading from '../component/loading'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'

const Project_page = () => {
    const router = useRouter()
    const [page_number, setPage_number] = useState(1)
    const [list_number, setList_number] = useState(15)
    const [project_box, setTask_box] = useState<Props | null>(null);
    const [filtered_project_box, setFiltered_project_box] = useState<Props | null>(null);
    const [filters, setFilters] = useState({filter_input: '', disposition: ''})
    const {loggedInUser, modalFor, setModalFor, selectedItem, setSelectedItem, showModal, setShowModal, setModalSource, modalSource, app_users, setApp_users, } = useChat()
    const [alert, setAlert] = useState({message: '', type: ''})
    const [loading, setLoading] = useState(true)
    const [isActive, setIsActive] = useState(true);
    const toggleActive = () => setIsActive(!isActive);
    const [drop_list_no, setDrop_list_no] = useState(false)


    interface Props {
        forEach?(arg0: (data: any, ind: number) => void): unknown;
        filter?(arg0: (project: any) => any): unknown;
        map?(arg0: (data: any) => void): unknown;
        total_number_of_pages?: number; // Now optional and can be undefined
        total_number_of_projects?: number; // Now optional can be undefined
        no_of_assigned_project?: number;
        projects: any[];
        users: any
    } 

    useEffect(() => {
        const x_id_key = localStorage.getItem('x-id-key')
        if (x_id_key) {
            handle_fetch_projects(list_number, page_number)
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
    

    async function handle_fetch_projects(list_num: number, page_num: number) {

            try {
                const response = await get_auth_request(`app/all-paginated-projects/${list_num}/${page_num}`)  

                if (response.status == 200 || response.status == 201){

                    const projects = response.data
                    setLoading(false);
                    setTask_box(projects)
                    setFiltered_project_box(projects)
                    setApp_users(projects?.users)

                                        
                }else if(response.response.status == 503){
                    showAlert(response.response.data.err, "error")
                }else if(response.response.status == 401){
                    router.push('/auth/login')
                }
                else{
                    showAlert(response.response.data.err, "error")
                }
            } catch (err:any) {
                console.error('Network or unexpected error:', err);
                showAlert('Network error, check internet connection.', 'error');
            } 
        
    }


    async function app_projects_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = project_box?.total_number_of_pages

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

        handle_fetch_projects(list_number, new_page_number)
        setPage_number(new_page_number);
        
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = project_box?.total_number_of_pages || 1;
        const max_displayed_pages = 3;

        if (max_page_number <= max_displayed_pages) {
        for (let i = 1; i <= max_page_number; i++) {
            pages.push(
            <p
                key={i}
                className={`text-md font-light h-[27px] w-[27.5px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-600 text-white' : ''
                }`}
                onClick={() => app_projects_action(i)}
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
                className={`text-sm font-light h-[27px] w-[27.5px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-700 text-white' : ''
                }`}
                onClick={() => app_projects_action(i)}
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
    
        if (project_box && project_box.projects) {
            if (value.trim() !== '') {
                const filtered_projects:any = project_box.projects.filter((data: any) => {

                    const project_ind = data.project_ind?.toLowerCase() || '';
                    const project_title = data.project_title?.toLowerCase() || ''
                    const gapless_project_title = data.project_title?.replace(/ /g, '').toLowerCase() || ''
                    const priority = data.priority?.toLowerCase() || ''
                    const stage = data.stage?.toLowerCase() || ''
                    
                    return (
                        project_ind.includes(value) ||
                        project_title.includes(value) ||
                        gapless_project_title.includes(value) ||
                        priority.includes(value) ||
                        stage.includes(value) 

                    );
                });
                

                setFiltered_project_box({...filtered_project_box, users:app_users, projects: filtered_projects})
    
            } else {
                setFiltered_project_box(project_box); // Reset to the original list
            }
        }
    }


    function handle_add_project() {
        setShowModal(!showModal)
        setModalFor('create')
        setModalSource('project-modal')
        
    }

    function handle_edit(data:any) {
        setShowModal(!showModal)
        setModalFor('edit')
        setModalSource('project-modal')
        setSelectedItem(data)
    }

    function handle_view(data:any) {
        setShowModal(!showModal)
        setModalFor('view')
        setModalSource('project-modal')
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
        if (selected === 'All Projects'){
            if (filtered_project_box?.projects && project_box?.projects) {
                
                setFiltered_project_box({...filtered_project_box, projects:project_box?.projects})
            }


        }else if(selected === 'Assigned Projects' ){
            if (filtered_project_box?.projects) {
        
                const projects = filtered_project_box?.projects;
        
                // Filter projects assigned to the logged-in user
                const new_projects = projects.filter((project: any) => {
                    return project.team.some((member: any) => {
                        return member.user.user_id === loggedInUser.user_id;
                    });
                });
            
                setFiltered_project_box({...filtered_project_box, projects:new_projects})
            }

        }else if (selected === 'Project Created'){

            if(filtered_project_box?.projects){
        
                    const projects = filtered_project_box?.projects
        
                    const new_projects =  projects.filter((project:any)=>{
                        return project.project_creator_id == loggedInUser.user_id
                    })
        
                    setFiltered_project_box({...filtered_project_box, projects:new_projects})            
            }

        }
    }


    return (
        <div className='relative w-full  flex items-start justify-center p-[10px] 'style={{height: 'calc(100vh - 60px)'}}  >
            <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>

            <div className="w-full flex flex-col justify-start items-center gap-5">

                {/* section four recent transaction table */}
                <div className="w-full bg-white flex flex-col items-start justify-start shadow-lg rounded-[3px] border border-slate-100">
                    <span className=" w-full flex items-center justify-between px-[15px] py-[10px]  ">
                        <p className="text-md font-[500] ">Projects</p>

                        <span className="h-[40px]"></span>

                        {loggedInUser.is_admin && <button className="h-[40px] px-5 bg-blue-500 hover:bg-blue-600 text-white rounded-[45px] text-sm " onClick={handle_add_project}>Add Project</button>}
                    </span>
                    
                    <div className="w-full flex flex-wrap items-center justify-between px-[15px] gap-5 pb-0 ">

                        <span className="flex items-center max-sm:w-full max-sm:justify-between gap-5">
                            <p className="text-sm max-md:hidden">Showing</p>
                            <div className="w-[85px] relative flex flex-col items-start justify-start z-10">
                                <span className="h-[40px] w-full border border-slate-400 rounded-[3px] flex items-center justify-between px-[15px] text-sm " onClick={()=> setDrop_list_no(!drop_list_no)} > 
                                    {list_number == 100000000000000 ? "All": list_number }
                                    <span className="h-[20px] w-[20px] flex items-center justify-center">
                                        {drop_list_no ? <FaCaretUp size={'100%'} /> : <FaCaretDown size={'100%'} /> }
                                    </span>
                                </span>

                                {drop_list_no && <div className="w-full absolute top-[50px] left-0 flex flex-col items-start bg-white shadow-md rounded-[3px]">
                                    <span className="rounded-t-[3px] h-[40px] w-full text-sm hover:bg-blue-500 hover:text-white flex items-center justify-center" onClick={()=> handle_list_no(15)}>15</span>
                                    <span className="rounded-t-[3px] h-[40px] w-full text-sm hover:bg-blue-500 hover:text-white flex items-center justify-center" onClick={()=> handle_list_no(25)}>25</span>
                                    <span className=" h-[40px] w-full text-sm hover:bg-blue-500 hover:text-white flex items-center justify-center" onClick={()=> handle_list_no(50)}>50</span>
                                    <span className=" h-[40px] w-full text-sm hover:bg-blue-500 hover:text-white flex items-center justify-center" onClick={()=> handle_list_no(100)}>100</span>
                                    <span className="rounded-b-[3px] h-[40px] w-full text-sm hover:bg-blue-500 hover:text-white flex items-center justify-center" onClick={()=> handle_list_no('all')}>All</span>
                                </div>}
                            </div>

                            <button className="text-sm sm:hidden px-5 whitespace-nowrap h-[45px] rounded-[3px] text-white bg-blue-600 hover:bg-blue-700" onClick={handle_add_project} >Add Task</button>
                        </span>

                        <div className="max-sm:w-full flex items-center max-sm:justify-between justify-end gap-5">
                            {loggedInUser.is_admin && <span className=" w-[150px] lg:w-[300px] h-[40px] ">
                                <Dropdown options={['All Projects', 'Assigned Project', 'Project Created']} id='project' placeholder='All Project' onSelect={handle_selected} />
                            </span>}

                            <span className="w-[150px] lg:w-[300px] ">
                                <input type="text" placeholder='search' onChange={handle_filter} className='input-type-2 ' />
                            </span>
                        </div>

                    </div>

                    <div className="w-full overflow-x-auto ">
                        <div className="min-w-[1024px] px-[15px] py-[10px] flex flex-col items-start justify-start mx-auto ">
                            <span className="w-full h-[45px] flex items-center justify-between bg-blue-500 text-white rounded-[3px]">
                                <p className="text-sm w-[18%] px-[15px] ">Last Updated</p>
                                <p className="text-sm w-[14.5%] px-[15px] ">Project Title</p>
                                <p className="text-sm w-[10%] px-[15px] ">Project Cost</p>
                                <p className="text-sm w-[15%] px-[15px] ">Assigned To</p>
                                <p className="text-sm w-[10%] px-[15px] ">Stage</p>
                                <p className="text-sm w-[10%] px-[15px] ">Assets</p>
                                <p className="text-sm w-[15%] px-[15px] "></p>
                            </span>

                            {loading ? 
                            
                            <div className="w-full flex items-center justify-center  " style={{ height: 'calc(100vh - 295px)'}}>
                                <Loading />
                            </div>
                            :
                            <div className="w-full flex flex-col items-start justify-start overflow-y-auto" style={{ height: 'calc(100vh - 295px)'}}>
                                <div className="w-full h-full flex flex-col justify-start">
                                    
                                    {filtered_project_box?.projects.length ? 
                                    <>
                                    {filtered_project_box?.projects.map((data: any, ind: number)=>{
                                        const {project_id, updated_at, project_title, project_ind, priority, stage, team, activities, assets, tasks, cost } = data                                        

                                        const formated_stage = stage == 'todo' ? 'Todo' : stage == 'in_progress' ? 'In Progress' : stage == 'completed' ? 'Completed': ''

                                        const info = {activities: activities.length, assets: assets.length, task: tasks.length}

                                        return(
                                            <span key={ind} className=" table-body-row-1  " >
                                                <p className="text-sm font-[500] w-[18%] px-[15px] text-slate-600 ">{formatted_time(Number(updated_at))}</p>
                                                <p className="text-sm font-[500] w-[14.5%] overflow truncate text-ellipsis  px-[15px] text-slate-600 ">{project_title}</p>
                                                <p className="text-sm font-[500] w-[10%] overflow truncate text-ellipsis  px-[15px] text-slate-600 "> {Number(cost).toLocaleString()}</p>

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

                                                <span className="w-[10%] px-[15px] flex items-center justify-start gap-[5px] "> <AssetCont activities={info.activities} assets={info.assets} tasks={info.task}  /> </span>

                                                <span className=" w-[15%] px-[15px] flex items-center justify-start gap-[10px]" >
                                                    <ProjectActionBtn data={data} />
                                                </span>
                                                
                                            </span>
                                        )
                                    })}
                                    </>
                                    : 
                                    <div className="w-full flex items-center justify-center h-full  ">
                                        {loggedInUser.is_admin ? <p className="text-md font-[500] ">Click on Add Project to begin creating Project</p>:
                                        <p className="text-md font-[500] ">No Project has been assigned to you yet.</p>}
                                    </div> }
                                </div>
                            </div>}

                        </div>
                    </div>

                    <span className="w-full h-[45px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-slate-200 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-md cursor-pointer" onClick={() => app_projects_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className="text-md cursor-pointer" onClick={() => app_projects_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-md"> 
                                {
                                    list_number != 100000000000000 ? 
                                    <> Showing 1-{ list_number} of {(filtered_project_box && filtered_project_box.projects.length)  || 0} </>:
                                    <> Showing All of {(filtered_project_box && filtered_project_box.projects.length) || 0}</>
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

export default Project_page