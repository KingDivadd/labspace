'use client'
import React, {useState, useEffect} from 'react'
import Modal from '../component/modal'
import { useChat } from '../context/ChatContext'

const User_document_page = () => {
    const [page_number, setPage_number] = useState(1)
    const [lead_box, setLead_box] = useState<Leads_Props | null>(null);
    const [filtered_lead_box, setFiltered_lead_box] = useState<Leads_Props | null>(null);
    const [filters, setFilters] = useState({filter_input: '', disposition: ''})
    const {modalFor, setModalFor, selectedItem, setSelectedItem, showModal, setShowModal, setModalSource, modalSource} = useChat()

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


    function handle_new_loan() {
        setShowModal(!showModal)
        setModalFor('create')
        setModalSource('new-loan')
        
    }

    return (
        <div className='w-full flex items-start justify-center px-[75px] py-10 '  >
            <div className="w-full flex flex-col justify-start items-center gap-10">

                

                {/* section showing metrics */}
                <div className="w-full flex items-center justify-between gap-10">

                    <span className="flex item-center justif-start gap-10 ">

                        <span className="flex items-center jusitify-center gap-5">

                            <p className="text-md text-teal-700 text-center">Total Uploaded Documents</p>
                            <p className="text-2xl font-[600] text-teal-700">10</p>

                        </span>
                        <span className="flex items-center jusitify-center gap-5">

                            <p className="text-md text-amber-600 text-center">Pending Documents</p>
                            <p className="text-2xl font-[600] text-amber-600">2</p>

                        </span>

                    </span>

                    <div className=" flex items-center justify-end">
                        <button className="px-5 h-[45px] rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white">Upload Document</button>
                    </div>
                    
                </div>


                {/* section four recent transaction table */}
                <div className="w-full flex flex-col items-start justify-start shadow-lg  rounded-[3px] border border-slate-200">
                    <span className="h-[50px] w-full flex items-center justify-start px-[15px] border-b border-slate-300 ">
                        <p className="text-md font-[600] ">Documents</p>
                    </span>
                    
                    <span className="w-full flex items-center justify-end p-[15px] pb-0 ">

                        <span className="w-[250px] ">
                            <input type="text" placeholder='search' className='input-type-1 ' />
                        </span>

                    </span>

                    <div className="w-full p-[15px] flex flex-col items-start justify-start mx-auto ">
                        <span className="w-full h-[50px] flex items-center justify-between bg-blue-600 text-white rounded-[3px]">
                            <p className="text-sm font-[600] w-[30%] px-[15px] ">Document Name</p>
                            <p className="text-sm font-[600] w-[20%] px-[15px] ">Type</p>
                            <p className="text-sm font-[600] w-[15%] px-[15px] ">Upload Date</p>
                            <p className="text-sm font-[600] w-[15%] px-[15px] ">Status</p>
                            <p className="text-sm font-[600] w-[20%] px-[15px] ">Action</p>
                        </span>

                        <div className="w-full h-[500px] flex flex-col items-start justify-start overflow-y-auto">
                            <div className="w-full h-full flex flex-col justify-start">
                                {[1,2,3,4,5,6,7,8,9,0].map((data, ind)=>{
                                    return(
                                        <span key={ind} className="table-body-row-1  ">
                                            <p className="text-sm font-[500] w-[30%] px-[15px] ">Loan Agreement</p>
                                            <p className="text-sm font-[500] w-[20%] px-[15px] ">Loan Agreement</p>
                                            <p className="text-sm font-[500] w-[15%] px-[15px] flex-wrap text-start">22 November, 2024</p>
                                            <p className="text-sm font-[500] w-[15%] px-[15px] text-teal-700">uploaded</p>
                                            <span className="flex items-center justify-between w-[20%] px-[15px] ">
                                                <p className="text-sm text-teal-700 hover:underline cursor-pointer text-center ">view</p>
                                                <p className="text-sm text-amber-600 hover:underline cursor-pointer text-center ">replace</p>
                                                <p className="text-sm text-blue-700 hover:underline cursor-pointer text-center ">download</p>
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

            {showModal && <Modal showModal={showModal} setShowModal={setShowModal} modalFor={modalFor} setModalFor={setModalFor} selectedItem={selectedItem} setSelectedItem={setSelectedItem} modalSource={modalSource} setModalSource={setModalSource} />}
        </div>
    )
}

export default User_document_page