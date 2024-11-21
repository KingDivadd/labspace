'use client'
import React, {useState, useEffect} from 'react'
import {DoughnutChartOne} from "./donut_chart"

const User_Dashboard = () => {
    const [page_number, setPage_number] = useState(1)
    const [lead_box, setLead_box] = useState<Leads_Props | null>(null);
    const [filtered_lead_box, setFiltered_lead_box] = useState<Leads_Props | null>(null);
    const [filters, setFilters] = useState({filter_input: '', disposition: ''})

    interface Leads_Props {
        forEach?(arg0: (data: any, ind: number) => void): unknown;
        filter?(arg0: (user: any) => any): unknown;
        map?(arg0: (data: any) => void): unknown;
        total_number_of_leads_pages?: number; // Now optional and can be undefined
        total_number_of_leads?: number; // Now optional can be undefined
        leads: any;
    }  

    async function app_users_action(item: any) {
        let new_page_number = page_number;
        let max_page_number = lead_box?.total_number_of_leads_pages

        if (item === 'prev') {
        if (page_number > 1) {
            new_page_number = page_number - 1;
        }
        } else if (item === 'next') {
        if (max_page_number && page_number < max_page_number) {
            new_page_number = page_number + 1;
        }
        } else {
        new_page_number = item;
        }

        setPage_number(new_page_number);
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = lead_box?.total_number_of_leads_pages || 1;
        const max_displayed_pages = 3;

        if (max_page_number <= max_displayed_pages) {
        for (let i = 1; i <= max_page_number; i++) {
            pages.push(
            <p
                key={i}
                className={`text-md font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-600 text-white' : ''
                }`}
                onClick={() => app_users_action(i)}
            >
                {i}
            </p>
            );
        }
        } else {
        let startPage = Math.max(1, page_number - 1);
        let endPage = Math.min(page_number + 1, max_page_number);

        if (page_number === 1) {
            startPage = 1;
            endPage = max_displayed_pages;
        } else if (page_number === max_page_number) {
            startPage = max_page_number - 2;
            endPage = max_page_number;
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
            <p
                key={i}
                className={`text-sm font-light h-[27px] w-[30px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                page_number === i ? 'bg-blue-700 text-white' : ''
                }`}
                onClick={() => app_users_action(i)}
            >
                {i}
            </p>
            );
        }
        }

        return pages;
    };

    return (
        <div className='w-full flex items-start justify-center px-[75px] py-10 '  >
            <div className="w-full flex flex-col justify-start items-center ">

                <div className="w-full flex items-start justify-start gap-10">
                    {/* credit score */}

                    <div className="flex items-center gap-[30px]  ">

                        <span className="  flex flex-col justify-center items-center relative  ">
                            <DoughnutChartOne  /> 
                            <span className="w-[225px] h-[225px]  flex flex-col items-center justify-center absolute top-0 right-0 ">
                                <p className="text-3xl font-bold text-teal-600">638</p>
                                <p className="text-sm text-blue-600">Exuifax</p>
                                <p className="text-sm ">Nov 16, 2024</p>
                                
                            </span>
                        </span>

                        <span className="  flex flex-col justify-center items-center relative  ">
                            <DoughnutChartOne  /> 
                            <span className="w-[225px] h-[225px]  flex flex-col items-center justify-center absolute top-0 right-0 ">
                                <p className="text-3xl font-bold text-teal-600">632</p>
                                <p className="text-sm text-blue-600">Experion</p>
                                <p className="text-sm ">Nov 16, 2024</p>
                                
                            </span>
                        </span>

                        <span className="  flex flex-col justify-center items-center relative  ">
                            <DoughnutChartOne  /> 
                            <span className="w-[225px] h-[225px]  flex flex-col items-center justify-center absolute top-0 right-0 ">
                                <p className="text-3xl font-bold text-teal-600">632</p>
                                <p className="text-sm text-blue-600">TransUnion</p>
                                <p className="text-sm ">Nov 16, 2024</p>
                                
                            </span>
                        </span>
                    </div>

                    <div className="flex-1 h-[225px] shadow-lg flex flex-col items-start justify-start gap-5 p-[15px] rounded-[5px] border-t border-slate-200">
                        <span className="flex items-center justify-start gap-2">
                            <p className="text-md font-[500]  ">Total Loans Borrowed</p>
                            <p className="text-lg font-[600] text-blue-600">$50,000</p>
                        </span>
                        <span className="flex items-center justify-start gap-2">
                            <p className="text-md font-[500] ">Total Repaid</p>
                            <p className="text-lg font-[600] text-teal-700">$7,600</p>
                        </span>
                        <span className="flex items-center justify-start gap-2">
                            <p className="text-md font-[500] ">Active Loans</p>
                            <p className="text-lg font-[600] text-blue-600">6</p>
                        </span>
                        <span className="flex items-center justify-start gap-2">
                            <p className="text-md font-[500] ">Next Payment</p>
                            <p className="text-lg font-[600] text-amber-600 ">$1,500 due on 25 Nov, 2024</p>
                        </span>
                    </div>


                </div>
                {/* section two loan info cards 1. loan id, 2. loan status, 3. loan repament date */}
                <div className="mt-10 w-full flex items-start justify-start  overflow-auto ">
                    <div className="w-full flex items-start jusitify-center gap-[30px] p-2 ">

                        {[1,2,3].map((data, ind)=>{
                            return(
                                <div key={ind} className="w-[350px] relative flex flex-col justify-start min-h-[150px] rounded-[3px] shadow-lg p-[15px] gap-[20px]">
                                    {ind % 2 == 1 ? <span className="w-full h-[7.5px] absolute top-0 left-0 rounded-t-[3px] bg-amber-600 "></span> :  <span className="w-full h-[7.5px] absolute top-0 left-0 rounded-t-[3px] bg-teal-600 "></span>}
                                    <span className="w-full flex items-center justify-start gap-[5px] ">
                                        <p className="text-md">Loan Status</p>
                                        {ind % 2 == 1 ? <p className="text-md text-amber-600 font-[600]">Pending</p> : <p className="text-md text-teal-600 font-[600]">Approved</p>}
                                    </span>

                                    <span className="w-full flex items-center justify-start gap-[5px] ">
                                        <p className="text-md">Repayment Due Date</p>
                                        <p className="text-md font-[600]">20 Nov, 2024</p>
                                    </span>

                                    <span className="w-full flex items-center justify-start gap-[5px] ">
                                        <p className="text-md">Outstanding Balance</p>
                                        <p className="text-md font-[600]">$5,500</p>
                                    </span>

                                    <span className="w-full flex justify-between ">
                                        <button className="px-5 rounded-[3px] border border-slate-700 hover:border-amber-600 text-slate-700 hover:text-amber-600 h-[45px] ">View Details</button>
                                        <button className="px-5 rounded-[3px] border border-slate-700 hover:border-teal-700 text-slate-700 hover:text-teal-700 h-[45px] ">Make Payment</button>
                                    </span>

                                </div>
                            )
                        })   }
                    </div>
                </div>

                {/* section three upcoming loan payment */}
                <div className="mt-10 w-full flex flex-col items-start justify-start shadow-lg  rounded-[3px]">
                    <span className="h-[50px] w-full flex items-center justify-start px-[15px] border-b border-slate-300 ">
                        <p className="text-md font-[600] ">Upcoming Loan Payment</p>
                    </span>

                    <div className="w-full p-[15px] flex flex-col items-start justify-start mx-auto ">
                        <span className="w-full h-[50px] flex items-center justify-between bg-blue-600 text-white rounded-[3px]">
                            <p className="text-sm font-[600] w-[20%] px-[15px] ">Loan Id</p>
                            <p className="text-sm font-[600] w-[20%] px-[15px] ">Next Payment Date</p>
                            <p className="text-sm font-[600] w-[20%] px-[15px] text-center ">Status</p>
                            <p className="text-sm font-[600] w-[20%] px-[15px] text-end">Amount to Pay</p>
                            <p className="text-sm font-[600] w-[20%] px-[15px] text-end ">Action</p>
                        </span>

                        <div className="w-full h-[500px] flex flex-col items-start justify-start overflow-y-auto">
                            <div className="w-full h-full flex flex-col justify-start">
                                {[1,2,4,5,1,1,1,1,1,1,].map((data, ind)=>{
                                    return(
                                        <span key={ind} className="table-body-row-1  ">
                                            <p className="text-sm font-[500] w-[20%] px-[15px] ">BL1000200{ind + 1}</p>
                                            <p className="text-sm font-[500] w-[20%] px-[15px] ">{7 + ind} November, 2024</p>
                                            <span className="text-sm font-[500] w-[20%] px-[15px] flex justify-center items-center ">
                                                { ind % 2 == 1 ? <button className="h-[32.5px] w-[100px] rounded-[3px]  text-white bg-amber-600 ">Upcoming</button> :
                                                <button className="h-[32.5px] w-[100px] rounded-[3px]  text-white bg-red-600 ">Due</button>}
                                            </span>
                                            <p className="text-sm font-[500] w-[20%] px-[15px] text-end ">$7,500</p>
                                            <span className="text-sm font-[500] w-[20%] px-[15px] flex justify-end">
                                                <button className="h-[32.5px] w-[100px] rounded-[3px]  text-white bg-teal-700 hover:bg-teal-800">Pay Now</button>
                                            </span>
                                        </span>
                                    )
                                })}
                            </div>
                        </div>

                    </div>

                    <span className="w-full h-[50px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-gray-300 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-md cursor-pointer" onClick={() => app_users_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className="text-md cursor-pointer" onClick={() => app_users_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-md">Showing 1-15 of {(filtered_lead_box && filtered_lead_box.leads.length) || 0}</p>
                        </span>
                    </span>
                </div>

                {/* section four recent transaction table */}
                <div className="mt-10 w-full flex flex-col items-start justify-start shadow-lg  rounded-[3px]">
                    <span className="h-[50px] w-full flex items-center justify-start px-[15px] border-b border-slate-300 ">
                        <p className="text-md font-[600] ">Recent Transactions</p>
                    </span>

                    <div className="w-full p-[15px] flex flex-col items-start justify-start mx-auto ">
                        <span className="w-full h-[50px] flex items-center justify-between bg-blue-600 text-white rounded-[3px]">
                            <p className="text-sm font-[600] w-[15%] px-[15px] ">Date</p>
                            <p className="text-sm font-[600] w-[25%] px-[15px] ">Account Number</p>
                            <p className="text-sm font-[600] w-[10%] px-[15px] ">Amount</p>
                            <p className="text-sm font-[600] w-[10%] px-[15px] ">Type (Cr/Dr)</p>
                            <p className="text-sm font-[600] w-[20%] px-[15px] ">Subject</p>
                            <p className="text-sm font-[600] w-[10%] px-[15px] ">Status</p>
                            <p className="text-sm font-[600] w-[10%] px-[15px] ">Details</p>
                        </span>

                        <div className="w-full h-[500px] flex flex-col items-start justify-start overflow-y-auto">
                            <div className="w-full h-full flex flex-col justify-start">
                                {[1,2,4,5,1,1,1,1,1,1,].map((data, ind)=>{
                                    return(
                                        <span key={ind} className="table-body-row-1  ">
                                            <p className="text-sm font-[500] w-[15%] px-[15px] ">{7 + ind} Nov, 2024</p>
                                            <p className="text-sm font-[500] w-[25%] px-[15px] ">SU10005001 - Savings Account (USD)</p>
                                            <p className="text-sm font-[500] w-[10%] px-[15px] text-teal-700 ">$7,500</p>
                                            <p className="text-sm font-[500] w-[10%] px-[15px] ">Credit</p>
                                            <p className="text-sm font-[500] w-[20%] px-[15px] ">Account Maintenanc Fee</p>
                                            <span className="text-sm font-[500] w-[10%] px-[15px] flex justify-center items-center ">
                                                { ind % 2 == 1 ? <button className="h-[32.5px] w-[100px] rounded-[3px]  text-white bg-amber-600 ">Pending</button> :
                                                <button className="h-[32.5px] w-[100px] rounded-[3px]  text-white bg-teal-700 ">Completed</button>}
                                            </span>
                                            <span className="text-sm font-[500] w-[10%] px-[15px] flex justify-end">
                                                <button className="h-[32.5px] w-[100px] rounded-[3px]  border border-slate-500 hover:border-blue-600 text-black hover:text-blue-600">view</button>
                                            </span>
                                        </span>
                                    )
                                })}
                            </div>
                        </div>

                    </div>

                    <span className="w-full h-[50px] flex flex-row items-center justify-between bg-white rounded-b-[3px] border-t border-gray-300 px-[15px] ">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className="text-md cursor-pointer" onClick={() => app_users_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className="text-md cursor-pointer" onClick={() => app_users_action('next')}>Next</p>
                        </span>
                        <span className="flex flex-row items-center justify-end gap-3 h-full">
                            <p className="text-md">Showing 1-15 of {(filtered_lead_box && filtered_lead_box.leads.length) || 0}</p>
                        </span>
                    </span>
                </div>

            </div>

        </div>
    )
}

export default User_Dashboard