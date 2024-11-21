import React, { useState, useEffect } from 'react'
import { useChat } from '../context/ChatContext';

interface AlertProps {
    message: string;
    type: string;
}

const Alert = ({ message, type }:AlertProps) => {
    const alertStyles:any = {
        success: "bg-green-100 border border-green-400 text-green-700 text-[15.5px]",
        error: "bg-red-100 border border-red-400 text-red-700 text-[15.5px]",
        warning: "bg-yellow-100 border border-yellow-400 text-yellow-700 text-[15.5px]",
    };
    return (
        <div className={`${alertStyles[type]} px-4 py-3 rounded-[3px] relative`} role="alert">
            <span className="block sm:inline">{message}</span>
        </div>
    );
};

export default Alert


export const convert_to_unix = (dateString?: string) => {
const date = dateString ? new Date(dateString) : new Date(); // Default to today's date if no dateString is provided
return Math.floor(date.getTime() / 1000); // Convert to Unix timestamp (seconds)
}


export const get_todays_date = ()=> {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return Math.floor(startOfDay.getTime() / 1000);
}

export function readable_date_time(timestamp:number) {
    // Ensure the timestamp is a number
    if (typeof timestamp !== 'number' || isNaN(timestamp)) {
    throw new Error('Invalid timestamp');
    }

    // Create a Date object using the timestamp
    const date = new Date(Number(timestamp));

    // Check if the Date is valid
    if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
    }

    // Extract the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');

    // Extract time components
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // Determine AM/PM and adjust hours
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 hour to 12

    // Construct the final string
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
    
    
    return formattedDate;
}

export function readable_day(timestamp:number) {
    // Ensure the timestamp is a number
    if (typeof timestamp !== 'number' || isNaN(timestamp)) {
    throw new Error('Invalid timestamp');
    }

    // Create a Date object using the timestamp
    const date = new Date(Number(timestamp));

    // Check if the Date is valid
    if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
    }

    // Extract the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');

    // Extract time components
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // Determine AM/PM and adjust hours
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 hour to 12

    // Construct the final string
    const formattedDate = `${year}-${month}-${day} `;
    
    
    return formattedDate;
}


export function get_current_time() {
    const now = new Date();

    // Extract date components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    // Extract time components
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    // Determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert 24-hour time to 12-hour time
    hours = hours % 12;
    hours = hours ? hours : 12; // Adjust midnight (0 hours) to 12 AM
    const formattedHours = String(hours).padStart(2, '0');

    // Format time as YYYY-MM-DD HH:MM AM/PM
    const formattedTime = `${year}-${month}-${day} ${formattedHours}:${minutes} ${ampm}`;
    
    return formattedTime;
}

export const Show_current_date_time: React.FC = () => {
    const [currentDateTime, setCurrentDateTime] = useState<string>('');

    useEffect(() => {
    const formatDate = (date: Date) => {
        const options:any = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString('en-US', options).replace(',', '');
    };

    const updateDateTime = () => {
        const now = new Date();
        setCurrentDateTime(formatDate(now));
    };

    updateDateTime(); // Set the initial date-time
    const interval = setInterval(updateDateTime, 60 * 1000); // Update every minute

    return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return <div>{currentDateTime}</div>;
};