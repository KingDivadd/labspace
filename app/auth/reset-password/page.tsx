'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {useChat} from '../../context/ChatContext'

const ResetPassword = () => {
    const router = useRouter()
    const [auth, setAuth] = useState({ password: '', confirm_password: ''})
    const {header_nav, setHeader_nav} = useChat()

    const handle_change = (e:any)=>{
        const name = e.target.name
        const value = e.target.value
        setAuth({...auth, [name]:value})

    }

    const handle_signup = ()=>{
        setHeader_nav('pricing')
        router.push('/')
    }

    return (
        <div className="w-full bg-white h-[100vh]  flex flex-col items-center justify-center relative gap-10">
            <span className="absolute left-0 top-0 w-full h-[80px] bg-slate-800">
                <div className="w-[80%] mx-auto h-full flex items-center justify-start ">
                    <span className="flex items-center  cursor-pointer" onClick={()=> router.push('/') }>
                        <p className="text-xl font-semibold text-white">Fintaza</p>
                        <p className="text-xl font-semibold text-amber-500">Pdl</p>
                    </span>
                </div>
            </span>

            <span className=" text-2xl font-[600] mx-auto flex items-center gap-[10px] ">Choose a new <p className="text-amber-600">Password</p></span>
            <form action='' className=" w-[400px] mx-auto flex flex-col items-start justify-start rounded-[5px] p-[20px] bg-white min-h-[200px] py-[30px] gap-[35px] shadow-lg border border-slate-200 ">
                
                                
                <input type="password" name='password' onChange={handle_change} placeholder='Password' className='input-type-1' />
                                
                <input type="password" name='confirm_password' onChange={handle_change} placeholder='Confirm password' className='input-type-1' />

                {/* <span className="w-full flex items-center justify-end">
                    <p className="text-sm text-blue-600 cursor-pointer hover:text-amber-600" onClick={()=> router.push('/generate-otp')} >Forgot Password?</p>
                </span> */}

                <button className="w-full flex items-center justify-center h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white">
                    submit
                </button>

            </form>
            <span className="text-md font-[500] mx-auto flex items-center gap-[10px] ">Already have an account? <p className="text-blue-600 cursor-pointer" onClick={()=> router.push('/auth/login')}>login</p></span>


        </div>
    )
}

export default ResetPassword