'use client'
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { BiMenu, BiX } from "react-icons/bi";
import {useChat} from '@/app/context/ChatContext'

const Header = () => {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const {header_nav, setHeader_nav} = useChat()

    useEffect(() => {
        setTimeout(() => {
            router.push('/auth/login')
        }, 2000);
    }, [])

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const nav_to = (navv:string)=>{
        setHeader_nav(navv)
    }

    const handle_signup = ()=>{
        setHeader_nav('pricing')
    }

    return (
        <div className="w-full flex flex-col items-center justify-start bg-blue-600 ">
            <nav className="w-[92.5%] mx-auto h-[120px] flex items-center justify-between ">
                {/* left nav */}
                <div className=" flex h-full items-center justify-start gap-5">
                    <span className="flex items-center mr-5 cursor-pointer" onClick={()=> setHeader_nav('home') }>
                        <p className="text-xl font-semibold text-white">Labp</p>
                        <p className="text-xl font-semibold text-sky-400">space</p>
                    </span>

                    
                </div>
                {/* right nav */}

                <div className=" flex h-full items-center justify-end gap-5">
                    
                    <button className="h-[50px] font-[500] text-lg px-5 flex items-center text-slate-300 border-2 border-slate-300 hover:text-sky-400 hover:border-sky-400  "  onClick={()=> router.push('/auth/login')}>
                        Sign in
                    </button>
                </div>
            </nav>

            {(header_nav == 'home' || header_nav == 'features' ) && 
            <div className="w-[70%] mx-auto flex flex-col items-start justify-start gap-5 mb-20">
                <p className="xl:text-[65px] font-bold text-white">LABPSPACE</p>
                <p className="xl:text-lg w-[550px] text-start font-[400] text-white">Get a high-level view of all your task, manage, assign and track progress.</p>
                <button className="h-[60px] text-xl font-[400] bg-sky-400  px-5 flex items-center text-white hover:bg-sky-500 mt-5">
                    Proceed
                </button>

            </div>}

            {header_nav == 'pricing' && <div className="w-[70%] mx-auto flex flex-col items-start justify-start gap-5 mb-20">
                <p className="xl:text-[65px] font-bold text-white">Plans & Pricing</p>
                <p className="xl:text-lg w-[550px] text-start font-[400] text-white">Since 2010, we’ve been continuously crawling and indexing vast amounts of web data around the clock. With an Ahrefs subscription, you can tap into these powerful insights to boost your business performance.</p>

            </div>}

            {header_nav == 'about_us' && <div className="w-[70%] mx-auto flex flex-col items-start justify-start gap-5 mb-20">
                <p className="xl:text-[65px] font-bold text-white">About Us</p>
                <p className="xl:text-lg w-[550px] text-start font-[400] text-white">Empowering businesses with the right tools for SEO & digital success.</p>

            </div>}

            {
                header_nav == 'contacts' && 
                <div className="w-[70%] mx-auto flex  items-start justify-start gap-10 mb-20 ">
                    {/* the left part */}
                    <div className="flex-1 flex flex-col items-start justify-start gap-5">
                        <p className="xl:text-[65px] font-bold text-white">Contact Us</p>
                        <p className="xl:text-lg w-[550px] text-start font-[400] text-white">Email, chatbox, or complete the form to learn how insightEdge can be of service.</p>
                        <p className="text-lg text-white hover:underline cursor-pointer hover:text-amber-500">support@insightEdge.com</p>
                        <p className="text-lg text-white underline">customer support</p>

                        <div className="flex items-center gap-10 justify-start">
                            <div className="w-full flex items-start justify-start gap-10">
                                <div className="flex flex-col gap-5 bg-blue-500 rounded-[10px] p-[20px]   ">
                                    <p className="text-xl text-white font-[600]">Customer Support</p>
                                    <p className="text-md font-[500]  text-slate-100 min-h-[120px]">Our support team is available around the clock to address any concerns or query you may have  </p>
                                </div>
                            </div>
                            <div className="w-full flex justify-start gap-10">
                                <div className="flex flex-col gap-5 bg-blue-500 rounded-[10px] p-[20px]   ">
                                    <p className="text-xl text-white font-[600]">Feedback & Suggestions </p>
                                    <p className="text-md font-[500]  text-slate-100 min-h-[120px] ">We value your feedback and are working continuously to imporve insightEdge.Your input is critical in shaping the future of insightEdge    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* the form  parrt */}

                    <div className="w-[400px] min-h-[300px] rounded-[10px] p-[20px] bg-white flex flex-col items-start justify-start gap-5">
                        <p className="xl:text-2xl w-full text-start font-[600] text-black">Get in Touch</p>
                        <p className="text-md text-slate-400 mt-[-15px]">You can reach anytime.</p>
                        <form action="" className='flex flex-col items-start justify-start gap-5 w-full' >
                            <input type="text" placeholder='First name' className='input-type-1' />

                            <input type="text" placeholder='Last name' className='input-type-1' />

                            <input type="email" placeholder='johndoe@gmail.com' className='input-type-1' />

                            <input type="text" placeholder='phone' className='input-type-1' />

                            <textarea name="" id="" rows={4} placeholder='how can we help?' className='resize-none w-[100%] outline-none p-[10px] border border-slate-400 text-[15px] rounded-[3px] bg-transparent' ></textarea>

                            <button className="w-full flex items-center justify-center rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white text-lg h-[45px]">Submit</button>
                        </form>
                    </div>

                </div>   
            }



        </div>
    );
};

export default Header;
