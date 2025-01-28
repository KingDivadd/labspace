'use client'
import React, {useState, useEffect} from 'react'
import Modal from '../component/modals/modal'
import { useChat } from '../context/ChatContext'
import { useRouter } from 'next/navigation'
import { get_auth_request } from '../api'
import Alert, {SmallAvatar, TeamActionBtn, formatted_time, readable_date} from '../component/helper'
import moment from 'moment'
import Loading from '../component/loading'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6'

const Teams_page = () => {
    const router = useRouter()
    const [page_number, setPage_number] = useState(1)
    const [list_number, setList_number] = useState(15)
    const [user_box, setLead_box] = useState<Props | null>(null);
    const [filtered_user_box, setFiltered_user_box] = useState<Props | null>(null);
    const [filters, setFilters] = useState({filter_input: '', disposition: ''})
    const {modalFor, setModalFor, selectedItem, setSelectedItem, showModal, setShowModal, setModalSource, modalSource} = useChat()
    const [alert, setAlert] = useState({message: '', type: ''})
    const [loading, setLoading] = useState(true)
    const [isActive, setIsActive] = useState(true);
    const toggleActive = () => setIsActive(!isActive);
    const [drop_list_no, setDrop_list_no] = useState(false)



    interface Props {
        forEach?(arg0: (data: any, ind: number) => void): unknown;
        filter?(arg0: (user: any) => any): unknown;
        map?(arg0: (data: any) => void): unknown;
        total_number_of_pages?: number; // Now optional and can be undefined
        total_number_of_users?: number; // Now optional can be undefined
        users: any;
    } 

    useEffect(() => {
        const x_id_key = localStorage.getItem('x-id-key')
        if (x_id_key) {
            handle_fetch_users(list_number, page_number)
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

    async function handle_fetch_users(list_num: number, page_num: number) {

            try {
                
                const response = await get_auth_request(`app/all-paginated-users/${list_num}/${page_num}`)  


                if (response.status == 200 || response.status == 201){

                    const users = response.data


                    setLead_box(users)
                    setFiltered_user_box(users)
                    setLoading(false)

                    
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
                // showAlert('Network error, check internet connection.', 'error');
            } 
        
    }


    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = user_box?.total_number_of_pages

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
        
        handle_fetch_users(list_number, new_page_number)
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = user_box?.total_number_of_pages || 1;
        const max_displayed_pages = 3;

        if (max_page_number <= max_displayed_pages) {
        for (let i = 1; i <= max_page_number; i++) {
            pages.push(
            <p
                key={i}
                className={`text-md font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-600 text-white' : ''
                }`}
                onClick={() => app_users_action(i)}
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
                onClick={() => app_users_action(i)}
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
    
        if (user_box && user_box.users) {
            if (value.trim() !== '') {
                const filtered_users = user_box.users.filter((data: any) => {

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
                
    
                setFiltered_user_box({...filtered_user_box, users:filtered_users});
            } else {
                setFiltered_user_box(user_box); // Reset to the original list
            }
        }
    }


    function handle_new_user() {
        setShowModal(!showModal)
        setModalFor('create')
        setModalSource('user-modal')
        
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

    function handle_list_no(data:any) {
        if (data == 'all') {
            setList_number(0)
        }else{
            setList_number(data)
        }
        setDrop_list_no(!drop_list_no)
    }

    return (
        <div className='relative w-full  flex items-start justify-center p-[10px] 'style={{height: 'calc(100vh - 60px)'}}  >
            <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>

            <div className="w-full flex flex-col justify-start items-center gap-5">


                {/* section user table */}
                <div className=" bg-white w-full flex flex-col items-start justify-start shadow-lg  rounded-[3px] border border-slate-100">
                    <span className=" w-full flex items-center justify-between px-[10px] sm:px-[15px] py-[10px]  ">
                        <p className="text-md font-[500] ">Team Members</p>

                        <button className="max-xl:h-[35px] h-[40px] px-5 bg-blue-500 hover:bg-blue-600 text-white rounded-[45px] text-sm " onClick={handle_new_user}>Add User</button>
                    </span>
                    
                    <div className="w-full flex items-center justify-between px-[10px] sm:px-[15px] pb-0 ">

                        <span className="flex items-center gap-5">
                            <p className="text-sm max-sm:hidden">Showing</p>
                            <div className="w-[85px] relative flex flex-col items-start justify-start z-10">
                                <span className="max-xl:h-[35px] h-[40px] w-full border border-slate-400 rounded-[3px] flex items-center justify-between px-[10px] sm:px-[15px] text-sm" onClick={()=> setDrop_list_no(!drop_list_no)} > 
                                    {list_number == 0 ? "All": list_number }
                                    <span className="h-[20px] w-[20px] flex items-center justify-center">
                                        {drop_list_no ? <FaCaretUp size={'100%'} /> : <FaCaretDown size={'100%'} /> }
                                    </span>
                                </span>

                                {drop_list_no && <div className="w-full absolute top-[50px] left-0 flex flex-col items-start bg-white shadow-md rounded-[3px]">
                                    <span className="rounded-t-[3px] max-xl:h-[35px] h-[40px] w-full text-sm hover:bg-blue-600 hover:text-white flex items-center justify-center" onClick={()=> handle_list_no(15)}>15</span>
                                    <span className="rounded-t-[3px] max-xl:h-[35px] h-[40px] w-full text-sm hover:bg-blue-600 hover:text-white flex items-center justify-center" onClick={()=> handle_list_no(25)}>25</span>
                                    <span className=" max-xl:h-[35px] h-[40px] w-full text-sm hover:bg-blue-600 hover:text-white flex items-center justify-center" onClick={()=> handle_list_no(50)}>50</span>
                                    <span className=" max-xl:h-[35px] h-[40px] w-full text-sm hover:bg-blue-600 hover:text-white flex items-center justify-center" onClick={()=> handle_list_no(100)}>100</span>
                                    <span className="rounded-b-[3px] max-xl:h-[35px] h-[40px] w-full text-sm hover:bg-blue-600 hover:text-white flex items-center justify-center" onClick={()=> handle_list_no('all')}>All</span>
                                </div>}
                            </div>
                        </span>

                        <span className="max-xs:w-[150px] w-[250px] ">
                            <input type="text" placeholder='search' onChange={handle_filter} className='input-type-2 ' />
                        </span>

                    </div>

                    <div className="table-cont overflow-x-auto">

                        <div className="min-w-[1200px] px-[10px] sm:px-[15px] py-[10px] flex flex-col items-start justify-start mx-auto ">
                            <span className="w-full max-xl:h-[40px] h-[45px] flex items-center justify-between rounded-[3px] bg-blue-500 text-white">
                                <p className="text-sm w-[15%] px-[10px] sm:px-[15px]  ">Last Updated</p>
                                <p className="text-sm w-[18.5%] px-[10px] sm:px-[15px]  ">Full Name</p>
                                <p className="text-sm w-[22.5%] px-[10px] sm:px-[15px]  ">Email</p>
                                <p className="text-sm w-[19%] px-[10px] sm:px-[15px]  ">Title</p>
                                <p className="text-sm w-[10%] px-[10px] sm:px-[15px]  ">Status</p>
                                <p className="text-sm w-[15%] px-[10px] sm:px-[15px] "></p>
                            </span>

                            {loading ? 
                            
                            <div className="w-full flex items-center justify-center" style={{ height: 'calc(100vh - 295px)'}}>
                                <Loading />
                            </div>
                            :
                            <div className="w-full flex flex-col items-start justify-start overflow-y-auto" style={{ height: 'calc(100vh - 285px)'}}>
                                <div className="w-full h-full flex flex-col justify-start">
                                    {filtered_user_box?.users.map((data: any, ind: number)=>{
                                        const {user_id, first_name, last_name, email, is_admin, title, role, created_at, updated_at,is_active } = data
                                        return(
                                            <span key={ind} className=" table-body-row-1  " >
                                                {/* <p className="text-sm font-[500] w-[15%] px-[10px] sm:px-[15px] ">{readable_date(Number(updated_at) / 1000)}</p> */}
                                                <p className="text-sm font-[500] w-[15%] px-[10px] sm:px-[15px] text-slate-600 ">{formatted_time(Number(updated_at))}</p>
                                                <div className="text-sm font-[500] w-[18.5%] px-[10px] sm:px-[15px] flex items-center justify-start gap-[20px] text-slate-600">
                                                    <SmallAvatar user={data} isActive={is_active} toggleActive={toggleActive} />
                                                    {first_name} {last_name}
                                                </div>
                                                <p className="text-sm font-[500] w-[22.5%] px-[10px] sm:px-[15px] flex-wrap text-start text-slate-600">{email}</p>
                                                <p className="text-sm font-[500] w-[19%] px-[10px] sm:px-[15px] text-slate-600 ">{title}</p>
                                                <span className=" w-[10%] px-[10px] sm:px-[15px] flex items-center justify-start text-slate-600 " >
                                                    {is_active ? <p className="text-sm text-teal-600 font-[500]  ">Active</p> : <p className="text-sm text-red-600 font-[500]  ">Inactive</p>}
                                                </span>
                                                <span className=" w-[15%] px-[10px] sm:px-[15px] flex items-center justify-start gap-[15px]" >
                                                    <TeamActionBtn data={data} />
                                                </span>
                                                
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>}

                        </div>
                    </div>

                    <span className="w-full h-[45px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-gray-300 px-[10px] sm:px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-md cursor-pointer" onClick={() => app_users_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className="text-md cursor-pointer" onClick={() => app_users_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-md">Showing 1-{list_number == 0 ? 'All' : list_number} of {(filtered_user_box && filtered_user_box.users.length) || 0}</p>
                        </span>
                    </span>
                </div>


            </div>

            {showModal && <Modal showModal={showModal} setShowModal={setShowModal} modalFor={modalFor} setModalFor={setModalFor} selectedItem={selectedItem} setSelectedItem={setSelectedItem} modalSource={modalSource} setModalSource={setModalSource} />}
        </div>
    )
}

export default Teams_page