'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {useChat} from '../../context/ChatContext'
import Alert from '../../component/helper'
import { post_auth_request, post_request } from '@/app/api'
import { IoMdEyeOff } from 'react-icons/io'
import { IoEye } from 'react-icons/io5'
import { SiTruenas } from 'react-icons/si'


const Login = () => {
    const router = useRouter()
    const [auth, setAuth] = useState({email: '', password: '', remember_me: false})
    const {header_nav, setHeader_nav, } = useChat()
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({message: '', type: ''})
    const [inputError, setInputError] = useState({email: false, password: false})
    const [showPassword, setShowPassword] = useState(false)
    const {loggedInUser, setLoggedInUser} = useChat()
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        const x_id_key = localStorage.getItem('x-id-key')
        if (x_id_key) {
            handle_persist_login()
        }
    }, [])

    async function handle_persist_login( ) {

            try {
                
                const response = await post_auth_request('app/persist-login', auth)            
                

                if (response.status == 200 || response.status == 201){

                    const user_data = response.data.user_data

                    const {user_id, first_name, last_name, email, avatar, is_admin, is_active, role, title} = user_data

                    setLoggedInUser({...loggedInUser, user_id, first_name, last_name, email, avatar, is_admin, is_active, role, title})

                    
                    showAlert(response.data.msg, "success")

                    setTimeout(() => {
                        router.push('/user/porter')
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


    useEffect(() => {
        if(submitted){
            setInputError({
                ...inputError,
                email: auth.email == '',
                password: auth.password  == ''
            })  
        }

        
    }, [auth])


    async function handle_login(e: any) {
        e.preventDefault();     
        setSubmitted(true)   

        if (!auth.email || !auth.password) {
            if (!auth.email){ showAlert('Please provide email address', 'warning');  }
            if (!auth.password){showAlert('Please enter password', 'warning'); }
            if (!auth.email && !auth.password) {showAlert('Please enter email and password ', 'warning')}
            
            setInputError({
                ...inputError,
                email: auth.email === "",
                password: auth.password === "",
            });
            return;
        } else {
            setLoading(true); 
            try {
                
                const response = await post_request('app/login', auth)                

                if (response.status == 200 || response.status == 201){

                    localStorage.setItem('x-id-key' ,response.headers.get('x-id-key'));
                    sessionStorage.setItem('role', response.data.user_data.user_role)
                    
                    showAlert(response.data.msg, "success")
                    setAuth({...auth, email: '', password: ''})
                    setLoading(false)
                    setSubmitted(false)

                    setTimeout(() => {
                        router.push('/user/porter')
                    }, 1500);
                }
                else{
                    showAlert(response.response.data.err, "error")
                    setLoading(false)
                    setSubmitted(false)
                }
            } catch (err:any) {
                console.error('Network or unexpected error:', err);
                setSubmitted(false)
                showAlert('An unexpected error occurred. Please try again later.', 'error');
            } 
        }
    }


    return (
        <div className="w-full bg-white h-screen flex flex-col items-center justify-start sm:justify-center gap-10 " >
            <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>


            <div className=" max-sm:p-[15px] mx-auto flex flex-wrap items-center justify-center gap-[50px] lg:gap-20  "> 
                <p className=' sm:w-[400px] lg:mb-10 max-sm:text-[35px] max-lg:text-[40px] lg:text-[55px] max-lg:font-[700] lg:font-[800] text-center text-blue-600 cursor-pointer' onClick={()=> router.push('/')}>
                    Labpspace
                </p>

                <form action='' className="w-full sm:w-[400px] flex flex-col items-start justify-start rounded-[5px] p-[20px] bg-white min-h-[200px] py-[30px] gap-[35px] shadow-lg border border-slate-200 ">

                    <span className="w-full flex flex-col items-center justify-start gap-[5px]"> 
                        <p className="text-[27.5px] font-[700] text-blue-600"> Welcome Back!</p>
                        <p className="text-sm font-[500] text-slate-700 text-centeer">Keep all your credentials safe</p>
                    </span>
                    
                    <input type="email" name='email' onChange={handle_change} value={auth.email} placeholder='Email' className={inputError.email ? 'input-error-1' : 'input-type-1'} />
                    
                    <span className="w-full relative flex flex-col items-start justify-start gap-2 ">
                        <span className="w-full relative  ">
                            <input type={showPassword ? "text" : "password"} name='password' placeholder='Password' className={inputError.password ? 'input-error-1' : 'input-type-1'} value={auth.password} onChange={handle_change} />

                            <span className='absolute w-[40px] flex items-center justify-center top-[12.5px] right-0 text-blue-600' onClick={()=> setShowPassword(!showPassword)} >
                                {showPassword ? <IoEye size={20} className='cursor-pointer' /> : <IoMdEyeOff size={20} className='cursor-pointer' />}
                            </span>
                        </span>
                    </span>

                    <span className="w-full flex items-center justify-start gap-[10px] ">
                        <input type="checkbox" name="remember_me" id="remember_me" onChange={(e) => setAuth({...auth, remember_me: e.target.checked})} />
                        <label htmlFor="remember_me" className="text-sm  font-[500] text-slate-700 cursor-pointer " >Remember me</label>
                    </span>

                    <button className="w-full flex items-center justify-center h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white" onClick={handle_login} disabled={loading}>
                        {loading ? (
                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        ) : 'login'}
                    </button>

                    <span className="w-full flex items-center justify-end">
                        <p className="text-sm font-[500] text-slate-700 cursor-pointer hover:text-blue-600 hover:underline " onClick={()=> router.push('/auth/recover-password')} >Forget Password?</p>
                    </span>

                </form>
            </div>



        </div>
    )
}

export default Login