'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {useChat} from '../../context/ChatContext'

const VerifyOtp = () => {
    const router = useRouter()
    const [auth, setAuth] = useState({email: '', password: ''})
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
        <div className="w-full bg-white h-screen flex flex-col relative items-center justify-center gap-10">
            <span className="w-full h-[80px] absolute top-0 left-0 bg-slate-800">
                <div className="w-[80%] mx-auto h-full flex items-center justify-start ">
                    <span className="flex items-center  cursor-pointer" onClick={()=> router.push('/') }>
                        <p className="text-xl font-semibold text-white">Fintaza</p>
                        <p className="text-xl font-semibold text-amber-500">Pdl</p>
                    </span>
                </div>
            </span>

            <span className="text-2xl font-[600] flex items-center gap-[10px]">Verify <p className="text-amber-600">Otp</p></span>
            <form action='' className="w-[400px] flex flex-col items-start justify-start rounded-[5px] p-[20px] bg-white  py-[30px] gap-[35px] shadow-lg border border-slate-200  ">
                
                <input type="text" name='otp' onChange={handle_change} placeholder='Enter otp' className='input-type-1 ' />
                
                <button className="w-full flex items-center justify-center h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white">
                    submit
                </button>

            </form>
            <span className="text-md font-[500] flex items-center gap-[10px] ">Already have an account? <p className="text-blue-600 cursor-pointer" onClick={()=> router.push("/auth/login")}>Login</p></span>


        </div>
    )
}

export default VerifyOtp