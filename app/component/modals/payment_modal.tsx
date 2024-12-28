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

type PaymentBox = {
    payer_name: string;
    amount: number;
    task_id: string;
    payment_receipt: any[];
};

interface TaskData {
    task_title: string; task_id: string; task_ind: string; cost: number;
}
const Payment_modal = () => {
    const router = useRouter()
    const [payment_ind, setPayment_ind] = useState('')
    const { modalFor, setModalFor, setShowModal, selectedItem, selected_payment, setSelectedItem, setModalSource, showModal, task, setTrigger_notification,trigger_notification, current_task_nav, setCurrent_task_nav} = useChat()
    const [alert, setAlert] = useState({message: '', type: ''})
    const [payment_box, setPayment_box] = useState<PaymentBox>({amount: 0, payer_name: '', task_id:'', payment_receipt: []})
    const [sub_task, setSub_task] = useState({title:'', tag: '', due_date:'2024-12-10', task_id: '', })
    const [task_list, setTask_list] = useState<TaskData | null>(null)
    const [loading, setLoading] = useState(false)
    const [task_drop, setTask_drop] = useState(false)

    

    useEffect(() => {

        console.log(task)
        if (modalFor != 'create') {
            const {payment_id, payer_name, task_id, payment_receipt, amount, task } = selected_payment

            const id = payment_id.split('-')

            const new_id =  `PY${id[0]}`

            setPayment_ind(new_id)

            setTask_list(task)

            console.log('onee ', selected_payment)
            
            setTimeout(() => {
                setPayment_box({ ...payment_box, payer_name: payer_name, task_id: task_id, payment_receipt, amount: Number(amount) })
            }, 100);
        }
    }, [])

    function handle_change(e:any){
        const name = e.target.name;
        const value = e.target.value;
        if(name == 'amount'){
            setPayment_box({...payment_box, [name]: Number(value.replace(/,/g,''))})
            
            setSub_task({...sub_task, [name]: Number(value.replace(/,/g,''))})
        }else{
            setPayment_box({...payment_box, [name]: value})
            
            setSub_task({...sub_task, [name]: value})
        }

    }

    function handle_cancel_payment() {
        setPayment_box({...payment_box, task_id:'', amount: 0, payment_receipt: [], payer_name: ''})
        // now navigate to payment page on project modal
        setModalFor('view')
        setModalSource('task-modal')
        setCurrent_task_nav('payment-history')
    }

    
    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }


    async function handle_submit(e: any) {
        e.preventDefault();        
        console.log(payment_box)

        if (!payment_box.amount || !payment_box.payer_name || !payment_box.task_id) {
            if (!payment_box.payer_name){showAlert('Please enter the payer\'s name', 'warning')}
            if (!payment_box.task_id){showAlert('Please select a task! ', 'warning')}

            if ( !payment_box.amount && !payment_box.payer_name && !payment_box.task_id){
                showAlert('Please provide all task required information', 'warning')
            }

            return;
        } else {
            setLoading(true); 
            try {

                
                const response = await post_auth_request('app/add-payment', payment_box)                

                if (response.status == 200 || response.status == 201){


                    setPayment_box({ payer_name: '', task_id: '', payment_receipt: [], amount: 0})
                    showAlert(response.data.msg, "success")
                    setLoading(false)
                    setTimeout(() => {
                        setShowModal(false)
                    }, 1000);
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

        if (!payment_box.amount || !payment_box.payer_name || !payment_box.task_id) {
            if (!payment_box.payer_name){showAlert('Please enter the payer\'s name', 'warning')}
            if (!payment_box.task_id.length){showAlert('Please select a task! ', 'warning')}

            if ( !payment_box.amount && !payment_box.payer_name && !payment_box.task_id){
                showAlert('Please provide all task required information', 'warning')
            }

            return;
        } else {
            setLoading(true); 
            try {
                
                const response = await patch_auth_request(`app/edit-payment/${selected_payment.payment_id}`, payment_box)                

                if (response.status == 200 || response.status == 201){

                    showAlert(response.data.msg, "success")
                    setLoading(false)
                    setTimeout(() => {
                        setShowModal(false)
                    }, 1500);
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

    function handle_file_change(files:any[], id: string) {
        setPayment_box({...payment_box, payment_receipt: files})
    }

    useEffect(() => {
        select_task_list(selectedItem)
    }, [])

    function select_task_list(data:any) {
        const {task_id, task_title, task_ind, amount} = data
        setPayment_box({...payment_box, task_id})
        setTask_list(data)

        setTask_drop(!task_drop)
    }


    return (
        <div className="w-full ">
            <div className=" w-full bg-white  rounded-[5px]  border border-slate-200  overflow-y-auto relative " >
                <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>


                {(modalFor == 'create' || modalFor == 'edit') && <div className="max-sm:w-[95vw] mx-auto w-[450px] max-h-[92vh] sm:max-h-[92.5vh] overflow-y-auto">
                    <span className="w-full px-[25px] h-[50px]  border-b border-slate-200 flex items-center justify-between ">
                        {modalFor == 'create' ? <p className="text-md font-[500] text-slate-700 ">New Payment</p> : <p className="text-lg font-[600] text-slate-700 "> {payment_ind}</p>  }
                        

                        {/* <span className="h-[17.5px] w-[17.5px] flex items-center justify-center cursor-pointer" onClick={handle_close_modal}><FaRegCircleXmark size={'100%'}  className='hover:text-red-600' /> </span> */}
                    </span>

                    <div className="w-full flex flex-col items-start justify-start gap-[30px] p-[25px]">
                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-sm ">Selected Project </p>
                            <span className="w-full flex  items-centeer ">
                                <div className=" w-full"  > 
                                    <div className="w-full flex flex-col items-start justify-start relative ">
                                        <span className="h-[45px] w-full flex items-center justify-start rounded-l-[3px] border border-slate-400 overflow-x-auto px-2  gap-2  ">
                                            { task_list ? <>
                                                    <span className="flex items-center gap-3 rounded-[3px] px-2 py-1 text-xs text-slate-700 whitespace-nowrap font-[500]"  >
                                                        {task_list?.task_ind} {task_list?.task_title}  ({Number(task_list?.cost).toLocaleString()})
                                                        
                                                    </span>
                                                
                                            </> : '' }
                                        </span>

                                    </div>
                                </div>

                            </span>
                        </span>

                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-sm ">Payment Amount </p>

                            <input type="text" name='amount' placeholder='00,000.00' value={payment_box.amount == 0 ? '': Number(payment_box.amount).toLocaleString()} onChange={handle_change} className='input-type-1' />
                        </span>

                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-sm ">Payer Name </p>

                            <input type="text" name='payer_name' placeholder='John Doe' value={payment_box?.payer_name} onChange={handle_change} className='input-type-1' />
                        </span>

                        <span className="w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-sm ">Upload Receipt</p>
                            <div className="w-full flex items-center justify-end">
                                <FileUpload id='payment_receipt' maxFiles={5} onFileChange={handle_file_change} initialFiles={payment_box.payment_receipt} />
                            </div>
                        </span>

                    </div>

                    <div className="w-full flex items-center justify-end gap-5 p-[25px] pt-0 ">
                        <button className="text-sm w-[95px] bg-white text-sm rounded-[3px] hover:text-red-600 border border-white h-[45px] hover:border-red-600 " onClick={handle_cancel_payment} > Cancel </button>

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

            </div>
        </div>
    )
}

export default Payment_modal

