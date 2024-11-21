'use client'
import React, {useState, useEffect} from 'react'
import { IoCheckmark } from 'react-icons/io5'
import Image from "next/image"
import {useChat} from '@/app/context/ChatContext'
import { useRouter } from 'next/navigation'

const Hero = () => {
    const router  =  useRouter()
    const {header_nav, setHeader_nav,  setPricing_plan} = useChat()
    
    const handle_pricing_plan = (data:string)=>{
        setPricing_plan(data)
        router.push('/user/signup')
    }

    return (
        <div className="w-full flex flex-col items-center justify-start mt-[70px] gap-[60px] ">
            {(header_nav == 'home' || header_nav == 'features') && <div className="w-full flex flex-col items-center justify-start mt-[70px] gap-[60px] ">
                <div className="w-full mx-auto flex flex-col justify-start items-center gap-10  ">
                    <p className="text-[40px] w-[600px] font-[500] text-black tracking-wide">Instantly spot changes in all important SEO metrics</p>
                    <div className="w-[600px] flex flex-col items-start justify-start gap-3">
                        {
                            ['Health Score', 'Domain Rating', 'Referring Domain & Backlink', 'Oraganic traffic & Keywords'].map((data:any, ind:number)=>{
                                return(
                                    <span key={ind} className="flex items-center justify-start gap-2">
                                        <span className='h-[20px] w-[20px] text-amber-700 ' > <IoCheckmark size={'100%'} /> </span>
                                        <p className="text-lg font-[500] ">{data}</p>
                                    </span>
                                )
                            })
                        }
                    </div>

                    {/* the image */}
                    <div className="mx-auto relative w-[70%] h-[600px] rounded-[10px] overflow-hidden auth-bg">
                        <Image
                            src="/seo_img_1.webp"
                            alt="Authentication"
                            layout="fill"
                            // objectFit="cover"
                        />
                    </div>

                    <p className="text-lg text-slate-500 -mt-5 ">See how your projects are doing at a glance with trend graphs.</p>

                    <span className="w-full border-b border-slate-300"></span>

                </div>
                
                <div className="w-full mx-auto flex flex-col justify-start items-center gap-10  ">
                    <p className="text-[40px] w-[600px] font-[500] text-black tracking-wide">Comprehensive Project Health Monitoring</p>
                    <div className="w-[600px] flex flex-col items-start justify-start gap-3">
                        {
                            ['Project status overview', 'Alerts on critical issues', 'Health scores across projects'].map((data:any, ind:number)=>{
                                return(
                                    <span key={ind} className="flex items-center justify-start gap-2">
                                        <span className='h-[20px] w-[20px] text-amber-700 ' > <IoCheckmark size={'100%'} /> </span>
                                        <p className="text-lg font-[500] ">{data}</p>
                                    </span>
                                )
                            })
                        }
                    </div>

                    {/* the image */}
                    <div className="mx-auto relative w-[70%] h-[600px] rounded-[10px] overflow-hidden auth-bg">
                        <Image
                            src="/seo_img_1.webp"
                            alt="Authentication"
                            layout="fill"
                            // objectFit="cover"
                        />
                    </div>

                    <p className="text-lg text-slate-500 -mt-5 ">See and monitor projects health and receive alert on critical issues.</p>

                    <span className="w-full border-b border-slate-300"></span>

                </div>
                
                <div className="w-full mx-auto flex flex-col justify-start items-center gap-10  ">
                    <p className="text-[40px] w-[600px] font-[500] text-black tracking-wide">Detailed SEO Report</p>

                    <div className="w-[70%] flex flex-col items-start justify-start gap-3">
                        <p className="text-lg font-[500] w-full text-start flex items-center leading-[35px] ">
                        This feature provides an all-encompassing SEO audit, covering essential elements like title tags, meta descriptions, headings, and content keywords to ensure your site is optimized for search engines. It also checks for image keywords, SEO-friendly URLs, and in-page links to enhance your site’s visibility and structure.
                        </p>
                        <p className="text-lg font-[500] w-full text-start leading-[35px] ">
                        Additionally, it addresses technical SEO aspects, including 404 pages, robots.txt configuration, Noindex tags, language settings, and favicon presence, helping to maintain a search-friendly, user-oriented website that meets SEO standards.
                        </p>
                    </div>

                    {/* the image */}
                    <div className="mx-auto relative w-[70%] h-[600px] rounded-[10px] overflow-hidden auth-bg">
                        <Image
                            src="/seo_img_1.webp"
                            alt="Authentication"
                            layout="fill"
                            // objectFit="cover"
                        />
                    </div>

                    <p className="text-lg text-slate-500 -mt-5 ">Detailed seo reports, search friendly and user oriented website.</p>

                    <span className="w-full border-b border-slate-300"></span>

                </div>

                <div className="w-full mx-auto flex flex-col justify-start items-center gap-10  ">
                    <p className="text-[40px] w-[600px] font-[500] text-black tracking-wide">Security and Accessibility Checks</p>

                    <div className="w-[70%] flex flex-col items-start justify-start gap-3">
                        <p className="text-lg font-[500] w-full text-start flex items-center leading-[35px] ">
                        The platform provides essential security checks to ensure your site’s data integrity and user safety. With HTTPS encryption, it verifies that all communications are secure, while mixed content detection ensures only secure resources are loaded on each page.
                        </p>
                        <p className="text-lg font-[500] w-full text-start leading-[35px] ">
                        Additional protections include server signature visibility checks to limit unnecessary server exposure, cross-origin link monitoring to prevent unsafe connections, and plaintext email warnings to safeguard user information against potential threats.
                        </p>
                    </div>

                    {/* the image */}
                    <div className="mx-auto relative w-[70%] h-[600px] rounded-[10px] overflow-hidden auth-bg">
                        <Image
                            src="/seo_img_1.webp"
                            alt="Authentication"
                            layout="fill"
                            // objectFit="cover"
                        />
                    </div>

                    <p className="text-lg text-slate-500 -mt-5 ">HTTPS encryption to ensure site data integrity and user safety.</p>

                    <span className="w-full border-b border-slate-300"></span>

                </div>
            </div>}

            {
                header_nav == 'pricing' && 
                <div className="w-[85%] mx-auto flex items-start justify-between gap-[20px] ">
                    <div className="w-1/4 bg-blue-600 min-h-[100vh] rounded-[5px] pb-[20px] ">
                        <p className="text-[30px] text-white font-[700] m-[20px] ">Free</p>

                        <p className="my-[30px] text-md font-[500] w-[70%] text-slate-200 m-[20px] ">Essential data for small businesses and hobby projects.</p>

                        <div className="px-[20px] flex flex-col items-start justify-start">
                            <p className="text-lg text-slate-200">Starts at</p>
                            <span className="flex justify-start gap-[10px]">
                                <p className="text-[17.5px] text-white flex self-start font-[500] mt-[20px]">$</p>
                                <p className="text-[60px] text-white flex items-start font-[600]">000</p>
                                <p className="text-md font-[500] text-slate-300 self-end mb-[17.5px]">/mo</p>
                            </span>
                        </div>

                        <button className="ml-[20px] px-5 h-[40px] bg-amber-500 hover:bg-amber-600 text-white font-md font-[600] " style={{width: 'calc(100% - 40px)'}} onClick={()=>handle_pricing_plan('free')} >
                            Get Started
                        </button>

                        <span className="h-[3px] mx-auto flex items-center justify-start bg-white mt-[20px] " style={{width: 'calc(100% - 40px)'}}> 
                            <span className="h-full w-[25%] bg-green-600"> </span>
                        </span>

                        <div className="w-full flex flex-col items-start justify-start mt-[20px] ">
                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Limited access to SEO metrics</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">1 Project Monitoring</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Limited Web tools Access</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">PDF report only</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">1 user account</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">No Payment Option</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Community Support</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">No Custom Branding</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Basic Insight & Analytics</p>
                        </div>
                    </div>
                    
                    <div className="w-1/4 bg-blue-600 min-h-[100vh] rounded-[5px] pb-[20px] ">
                        <p className="text-[30px] text-white font-[700] m-[20px] ">Standard</p>

                        <p className="my-[30px] text-md font-[500] w-[70%] text-slate-200 m-[20px] ">Comprehensive tools for startups or small business looking to grow.</p>

                        <div className="px-[20px] flex flex-col items-start justify-start">
                            <p className="text-lg text-slate-200">Starts at</p>
                            <span className="flex justify-start gap-[10px]">
                                <p className="text-[17.5px] text-white flex self-start font-[500] mt-[20px]">$</p>
                                <p className="text-[60px] text-white flex items-start font-[600]">120</p>
                                <p className="text-md font-[500] text-slate-300 self-end mb-[17.5px]">/mo</p>
                            </span>
                        </div>

                        <button className="ml-[20px] px-5 h-[40px] bg-amber-500 hover:bg-amber-600 text-white font-md font-[600] " style={{width: 'calc(100% - 40px)'}} onClick={()=>handle_pricing_plan('standard')}>
                            Get Started
                        </button>

                        <span className="h-[3px] mx-auto flex items-center justify-start bg-white mt-[20px] " style={{width: 'calc(100% - 40px)'}}> 
                            <span className="h-full w-[50%] bg-green-600"> </span>
                        </span>

                        <div className="w-full flex flex-col items-start justify-start mt-[20px] ">
                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Full access to SEO metrics</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Up to 5 Project Monitoring</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Basic Web tools Access</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">PDF and CSV reports only</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Up to 3 users</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Stripe</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Community and email Support</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">No Custom Branding</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Advanced Insight & Analytics</p>
                        </div>
                    </div>
                    
                    <div className="w-1/4 bg-blue-600 min-h-[100vh] rounded-[5px] pb-[20px] ">
                        <p className="text-[30px] text-white font-[700] m-[20px] ">Premium</p>

                        <p className="my-[30px] text-md font-[500] w-[70%] text-slate-200 m-[20px] ">Advanced features and insights for established businesses.</p>

                        <div className="px-[20px] flex flex-col items-start justify-start">
                            <p className="text-lg text-slate-200">Starts at</p>
                            <span className="flex justify-start gap-[10px]">
                                <p className="text-[17.5px] text-white flex self-start font-[500] mt-[20px]">$</p>
                                <p className="text-[60px] text-white flex items-start font-[600]">180</p>
                                <p className="text-md font-[500] text-slate-300 self-end mb-[17.5px]">/mo</p>
                            </span>
                        </div>

                        <button className="ml-[20px] px-5 h-[40px] bg-amber-500 hover:bg-amber-600 text-white font-md font-[600] " style={{width: 'calc(100% - 40px)'}} onClick={()=>handle_pricing_plan('premium')}>
                            Get Started
                        </button>

                        <span className="h-[3px] mx-auto flex items-center justify-start bg-white mt-[20px] " style={{width: 'calc(100% - 40px)'}}> 
                            <span className="h-full w-[75%] bg-green-600"> </span>
                        </span>

                        <div className="w-full flex flex-col items-start justify-start mt-[20px] ">
                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Full access to SEO metrics + historical data</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Up to 20 Projects Monitoring</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">All Web tools Access</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">PDF, CSV, and additional formats</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Up to 10 users</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Stripe, Paypal</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Priority email Support</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Basic Branding</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Detailed Analytics</p>
                        </div>
                    </div>
                    
                    <div className="w-1/4 bg-blue-600 min-h-[100vh] rounded-[5px] pb-[20px] ">
                        <p className="text-[30px] text-white font-[700] m-[20px] ">Enterprice</p>

                        <p className="my-[30px] text-md font-[500] w-[70%] text-slate-200 m-[20px] ">Tailored solutions with full support for large organizations.</p>

                        <div className="px-[20px] flex flex-col items-start justify-start">
                            <p className="text-lg text-slate-200">Starts at</p>
                            <span className="flex justify-start gap-[10px]">
                                <p className="text-[17.5px] text-white flex self-start font-[500] mt-[20px]">$</p>
                                <p className="text-[60px] text-white flex items-start font-[600]">250</p>
                                <p className="text-md font-[500] text-slate-300 self-end mb-[17.5px]">/mo</p>
                            </span>
                        </div>

                        <button className="ml-[20px] px-5 h-[40px] bg-amber-500 hover:bg-amber-600 text-white font-md font-[600] " style={{width: 'calc(100% - 40px)'}} onClick={()=>handle_pricing_plan('enterprice')}>
                            Get Started
                        </button>

                        <span className="h-[3px] mx-auto flex items-center justify-start bg-white mt-[20px] " style={{width: 'calc(100% - 40px)'}}> 
                            <span className="h-full w-[100%] bg-green-600"> </span>
                        </span>

                        <div className="w-full flex flex-col items-start justify-start mt-[20px] ">
                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Full SEO reports + historical data</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Unlimited Project Monitoring</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">All Web tools + Custom Tool Access</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">All formats + API access</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Unlimited users</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">All options + invoice billing</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">24/7 dedicated support</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Full branding options</p>

                            <p className="text-md w-full font-[500] px-[20px] text-slate-100 min-h-[40px]  py-[10px] flex items-center hover:bg-blue-500 ">Custom analytics and reports</p>
                        </div>
                    </div>

                </div>
            }

            {
                header_nav == 'about_us' &&
                <div className="w-[70%] flex flex-col items-start justif-start gap-5 ">
                    <p className="xl:text-lg w-full text-start font-[400] text-black " style={{lineHeight: '45px'}}>At InsightEdge, our mission is to empower businesses with powerful, user-friendly tools to achieve visibility, enhance performance, and stay ahead in the digital world. We believe that every business deserves top-notch resources to navigate the complexities of SEO and web analytics.
                    </p>
                
                    <p className="xl:text-lg w-[100%] text-start font-[400] text-black " style={{lineHeight: '45px'}}>Founded in 2023, InsightEdge was created by a group of digital marketing enthusiasts and developers who shared a passion for simplifying SEO. Our goal is to provide a comprehensive platform where businesses can manage their online presence, monitor performance, and use advanced tools—without the complexities that often come with SEO management.
                    </p>

                    <p className="text-xl font-[600] mt-10">Core Values</p>
                    <div className="w-full flex items-center justify-between gap-5">
                        {[
                            {title:'Inovation', details: 'Continuously improving our tools to provide the latest SEO insights.'},
                            {title:'Integrity', details: 'Prioritizing transparency, honesty, and accountability in all our services.'},
                            {title:'Customer-Centric', details: 'Creating a platform that’s simple, intuitive, and effective for our users.'},
                            {title:'Empowerment', details: 'Giving businesses the resources to take charge of their online presence.'  }
                        ].map((data,ind)=>{
                            return(
                                <div key={ind} className="w-1/4 min-h-[185px] p-[20px] rounded-[10px] bg-blue-600 flex flex-col items-start justify-start gap-5 ">
                                    <p className="text-lg font-[500] text-white">{data.title}</p>
                                    <p className="text-md font-[500] text-slate-100">{data.details}</p>
                                </div>
                            )
                        })}
                    </div>

                    <p className="text-xl font-[600] mt-10">Achievements & Statistics</p>

                    <div className="w-full flex items-center justify-between gap-5">
                        {[
                            {title:'500+', details: 'clients served worldwide'},
                            {title:'10+', details: 'Integrated SEO Tools'},
                            {title:'97%', details: 'Customer satisfaction rating'},
                            {title:'4.5/5', details: 'Average user rating'  }
                        ].map((data,ind)=>{
                            return(
                                <div key={ind} className="w-1/4 min-h-[125px] p-[20px] rounded-[10px] bg-slate-100 flex flex-col items-start justify-start gap-5 ">
                                    <p className="text-lg font-[600] text-black">{data.title}</p>
                                    <p className="text-md font-[500] text-slate-500">{data.details}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }



        </div>
    )
}

export default Hero