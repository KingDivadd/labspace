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
import Link from 'next/link'

const Payment_page = () => {
    const router = useRouter()
    const [page_number, setPage_number] = useState(1)
    const [list_number, setList_number] = useState(15)
    const [payment_box, setPayment_box] = useState<Props | null>(null);
    const [filtered_payment_box, setFiltered_payment_box] = useState<Props | null>(null);
    const [filters, setFilters] = useState({filter_input: '', disposition: ''})
    const {loggedInUser, modalFor, setModalFor, selectedItem, setSelectedItem, setSelected_payment, showModal, setShowModal, setModalSource, modalSource, setProject} = useChat()
    const [alert, setAlert] = useState({message: '', type: ''})
    const [loading, setLoading] = useState(true)
    const [isActive, setIsActive] = useState(true);
    const toggleActive = () => setIsActive(!isActive);
    const [drop_list_no, setDrop_list_no] = useState(false)
    const [filter_payment, setFilter_payment] = useState('all')



    interface Props {
        forEach?(arg0: (data: any, ind: number) => void): unknown;
        filter?(arg0: (payment: any) => any): unknown;
        map?(arg0: (data: any) => void): unknown;
        total_number_of_pages?: number; // Now optional and can be undefined
        total_number_of_payments?: number; // Now optional can be undefined
        payments: any[];
        project_list?: any[];

    } 

    useEffect(() => {
        const x_id_key = localStorage.getItem('x-id-key')
        if (x_id_key) {
            handle_fetch_payments(list_number, page_number)
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
    

    async function handle_fetch_payments(list_num: number, page_num: number) {

            try {
                const response = await get_auth_request(`app/all-paginated-payments/${selectedItem.project_id}/${list_num}/${page_num}`)  

                if (response.status == 200 || response.status == 201){

                    const payments = response.data
                    setLoading(false);
                    setPayment_box(payments)
                    setFiltered_payment_box(payments)
                    setProject(payments?.project_list)

                                        
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


    async function app_payments_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = payment_box?.total_number_of_pages

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

        handle_fetch_payments(list_number, new_page_number)
        setPage_number(new_page_number);
        
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = payment_box?.total_number_of_pages || 1;
        const max_displayed_pages = 3;

        if (max_page_number <= max_displayed_pages) {
        for (let i = 1; i <= max_page_number; i++) {
            pages.push(
            <p
                key={i}
                className={`text-md font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => app_payments_action(i)}
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
                onClick={() => app_payments_action(i)}
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
    
        if (payment_box && payment_box.payments) {
            if (value.trim() !== '') {
                const filtered_payments:any = payment_box.payments.filter((data: any) => {

                    const id = data.payment_id
                    const split_id = id.split('-')
                    const payment_ind = `PY${split_id[0]}`

                    const payment_id = payment_ind?.toLowerCase() || '';
                    const project_id = data.project.project_ind?.toLowerCase() || ''
                    const added_by_fn = data.added_by?.first_name.toLowerCase() || ''
                    const added_by_ln = data.added_by?.last_name.toLowerCase() || ''
                    const project_title = data.project.project_title?.toLowerCase() || ''
                    const amount = String(data.amount) || ''                    
                    return (
                        payment_id.includes(value) ||
                        project_id.includes(value) ||
                        project_title.includes(value) ||
                        added_by_fn.includes(value) ||
                        added_by_ln.includes(value) ||
                        amount.includes(value) 
                    );
                });
                
                setFiltered_payment_box({...filtered_payment_box, payments: filtered_payments })
    
            } else {
                setFiltered_payment_box(payment_box); // Reset to the original list
            }
        }
    }


    function handle_add_payment() {
        setShowModal(!showModal)
        setModalFor('create')
        setModalSource('payment-modal')
        
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
        if (selected === 'All payments'){
            if (filtered_payment_box?.payments && payment_box?.payments) {
                
                setFiltered_payment_box({...filtered_payment_box, payments:payment_box?.payments})
            }


        }else if(selected === 'Assigned payments' ){
            if (filtered_payment_box?.payments) {
        
                const payments = filtered_payment_box?.payments;
        
                // Filter payments assigned to the logged-in user
                const new_payments = payments.filter((payment: any) => {
                    return payment.team.some((member: any) => {
                        return member.user.user_id === loggedInUser.user_id;
                    });
                });
            
                setFiltered_payment_box({...filtered_payment_box, payments:new_payments})
            }

        }else if (selected === 'Project Created'){

            if(filtered_payment_box?.payments){
        
                    const payments = filtered_payment_box?.payments
        
                    const new_payments =  payments.filter((payment:any)=>{
                        return payment.payment_creator_id == loggedInUser.user_id
                    })
        
                    setFiltered_payment_box({...filtered_payment_box, payments:new_payments})            
            }

        }
    }

    function handle_new_payment() {
        setModalFor('create')
        setModalSource('payment')
    }

    function handle_edit(data:any) {
        setModalFor('edit')
        setModalSource('payment')
        setSelected_payment(data)
    }


    return (
        <div className='relative w-[100%]  flex items-start justify-center p-[10px] pb-[15px] '   >
            <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>

            <div className="w-full flex flex-col justify-start items-center gap-5 ">

                {/* section four recent payments table */}
                <div className="w-full flex flex-col items-start justify-start shadow-lg border border-slate-200 rounded-[3px]  bg-white">
                    
                    <div className="w-full flex flex-wrap items-center justify-between p-[15px] gap-5 pb-0 ">

                        <span className="flex items-center max-sm:w-full max-sm:justify-between gap-5">
                            <p className="text-sm max-md:hidden">Showing</p>
                            <div className="w-[90px] relative flex flex-col items-start justify-start z-10">
                                <span className="h-[40px] w-full border border-slate-400 rounded-[3px] flex items-center justify-between px-[15px] " onClick={()=> setDrop_list_no(!drop_list_no)} > 
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

                        </span>

                        <div className="max-sm:w-full flex items-center max-sm:justify-between justify-end gap-5">

                            <span className="w-[150px] lg:w-[300px] ">
                                <input type="text" placeholder='Search...' onChange={handle_filter} className='input-type-2 ' />
                            </span>

                            <button className="px-5 rounded-[40px] bg-blue-500 hover:bg-blue-600 text-white text-sm h-[40px]" onClick={handle_new_payment} >
                                Add Payment
                            </button>
                        </div>

                    </div>

                    <div className="w-full overflow-x-auto">
                        <div className="w-full min-w-[1024px] p-[15px] flex flex-col items-start justify-start mx-auto ">
                            <span className="w-full h-[45px] flex items-center justify-between bg-blue-500 text-white rounded-[3px]">
                                <p className="text-sm w-[10%] px-[15px] ">Payment Id</p>
                                <p className="text-sm w-[8%] px-[15px] ">Project Id</p>
                                <p className="text-sm w-[13%] px-[15px] ">Project Title</p>
                                <p className="text-sm w-[13%] px-[15px] ">Payer Name</p>
                                <p className="text-sm w-[8%] px-[15px] ">Amount</p>
                                <p className="text-sm w-[10%] px-[15px] ">Added By</p>
                                <p className="text-sm w-[15%] px-[15px] ">Payment File</p>
                                <p className="text-sm w-[15%] px-[15px] ">Date</p>
                                <p className="text-sm w-[8%] px-[15px] ">Action</p>
                            </span>

                            {loading ? 
                            
                            <div className="w-full h-[340px] flex items-center justify-center  ">
                                <Loading />
                            </div>
                            :
                            <div className="w-full h-[340px] flex flex-col items-start justify-start overflow-y-auto">
                                <div className="w-full h-full flex flex-col justify-start">
                                    
                                    {filtered_payment_box?.payments.length ? 
                                    <>
                                    {filtered_payment_box?.payments.map((data: any, ind: number)=>{
                                        const {payment_id, project, payer_name, amount, added_by, stage, payment_receipt, created_at } = data    
                                        
                                        const id = payment_id.split('-')

                                        const formatted_payment_id = `PY${id[0]}`

                                        const formated_stage = stage == 'todo' ? 'Todo' : stage == 'in_progress' ? 'In Progress' : stage == 'completed' ? 'Completed': ''

                                        return(
                                            <span key={ind} className=" table-body-row-1  " >
                                                <p className="text-sm font-[500] w-[10%] px-[15px] text-slate-600 ">{formatted_payment_id}</p>
                                                <p className="text-sm font-[500] w-[8%] px-[15px] text-slate-600 ">{project.project_ind}</p>
                                                <p className="text-sm font-[500] w-[13%] px-[15px] text-slate-600 ">{project.project_title}</p>
                                                <p className="text-sm font-[500] w-[13%] px-[15px] text-slate-600 ">{payer_name}</p>
                                                <p className="text-sm font-[500] w-[8%] px-[15px] text-slate-600 ">{Number(amount).toLocaleString()}</p>
                                                <p className="text-sm font-[500] w-[10%] px-[15px] text-slate-600 ">{added_by.first_name} {added_by.last_name}</p>
                                                <p className="text-sm font-[500] w-[15%] px-[15px] text-slate-600 hover:text-blue-600 hover:underline">
                                                    {payment_receipt.length && <Link href={payment_receipt[0].url} >{payment_receipt[0].name}</Link>}
                                                </p>
                                                <p className="text-sm font-[500] w-[15%] px-[15px] text-slate-600 ">{formatted_time(Number(created_at))}</p>
                                                <span className="px-[15px] w-[8%] flex items-center ">
                                                    <button className="h-[27.5px] rounded-[2.5px] bg-amber-600 hover:bg-amber-700 text-white px-5 text-sm " onClick={()=> handle_edit(data)}>Edit</button>
                                                </span>

                                                
                                            </span>
                                        )
                                    })}
                                    </>
                                    : 
                                    <div className="w-full flex items-center justify-center h-full  ">
                                        <p className="text-sm font-[500] ">No payment has been made yet.</p>
                                    </div> }
                                </div>
                            </div>}

                        </div>
                    </div>

                    <span className="w-full h-[45px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-gray-300 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-md cursor-pointer" onClick={() => app_payments_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className="text-md cursor-pointer" onClick={() => app_payments_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-md"> 
                                {
                                    list_number != 100000000000000 ? 
                                    <> Showing 1-{ list_number} of {(filtered_payment_box && filtered_payment_box.payments.length)  || 0} </>:
                                    <> Showing All of {(filtered_payment_box && filtered_payment_box.payments.length) || 0}</>
                                }
                            </p>
                        </span>
                    </span>
                </div> 


            </div>


        </div>
    )
}

export default Payment_page