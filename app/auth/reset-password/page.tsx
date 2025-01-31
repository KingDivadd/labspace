'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {useChat} from '../../context/ChatContext'
import Alert from '../../component/helper'
import { post_auth_request } from '@/app/api'
import { IoMdEyeOff } from 'react-icons/io'
import { IoEye } from 'react-icons/io5'


const ResetPassword = () => {
    const router = useRouter()
    const [auth, setAuth] = useState({confirm_password: '', password: ''})
    const {header_nav, setHeader_nav, } = useChat()
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({message: '', type: ''})
    const [inputError, setInputError] = useState({confirm_password: false, password: false})
    const [showPassword, setShowPassword] = useState({password: false, confirm_password: false})


    const handle_change = (e:any)=>{
        const name = e.target.name
        const value = e.target.value
        setAuth({...auth, [name]:value})

    }

    function showAlert(message: string, type: string){
        setAlert({message: message, type: type})
            setTimeout(() => {
                setAlert({message: '', type: ''})
            }, 3000);
    }

    const handle_signup = ()=>{
        setHeader_nav('pricing')
        router.push('/')
    }

    useEffect(() => {

        if (auth.confirm_password) { 
            setInputError({...inputError, confirm_password: auth.confirm_password == ''} ) 
            return;
        }
        if (auth.password) { 
            setInputError({...inputError, password: auth.password == ''} ) 
            return;
        }
        
    }, [auth])


    async function handle_submit(e: any) {
        e.preventDefault();

        if ( !auth.confirm_password || !auth.password) {
            if (!auth.password){showAlert('Please enter password', 'warning'); }
            if (!auth.confirm_password){showAlert('Please confirm password', 'warning'); }
            if (!auth.password && !auth.confirm_password){ showAlert('Please fill all fields ', 'warning')}
            
            setInputError({
                ...inputError,
                password: auth.password === "",
                confirm_password: auth.confirm_password === "",
            });
            return;
        }else if (auth.password != auth.confirm_password){
            showAlert('Passwords do not match', "error")
            return;
        } 
        else {
            setLoading(true); 

            try {
                
                const response = await post_auth_request('app/reset-password', auth)                

                if (response.status == 200 || response.status == 201){
                    
                    showAlert(response.data.msg, "success")
                    setAuth({confirm_password: '', password: ''})
                    setLoading(false)
                    sessionStorage.removeItem('email')
                    router.push('/user/porter')
                }
                else if (response.response.status == 401){
                    showAlert('something went wrong, restart process', 'error')
                    router.push('/auth/recover-password')
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


    return (
        <div className="w-full bg-white h-screen flex flex-col items-center justify-start sm:justify-center gap-10 " >
            <span className="px-[20px] flex items-center justify-end absolute top-[15px] w-full z-20 h-[50px]  ">

                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>


            <div className=" max-sm:p-[15px] mx-auto flex flex-wrap items-center justify-center gap-[50px] lg:gap-20  "> 
                <p className=' sm:w-[400px] lg:mb-10 max-sm:text-[35px] max-lg:text-[40px] lg:text-[55px] max-lg:font-[700] lg:font-[800] text-center text-blue-500 cursor-pointer' onClick={()=>router.push('/')}>
                    Labspace
                </p>

                <form action='' className="w-full sm:w-[400px] flex flex-col items-start justify-start rounded-[5px] p-[20px] bg-white min-h-[200px] py-[30px] gap-[35px] shadow-lg border border-slate-200 ">

                    <span className="w-full flex flex-col items-center justify-start gap-[5px]"> 
                        <p className="text-[27.5px] font-[700] text-blue-500"> Reset Password</p>
                        <p className="text-sm font-[500] text-slate-700 text-centeer">Create a new password</p>
                    </span>
                    
                    <span className="w-full relative flex flex-col items-start justify-start gap-2 ">
                        <span className="w-full relative  ">
                            <input type={showPassword.password ? "text" : "password"} name='password' placeholder='Password' className={inputError.password ? 'input-error-1' : 'input-type-1'} value={auth.password} onChange={handle_change} />

                            <span className='absolute w-[40px] flex items-center justify-center top-[12.5px] right-0 text-blue-500' onClick={()=> setShowPassword({...showPassword, password: !showPassword.password})} >
                                {showPassword ? <IoEye size={20} className='cursor-pointer' /> : <IoMdEyeOff size={20} className='cursor-pointer' />}
                            </span>
                        </span>
                    </span>
                    
                    <span className="w-full relative flex flex-col items-start justify-start gap-2 ">
                        <span className="w-full relative  ">
                            <input type={showPassword.confirm_password ? "text" : "password"} name='confirm_password' placeholder='Confirm Password' className={inputError.password ? 'input-error-1' : 'input-type-1'} value={auth.confirm_password} onChange={handle_change} />

                            <span className='absolute w-[40px] flex items-center justify-center top-[12.5px] right-0 text-blue-500' onClick={()=> setShowPassword({...showPassword, confirm_password: !showPassword.confirm_password})} >
                                {showPassword ? <IoEye size={20} className='cursor-pointer' /> : <IoMdEyeOff size={20} className='cursor-pointer' />}
                            </span>
                        </span>
                    </span>

                    <button className="w-full flex items-center justify-center h-[45px] rounded-[3px] bg-blue-500 hover:bg-blue-600 text-white" onClick={handle_submit} disabled={loading}>
                        {loading ? (
                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        ) : 'submit'}
                    </button>

                    <span className="w-full flex items-center justify-center gap-[5px]">
                        <p className="text-sm font-[500] text-slate-700  " >Remembered password</p>
                        <p className="text-sm font-[500] cursor-pointer text-blue-500 hover:underline " onClick={()=> router.push('/auth/login')} >Login</p>
                    </span>

                </form>
            </div>



        </div>
    )
}

export default ResetPassword