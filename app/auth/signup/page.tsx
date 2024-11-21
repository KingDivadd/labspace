'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {useChat} from '../../context/ChatContext'
import Alert from '../../component/helper'
import { post_request } from '@/app/api'

const Login = () => {
    const router = useRouter()
    const [auth, setAuth] = useState({
        email: '', password: '', first_name: '', last_name: '', business_name: '', 
        code: '', phone: '', city: '', state: '', zip: '', address: '', user_role: 'user'
    })
    const [inputError, setInputError] = useState({
        email: false, password: false, first_name: false, last_name: false, business_name: false, 
        code: false, phone: false, city: false, state: false, zip: false, address: false, 
    })

    const [phase, setPhase] = useState('first')
    const [alert, setAlert] = useState({message: '', type: ''})
    const [loading, setLoading] = useState(false)

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

    useEffect(() => {
        if (auth.email) { 
            setInputError({...inputError, email: auth.email === ''} );
            return;
        }
        if (auth.password) { 
            setInputError({...inputError, password: auth.password == ''} ) 
            return;
        }
        
    }, [auth])

    async function handle_signup(e: any) {
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
                
                const response = await post_request('app/signup', auth)                

                console.log('response result === ', response)

                if (response.status == 200 || response.status == 201){

                    localStorage.setItem('x-id-key' ,response.headers.get('x-id-key'));
                    
                    showAlert(response.data.msg, "success")
                    setLoading(false)
                    
                }
                else{
                    showAlert(response.response.data.err, "error")
                    setLoading(false)
                }
            } catch (err:any) {
                console.error('Network or unexpected error:', err);
                showAlert('An unexpected error occurred. Please try again later.', 'error');
            } finally {
                setLoading(false); // Set loading to false in both success and error cases
            }
            setLoading(false)

        }
        setLoading(false)
    }

    return (
        <div className="w-full bg-white h-[100vh]  flex flex-col items-start justify-start gap-[30px] overflow-y-auto relative">
            <span className="px-[20px] flex items-center justify-end absolute top-[15px] right-[50px] z-20 h-[50px]  ">
                {alert.message && <Alert message={alert.message} type={alert.type} />} 
            </span>
            <span className=" w-full h-[80px] bg-slate-800">
                <div className="w-[80%] mx-auto h-full flex items-center justify-start ">
                    <span className="flex items-center  cursor-pointer" onClick={()=> router.push('/') }>
                        <p className="text-xl font-semibold text-white">Fintaza</p>
                        <p className="text-xl font-semibold text-amber-500">Pdl</p>
                    </span>
                </div>
            </span>

            {phase =='first' ? 
            <span className=" text-2xl font-[600] mx-auto flex items-center ">Sign up to Fintaza <p className="text-amber-600">Pdl</p></span>
            :
            <span className=" text-2xl font-[600] mx-auto flex items-center gap-[5px] ">Setup your <p className="text-amber-600">FintazaPdl</p> Profile</span>
            }

            {phase == 'first' && <form action='' className=" w-[400px] mx-auto flex flex-col items-start justify-start rounded-[5px] p-[20px] bg-white min-h-[200px] py-[30px] gap-[25px] shadow-lg border border-slate-200 ">
                
                <input type="text" name='first_name' value={auth.first_name} onChange={handle_change} placeholder='First Name' className={inputError.first_name ? 'input-error-1' :'input-type-1 '} />
                
                <input type="text" name='last_name' value={auth.last_name} onChange={handle_change} placeholder='Last Name'  className={inputError.last_name ? 'input-error-1' :'input-type-1 '} />
                
                <input type="text" name='business_name' value={auth.business_name} onChange={handle_change} placeholder='Business Name'  className={inputError.business_name ? 'input-error-1' :'input-type-1 '} />
                
                <input type="email" name='email' value={auth.email} onChange={handle_change} placeholder='Email'  className={inputError.email ? 'input-error-1' :'input-type-1 '} />
                                
                <input type="password" name='password' value={auth.password} onChange={handle_change} placeholder='Password'  className={inputError.password ? 'input-error-1' :'input-type-1 '} />

                <button className="w-full flex items-center justify-center h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white"
                onClick={()=>{ setPhase('second'); console.log('auth : ', auth)}}>
                    Next
                </button>

            </form>}

            {phase == 'second' && <form action='' className=" w-[400px] mx-auto flex flex-col items-start justify-start rounded-[5px] p-[20px] bg-white min-h-[200px] py-[30px] gap-[25px] shadow-lg border border-slate-200  ">
                <span className="w-full flex items-center justify-start gap-[20px] ">
                    <span className=" w-[80px] flex items-center justify-center  ">
                        <input type="text" name='code' value={auth.code} onChange={handle_change} placeholder='+000'  className={inputError.code ? 'input-error-1' :'input-type-1 '} />
                    </span>
                    <input type="text" name='phone' value={auth.phone} onChange={handle_change} placeholder='Phone'  className={inputError.phone ? 'input-error-1' :'input-type-1 '} />
                </span>
                
                <input type="text" name='city' value={auth.city} onChange={handle_change} placeholder='City' className='input-type-1 ' />
                
                <input type="text" name='state' value={auth.state} onChange={handle_change} placeholder='State' className='input-type-1 ' />
                
                <input type="text" name='zip' value={auth.zip} onChange={handle_change} placeholder='Zip' className='input-type-1 ' />
                
                <textarea name="address" value={auth.address} id="address" onChange={handle_change} placeholder='Address' rows={3} className='text-area-input-1' ></textarea>
                                
                <span className="w-full flex items-center justify-start gap-[20px] ">

                    <button className="px-5 flex items-center justify-center h-[45px] rounded-[3px] bg-amber-600 hover:bg-aamber-700 text-white" onClick={()=> setPhase('first')}  >
                        Back
                    </button>
                    
                    <button className=" w-full h-[45px] text-white bg-blue-600 rounded-[3px] hover:bg-blue-500 flex items-center justify-center " onClick={handle_signup} disabled={loading}>
                        {loading ? (
                        <svg className="w-[25px] h-[25px] animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        ) : 'signup'}
                    </button>

                </span>

            </form>}

            <span className="text-md font-[500] mx-auto flex items-center gap-[10px] ">Already have an account? <p className="text-blue-600 cursor-pointer" onClick={()=> router.push('/auth/login')}>login</p></span>


        </div>
    )
}

export default Login