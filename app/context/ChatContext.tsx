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

interface AdminProps {
    recent_projects: any[]; 
    total_no_of_assigned_projects:number; 
    total_project_cost:number; 
    total_amount_due:number; 
    total_amount_paid:number; 
    total_project:number; 
    pending_project:number; 
    total_project_due:number;                 
}

interface Props {
    forEach?(arg0: (data: any, ind: number) => void): unknown;
    filter?(arg0: (project: any) => any): unknown;
    map?(arg0: (data: any) => void): unknown;
    total_number_of_pages?: number; // Now optional and can be undefined
    total_number_of_projects?: number; // Now optional can be undefined
    no_of_assigned_project?: number;
    projects: any[];
    users: any
} 


interface TeamProps {
    forEach?(arg0: (data: any, ind: number) => void): unknown;
    filter?(arg0: (user: any) => any): unknown;
    map?(arg0: (data: any) => void): unknown;
    total_number_of_pages?: number; // Now optional and can be undefined
    total_number_of_users?: number; // Now optional can be undefined
    users: any;
}

interface TrashProps {
    forEach?(arg0: (data: any, ind: number) => void): unknown;
    filter?(arg0: (trash: any) => any): unknown;
    map?(arg0: (data: any) => void): unknown;
    total_number_of_pages?: number; // Now optional and can be undefined
    total_number_of_trash?: number; // Now optional can be undefined
    trash: any[];
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
    admin_dash: AdminProps | null;
    setAdmin_dash: (admin_dash: AdminProps | null)=>void;
    current_project_nav: string;
    setCurrent_project_nav: (current_project_nav: string) => void;
    task_action: string;
    setTask_action: (task_action: string) => void;
    selected_task: any;
    setSelected_task: (selected_task: any) => void;
    project_box: Props | null;
    setProject_box: (project_box: Props | null) => void;
    filtered_project_box: Props | null;
    setFiltered_project_box: (filtered_project_box: Props | null) => void;
    user_box: TeamProps | null;
    setUser_box: (user_box: TeamProps | null) => void;
    filtered_user_box: TeamProps | null;
    setFiltered_user_box: (filtered_user_box: TeamProps | null) => void;
    trash_box: TrashProps | null;
    setTrash_box: (trash_box: TrashProps | null) => void;
    filtered_trash_box: TrashProps | null;
    setFiltered_trash_box: (filtered_trash_box: TrashProps | null) => void;
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

    
    const [project, setProject] = useState(null)
    const [current_project_nav, setCurrent_project_nav] = useState('project_details')
    const [selected_payment, setSelected_payment] = useState(null)
    const [task_action, setTask_action] = useState('create-task')
    const [selected_task, setSelected_task] = useState(null)
    // for admin page
    const [admin_dash, setAdmin_dash] = useState<AdminProps | null>(null)

    // for project page
    const [project_box, setProject_box] = useState<Props | null>(null);
    const [filtered_project_box, setFiltered_project_box] = useState<Props | null>(null);
    // for team page
    const [user_box, setUser_box] = useState<TeamProps | null>(null);
    const [filtered_user_box, setFiltered_user_box] = useState<TeamProps | null>(null);
    // for trash page
    const [trash_box, setTrash_box] = useState<TrashProps | null>(null);
    const [filtered_trash_box, setFiltered_trash_box] = useState<TrashProps | null>(null);


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
            selected_payment, setSelected_payment, task_action, setTask_action, setSelected_task, selected_task, project_box, setProject_box, filtered_project_box, setFiltered_project_box, user_box, setUser_box, filtered_user_box, setFiltered_user_box, trash_box, setTrash_box, filtered_trash_box, setFiltered_trash_box
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
