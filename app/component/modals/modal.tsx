'use client'
import React, { useState, useEffect } from 'react'
import Alert from "../helper"
import User_modal from "../modals/user_modal"
import Task_modal from "../modals/task_modal"
import Trash_modal from "../modals/trash_modal"
import Notification_modal from "../modals/notification_modal"
import Payment_modal from "../modals/payment_modal"
import Profile_modal from "../modals/profile_modal"


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
    
    function handleCloseModal() {
        setSelectedItem(null)
        setShowModal(false)
        setModalFor('')
    }



    return (
        <div className="fixed z-30 inset-0 overflow-y-auto" id="modal">
            <div className=" flex items-center justify-center min-h-screen">
                
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
                </div>
                <div className="w-full h-screen flex items-center max-sm:items-start justify-center overflow-hidden shadow-xl transform transition-all" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={handleCloseModal}>

                    <div className={"h-auto w-auto mx-auto shadow-xl flex items-start "}>
                        {/* the container for the input fields */}
                        <div onClick={(e) => e.stopPropagation()} className="w-auto flex flex-col items-start justify-start gap-5  ">
                            <div className="w-full flex flex-col items-start justify-start  ">

                                {modalSource  == 'user-modal' && <User_modal />}
                                {modalSource  == 'profile-modal' && <Profile_modal />}
                                {modalSource  == 'task-modal' && <Task_modal />}    
                                {modalSource  == 'notification' && <Notification_modal />}    
                                {modalSource  == 'trash-modal' && <Trash_modal />}    
                                {modalSource  == 'payment' && <Payment_modal />}    

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal
