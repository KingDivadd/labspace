'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {useChat} from '../../context/ChatContext'
import Alert from '../../component/helper'
import { post_request } from '@/app/api'


const RecoverPassword = () => {
    const router = useRouter()
    const [auth, setAuth] = useState({email: ''})
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
        
    }, [auth])


    async function handle_login(e: any) {
        e.preventDefault();

        if (!auth.email ) {
            if (!auth.email){ showAlert('Please provide email address', 'warning');  }
            
            setInputError({
                ...inputError,
                email: auth.email === "",
            });
            return;
        } else {
            setLoading(true); 

            try {
                
                const response = await post_request('app/generate-otp', auth)                

                if (response.status == 200 || response.status == 201){

                    sessionStorage.setItem('email', auth.email)
                    
                    showAlert(response.data.msg, "success")
                    setAuth({email: ''})
                    setLoading(false)
                    setTimeout(() => {
                        router.push('/auth/verify-otp')
                    }, 3000);
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
            <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">

                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>


            <div className=" max-sm:p-[15px] mx-auto flex flex-wrap items-center justify-center gap-[50px] lg:gap-20  "> 
                <p className=' sm:w-[400px] lg:mb-10 max-sm:text-[35px] max-lg:text-[40px] lg:text-[55px] max-lg:font-[700] lg:font-[800] text-center text-blue-500'>
                    Labpspace
                </p>

                <form action='' className="w-full sm:w-[400px] flex flex-col items-start justify-start rounded-[5px] p-[20px] bg-white min-h-[200px] py-[30px] gap-[35px] shadow-lg border border-slate-200 ">

                    <span className="w-full flex flex-col items-center justify-start gap-[5px]"> 
                        <p className="text-[27.5px] font-[700] text-blue-500"> Recover Password</p>
                        <p className="text-sm font-[500] text-slate-700 text-centeer">Provide your registered email address</p>
                    </span>
                    
                    <input type="email" name='email' onChange={handle_change} placeholder='Email' className={inputError.email ? 'input-error-1' : 'input-type-1'} />

                    <button className="w-full flex items-center justify-center h-[45px] rounded-[3px] bg-blue-500 hover:bg-blue-600 text-white" onClick={handle_login} disabled={loading}>
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

export default RecoverPassword