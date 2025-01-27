'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileToggle {
    two_fa: boolean,
    email_auth: boolean,
    sms_auth: boolean,
    web_push: boolean
}

interface UserData {
    user_id: string, first_name: string, last_name: string, email: string, avatar: string, is_admin: boolean, is_active: boolean, role: string, title: string, 
}

interface NotificationProp {
    number_of_unread_notification: number; unread_notifications: any
}

interface AdminDashProps {
    recent_notification:any, recent_projects:any, recent_users:any, recent_payments:any,
    total_no_of_projects:number, total_project_cost:number,
    total_no_of_completed_projects:number, total_no_of_assigned_projects:number                     
}

interface ChatContextType {
    header_nav: string; 
    setHeader_nav: (header_nav: string) => void; 
    pricing_plan: string; 
    setPricing_plan: (pricing_plan: string) => void; 
    route_nav: string; 
    setRoute_nav: (route_nav: string) => void; 
    close_welcome_nav: boolean; 
    setClose_welcome_nav: (close_welcome_nav: boolean) => void; 
    trigger_notification: boolean; 
    setTrigger_notification: (trigger_notification: boolean) => void; 
    showNotification: boolean;
    setShowNotification: (showNotification: boolean) => void;
    user_role: string; 
    setUser_role: (user_role: string) => void; 
    showModal: boolean;
    setShowModal: (showModal:boolean ) => void;
    selectedItem: any;
    setSelectedItem: (selectedItem: any) => void;
    selected_payment: any;
    setSelected_payment: (selected_payment: any) => void;
    notification: NotificationProp;
    setNotification: (notification: NotificationProp) => void;
    modalFor: string;
    setModalFor: (modalFor: string) => void;
    modalSource: string;
    setModalSource: (modalSource: string) => void;
    profileToggle: ProfileToggle;
    setProfileToggle: (profileToggle: ProfileToggle) => void
    loggedInUser: UserData;
    setLoggedInUser: (loggedInUser: UserData) => void;
    loadingDot: boolean;
    setLoadingDot: (loadingDot: boolean) => void;
    app_users: any;
    setApp_users: (app_users: any) => void;
    project: any;
    setProject: (project: any) => void;
    admin_dash: AdminDashProps;
    setAdmin_dash: (admin_dash: AdminDashProps)=>void;
    current_project_nav: string;
    setCurrent_project_nav: (current_project_nav: string) => void;
}


// Provide a default value matching the shape of ChatContextType
const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [header_nav, setHeader_nav] = useState('home')
    const [pricing_plan, setPricing_plan] = useState('')
    const [route_nav, setRoute_nav] = useState('')
    const [close_welcome_nav, setClose_welcome_nav] = useState(false)
    const [user_role, setUser_role] = useState('')
    const [trigger_notification, setTrigger_notification] = useState(false)
    const [showNotification, setShowNotification] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [modalFor, setModalFor] = useState('')
    const [modalSource, setModalSource] = useState('')
    const [profileToggle, setProfileToggle] = useState({two_fa: false, email_auth: true, sms_auth: true, web_push: false })
    const [loggedInUser, setLoggedInUser] = useState({user_id: '', first_name: '', last_name: '', email: '', avatar: '', is_admin: false, is_active: true, role: '', title: '',})
    const [loadingDot, setLoadingDot] = useState(true)
    const [app_users, setApp_users] = useState(null)
    const [notification, setNotification] = useState({number_of_unread_notification:0, unread_notifications:null})
    const [admin_dash, setAdmin_dash] = useState({recent_notification:null, recent_projects:null, recent_users:null, recent_payments:null, total_no_of_assigned_projects:0, total_no_of_completed_projects:0, total_no_of_projects:0, total_project_cost:0})
    const [project, setProject] = useState(null)
    const [current_project_nav, setCurrent_project_nav] = useState('project_details')
    const [selected_payment, setSelected_payment] = useState(null)


    return (
        <ChatContext.Provider value={{
            header_nav, setHeader_nav, 
            pricing_plan, setPricing_plan,
            route_nav, setRoute_nav,
            close_welcome_nav, setClose_welcome_nav,
            user_role, setUser_role,
            trigger_notification, setTrigger_notification, showNotification, setShowNotification,
            showModal, setShowModal, selectedItem, setSelectedItem, modalFor, setModalFor, modalSource, setModalSource,
            profileToggle, setProfileToggle,
            loggedInUser, setLoggedInUser, loadingDot, setLoadingDot, app_users, setApp_users, notification,  setNotification,
            admin_dash, setAdmin_dash, project, setProject, current_project_nav, setCurrent_project_nav,
            selected_payment, setSelected_payment, 
            }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
