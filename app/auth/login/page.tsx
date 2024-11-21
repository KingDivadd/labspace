'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {useChat} from '../../context/ChatContext'
import Alert from '../../component/helper'
import { post_request } from '@/app/api'


const Login = () => {
    const router = useRouter()
    const [auth, setAuth] = useState({email: '', password: ''})
    const {header_nav, setHeader_nav, } = useChat()
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({message: '', type: ''})
    const [inputError, setInputError] = useState({email: false, password: false})


    const handle_change = (e:any)=>{
        const name = e.target.name
        const value = e.target.value
        setAuth({...auth, [name]:value})

    }

    function showAlert(message: string, type: string){
        console.log('message ', message, 'type ', type)
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
        if (auth.email) { 
            setInputError({...inputError, email: auth.email == ''} );
            return;
        }
        if (auth.password) { 
            setInputError({...inputError, password: auth.password == ''} ) 
            return;
        }
        
    }, [auth])


    async function handle_login(e: any) {
        e.preventDefault();


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
                    setAuth({email: '', password: ''})
                    setLoading(false)
                    router.push('/user/porter')
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
        <div className="w-full bg-white h-screen flex flex-col relative items-center justify-center gap-10 relative" >
            <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>

            <span className="w-full h-[80px] absolute top-0 left-0 bg-slate-800">
                <div className="w-[80%] mx-auto h-full flex items-center justify-start ">
                    <span className="flex items-center  cursor-pointer" onClick={()=> router.push('/') }>
                        <p className="text-xl font-semibold text-white">Fintaza</p>
                        <p className="text-xl font-semibold text-amber-500">Pdl</p>
                    </span>
                </div>
            </span>

            <span className="text-2xl font-[600] flex items-center ">Sign in to Fintaza <p className="text-amber-600">Pdl</p></span>

            <form action='' className="w-[400px] flex flex-col items-start justify-start rounded-[5px] p-[20px] bg-white min-h-[200px] py-[30px] gap-[35px] shadow-lg border border-slate-200 ">
                
                <input type="email" name='email' onChange={handle_change} placeholder='Email' className={inputError.email ? 'input-error-1' : 'input-type-1'} />
                
                <input type="password" name='password' onChange={handle_change} placeholder='Password' className={inputError.password ? 'input-error-1' : 'input-type-1'} />

                <span className="w-full flex items-center justify-start gap-[10px] ">
                    <input type="checkbox" name="remember_me" id="remember_me" />
                    <label htmlFor="remember_me" className="text-sm  cursor-pointer " >Remember me</label>
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
                    <p className="text-sm text-blue-600 cursor-pointer hover:text-amber-600" onClick={()=> router.push('/auth/recover-password')} >Forgot Password?</p>
                </span>


            </form>
            <span className="text-md font-[500] flex items-center gap-[10px] ">Don't have an account? <p className="text-blue-600 cursor-pointer" onClick={()=> router.push('/auth/signup')}>Signup</p></span>


        </div>
    )
}

export default Login