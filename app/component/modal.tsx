'use client'
import React, { useState, useEffect } from 'react'

import Alert from "./helper"


interface Modal_props {
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedItem: any;
    setSelectedItem: (selectedItem: any) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;
    modalSource: string;
    setModalSource: (modalSource: string) => void;
}

const Modal = ({ showModal, setShowModal, selectedItem, setSelectedItem, modalFor, setModalFor, modalSource}: Modal_props) => {
    const [alert, setAlert] = useState({type: '', message: ''})
    
    const [dropMenus, setDropMenus] = useState<{ [key: string]: boolean }>({
        disposition: false
    });
    const [dropElements, setDropElements] = useState({
        disposition: 'Disposition'

    })

    const handleDropMenu = (dropdown: any) => {
        const updatedDropMenus = Object.keys(dropMenus).reduce((acc, key) => {
            acc[key] = key === dropdown ? !dropMenus[key] : false;
            return acc;
        }, {} as { [key: string]: boolean });
        setDropMenus(updatedDropMenus);
        setDropElements({...dropElements, [dropdown]: 'Disposition'});

    };

    const handleSelectDropdown = (dropdown: any, title:any)=>{
        setDropElements({...dropElements, [title]: dropdown}); setDropMenus({...dropMenus, [title]: false})
    }

    function handleCloseModal() {
        setSelectedItem(null)
        setShowModal(false)
        setModalFor('')
    }



    return (
        <div className="fixed z-30 inset-0 overflow-y-auto" id="modal">
            <div className="relative flex items-center justify-center min-h-screen">
                <span className="w-1/2 flex items-center justify-end absolute top-[10px] right-[10px] z-10 ">
                    {alert.message && <Alert message={alert.message} type={alert.type} />}
                </span>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className="w-full h-screen flex items-center justify-center overflow-hidden shadow-xl transform transition-all" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={"h-auto w-auto mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-auto flex flex-col items-start justify-start gap-5  ">
                            <div className="w-full flex flex-col items-start justify-start   ">

                                <div className=" bg-white max-h-[90vh] w-[65vw] rounded-[5px] shadow-md border border-slate-200  overflow-y-auto " >
                                    <span className="w-full px-[25px] h-[60px] border-b border-slate-300 flex items-center justify-start ">
                                        <p className="text-lg font-[600] ">Loan Application</p>
                                    </span>

                                    <div className="w-full flex flex-col items-start justify-start gap-10 p-[25px]">
                                        <div className="w-full flex items-center justify-between gap-10">
                                            <span className="w-1/2 flex flex-col items-start justify-start gap-2">
                                                <p className="text-sm font-[500]">Loan Product</p>
                                                <input type="text" className='input-type-1' />
                                            </span>

                                            <span className="w-1/2 flex flex-col items-start justify-start gap-2">
                                                <p className="text-sm font-[500]">Currency</p>
                                                <input type="text" className='input-type-1' />
                                            </span>
                                        </div>

                                        <div className="w-full flex items-center justify-between gap-10">
                                            <span className="w-1/2 flex flex-col items-start justify-start gap-2">
                                                <p className="text-sm font-[500]">First Paymnt Date</p>
                                                <input type="text" className='input-type-1' />
                                            </span>

                                            <span className="w-1/2 flex flex-col items-start justify-start gap-2">
                                                <p className="text-sm font-[500]">Applied Amount</p>
                                                <input type="text" className='input-type-1' />
                                            </span>
                                        </div>

                                        <div className="w-full flex items-center justify-between gap-10">
                                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                                <p className="text-sm font-[500]">Purpose of Loan</p>
                                                <textarea name="" id="" className='text-area-input-1' ></textarea>
                                            </span>

                                        </div>

                                        <div className="w-full flex items-center justify-between gap-10">
                                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                                <p className="text-sm font-[500]">Fee Deduction Account</p>
                                                <input type="text" className='input-type-1' />
                                            </span>
                                        </div>

                                        <div className="w-full flex items-center justify-between gap-10">
                                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                                <p className="text-sm font-[500]">Attachment</p>
                                                <input type="text" className='input-type-1' />
                                            </span>
                                        </div>

                                        <div className="w-full flex items-center justify-between gap-10">
                                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                                <p className="text-sm font-[500]">Description</p>
                                                <textarea name="" id="" className='text-area-input-1' ></textarea>
                                            </span>

                                        </div>
                                        <div className="w-full flex items-center justify-between gap-10">
                                            <span className="w-full flex flex-col items-start justify-start gap-2">
                                                <p className="text-sm font-[500]">Remark</p>
                                                <textarea name="" id="" className='text-area-input-1' ></textarea>
                                            </span>

                                        </div>

                                        <span className="w-full flex items-center justify-end">
                                            <button className=" h-[45px] rounded-[3px] px-5  bg-blue-600 hover:bg-blue-700 text-white">Submit Application</button>
                                        </span>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal
