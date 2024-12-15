'use client'
import React, {useState, useEffect} from "react";
import { useChat } from "../context/ChatContext";
import { formatted_time } from "./helper";

interface NotificationProps {
    fetchedData: {
        created_at: string;
        notification: {
            notification_id: string;
            status: string;
            notification_type: string;
            notification_sub_type: string;
            is_read: boolean;
            task_id: string;
            task:any;
            created_at: string;
            updated_at: string;
        };
        notificationAssignment_id: string;
        notification_id: string;
        updated_at: string;
        user_id: string;
    };
}

const NotificationComponent: React.FC<NotificationProps> = ({ fetchedData }) => {
    const {loggedInUser,  route_nav, setRoute_nav, setShowNotification } = useChat()
    const { notification, user_id } = fetchedData;
    const { notification_sub_type, notification_type } = notification;
    const [notification_info, setNotification_info] = useState({title:'', notificationAssignment_id: ''})

    // Check conditions
    const is_user_match = loggedInUser.user_id === user_id;
    const is_task_creation = notification_sub_type === "task_creation" && notification_type === "task";
    
    useEffect(() => {
        const {created_at, updated_at, notificationAssignment_id, notification_id, user_id, notification,   } = fetchedData
        const {status, notification_sub_type, notification_type, task, } = notification

        const is_user_match = loggedInUser.user_id === user_id;
        const is_task_creation = notification_sub_type === "task_creation" && notification_type === "task";
        const display_title = (is_user_match  && is_task_creation) ? 'New Task Created':''
        setNotification_info({...notification_info, title: display_title})
        // const description = is_user_match ? `Task with ${task? task.priority : 'selected'} Priority has been created. Current stage: ${task ? (task.stage == 'todo' ? 'Todo' : task.stage == 'in_progress'? 'In Progress': 'Completed' ): 'Todo'} and ${team? team.length: 1} Team members assigned.`:``

    }, [])

    function handle_notification_navigation() {
        setRoute_nav('notification');
        setShowNotification(false)
    }

    return (
        <div className="w-full h-full ">
        {is_user_match && is_task_creation ? (
            <div className="w-full flex flex-col items-start justify-start " onClick={handle_notification_navigation}>
                <span className=" w-full flex items-start">
                    <p className="text-md font-[500]">{notification_info.title}</p>
                </span>
                <span className=" w-full flex items-center justify-between">
                    <p className="text-sm text-slate-600 h-full hover:underline cursor-pointer">view more</p>
                    <p className="text-sm text-slate-600">
                        {formatted_time(Number(notification.created_at))}
                    </p>
                </span>
                {/* <p className="text-gray-600">Task ID: {notification.task ? notification.task.task_ind : ''}</p>
                <p className="text-gray-600">Status: {notification.status}</p> */}
            </div>
        ) : (
            <div className="no-notifications text-gray-500">No relevant notifications</div>
        )}
        </div>
    );
};

export default NotificationComponent;
