import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { footerLinks } from '@/constants'

const Footer = () => {
    return (
        <footer className='flex m-auto flex-col text-black-100  mt-5 border-t border-gray-200 bg-black  '>
            
            <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10 ">
                <div className="flex flex-col justify-start items-start gap-6  ">
                    <Link href={'/'} className='flex justify-center items-center max-md:w-full  '>
                        <span className="flex items-center mr-5">
                            <p className="text-xl font-semibold text-white">insight</p>
                            <p className="text-xl font-semibold text-amber-500">Edge</p>
                        </span>
                    </Link>                
                </div>

                <div className="flex-1 max-md:justify-center  w-full flex flex-row md:justify-end flex-wrap max-md:mt-10 gap-20">
                    {footerLinks.map((link, ind)=>{
                        return(
                            <div key={ind} className="flex max-md:items-center  flex-col gap-6 text-base min-w-[170px] max-md:min-w-max">
                                <h3 className='font-bold text-slate-200'>{link.title}</h3>
                                {link.links.map((item, ind)=>{
                                    return(
                                        <Link key={ind} href={item.url} className='text-slate-400' >{item.title}</Link>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="bg-black flex max-md:gap-[35px] max-md:flex-col justify-between items-center mt-10 border-t border-slate-400 px-[15px] sm:px-[30px] lg:pl-[40px] xl:px-[70px] py-10">
                <p className='max-sm:text-center text-slate-200'>@2024 insightEdge. All Rights Reserved</p>
                <div className='flex-1 flex sm:justify-end justify-center max-sm:mt-4 gap-5 sm:gap-10'>
                    <Link href={'/'} className='text-slate-400'>Privacy Policy</Link>
                    <Link href={'/'} className='text-slate-400'>Term of Use</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer