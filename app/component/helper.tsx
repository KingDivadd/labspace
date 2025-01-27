import React, { useState, useEffect, useRef } from 'react'
import { useChat } from '../context/ChatContext';
import { BiMessageAltDetail } from "react-icons/bi";
import { MdAttachFile } from "react-icons/md";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { FaCaretUp, FaCaretDown, FaDownload, FaEye } from "react-icons/fa6";
import { FaCamera, FaTimes, FaTrashAlt } from "react-icons/fa";
import axios from 'axios';
import Loading from './loading';
import moment from 'moment';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { patch_auth_request } from '../api';


export const formatted_time = (time:number)=>{
    const formattedTime = moment(Number(time)).calendar(null, {
        sameDay: '[Today at] HH:mm', // For the same day
        nextDay: '[Tomorrow at] HH:mm', // For the next day
        nextWeek: 'dddd [at] HH:mm', // For next week
        lastDay: '[Yesterday at] HH:mm', // For the previous day
        lastWeek: '[Last] dddd [at] HH:mm', // For last week
        sameElse: 'MMMM D, YYYY' // For everything else
    });

    return formattedTime;
}

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

export function readable_date(timestamp: number) {
    // Ensure the timestamp is a number
    if (typeof timestamp !== 'number' || isNaN(timestamp)) {
        throw new Error('Invalid timestamp');
    }

    // Create a Date object using the Unix timestamp (in seconds)
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

    // Check if the Date is valid
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    // Extract the date components
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' }); // Get full month name
    const day = date.getDate();

    // Construct the final string
    const formattedDate = `${day} ${month}, ${year}`;
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

export function getInitials(fullName: string) {
    const names = fullName.split(" ");

    const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

    const initialsStr = initials.join("");

    return initialsStr;
}

interface AvatarProp {
    user: any;
    isActive: boolean;
    toggleActive: any;

}

export const Avatar = ({ user, isActive, toggleActive }: AvatarProp) => {
    const { first_name = '', last_name = '', avatar } = user;

    // Generate initials
    const initials = `${first_name.charAt(0)}${last_name.charAt(0)}`.toUpperCase();

    return (
        <div className="relative inline-block">
            {/* Avatar Circle */}
            <div
                className={`w-[45px] h-[45px] flex items-center justify-center rounded-full ${
                    avatar ? '' : 'bg-blue-500 text-white font-[400]'
                }`}
                style={{
                    backgroundImage: avatar ? `url(${avatar})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {!avatar && <span className="text-md font-semibold">{initials}</span>}
            </div>

            {/* Green Dot */}
            <span
                className={`absolute top-0 right-0 w-[13.5px] h-[13.5px] rounded-full border-2 border-white ${
                    isActive ? 'bg-green-500' : 'bg-gray-300'
                } cursor-pointer`}
                title={isActive ? 'Active' : 'Suspended'}
            ></span>
        </div>
    );
};

export const SmallAvatar = ({ user, isActive, toggleActive }: AvatarProp) => {
    const { first_name = '', last_name = '', avatar } = user;

    // Generate initials
    const initials = `${first_name.charAt(0)}${last_name.charAt(0)}`.toUpperCase();

    return (
        <div className="relative inline-block">
            {/* Avatar Circle */}
            <div
                className={`w-[37.5px] h-[37.5px] flex items-center justify-center rounded-full ${
                    avatar ? '' : 'bg-blue-500 text-white  font-[400]'
                }`}
                style={{
                    backgroundImage: avatar ? `url(${avatar})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {!avatar && <span className="text-sm font-semibold">{initials}</span>}
            </div>

            {/* Green Dot */}
            <span
                className={`absolute top-0 right-0 w-[10.5px] h-[10.5px] rounded-full border-2 border-white ${
                    isActive ? 'bg-green-500' : 'bg-gray-300'
                } cursor-pointer`}
                title={isActive ? 'Active' : 'Suspended'}
            ></span>
        </div>
    );
};



export const AvatarUserInfo = ({ data }: { 
    data: { 
        first_name: string; 
        last_name: string; 
        title: string; 
        email: string; 
        is_active: boolean; 
        is_admin: boolean; 
        avatar: string | null; 
    }; 
}) => {
    const { first_name, last_name, email, is_active, is_admin, avatar, title } = data;

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Generate initials
    const initials = `${first_name.charAt(0)}${last_name.charAt(0)}`.toUpperCase();

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative " ref={dropdownRef}>
            {/* Avatar Circle */}
            <div
                onClick={toggleDropdown}
                className={`w-[37.5px] h-[37.5px] flex items-center justify-center rounded-full cursor-pointer border border-white ${
                    avatar ? '' : 'bg-blue-500 text-white font-[400]'
                }`}
                style={{
                    backgroundImage: avatar ? `url(${avatar})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {!avatar && <span className="text-sm font-semibold">{initials}</span>}
                {/* Green Dot on Avatar */}
                {/* <span
                    className={`absolute top-0 right-0 w-[10.5px] h-[10.5px] rounded-full border-2 border-white ${
                        is_active ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    title={is_active ? 'Active' : 'Suspended'}
                ></span> */}
            </div>

            {/* Dropdown / Card */}
            {isDropdownOpen && (
                <div
                    className="absolute top-[110%] left-0 min-w-[300px] bg-white shadow-md rounded-[5px] border border-slate-200 z-10 p-4"
                >
                    <div className="flex items-center gap-3">
                        {/* Avatar in Dropdown */}
                        <div className="relative">
                            <div
                                className={`w-[50px] h-[50px] rounded-full ${
                                    avatar ? '' : 'bg-blue-500 text-white flex items-center justify-center'
                                }`}
                                style={{
                                    backgroundImage: avatar ? `url(${avatar})` : undefined,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                {!avatar && <span className="text-sm font-semibold">{initials}</span>}
                            </div>
                            {/* Green Dot on Dropdown Avatar */}
                            <span
                                className={`absolute top-0 right-[2.5px] w-[10.5px] h-[10.5px] rounded-full border-2 border-white ${
                                    is_active ? 'bg-green-500' : 'bg-gray-300'
                                }`}
                                title={is_active ? 'Active' : 'Suspended'}
                            ></span>
                        </div>

                        {/* User Info */}
                        <div className="flex flex-col gap-[3px]">
                            <span className="flex items-center justify-between gap-2">
                                <h4 className="text-md text-slate-600 font-[600] whitespace-nowrap">{`${first_name} ${last_name}`}</h4>
                                {is_admin && <p className="text-sm text-slate-600 font-[500]">(Admin)</p>}
                            </span>
                            <p className="text-sm text-slate-600 font-[500] whitespace-nowrap">{email}</p>
                            <p className="text-sm text-slate-600 font-[500]">{title}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const UserInfo = ({ data }: { 
    data: { 
        first_name: string; 
        last_name: string; 
        title: string; 
        email: string; 
        is_active: boolean; 
        is_admin: boolean; 
        avatar: string | null; 
    }; 
}) => {
    const { first_name, last_name, email, is_active, is_admin, avatar, title } = data;

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Generate initials
    const initials = `${first_name.charAt(0)}${last_name.charAt(0)}`.toUpperCase();


    return (
        <div className="relative inline-block w-full" >
            {/* Avatar Circle */}
            <div className=" w-full rounded-[2.5px] border border-slate-200 px-5 py-2" >
                <div className="flex items-center gap-3">
                    {/* Avatar in Dropdown */}
                    <div className="relative">
                        <div
                            className={`w-[40px] h-[40px] rounded-full ${
                                avatar ? '' : 'bg-blue-500 text-white flex items-center justify-center'
                            }`}
                            style={{
                                backgroundImage: avatar ? `url(${avatar})` : undefined,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            {!avatar && <span className="text-sm font-semibold">{initials}</span>}
                        </div>
                        {/* Green Dot on Dropdown Avatar */}
                        <span
                            className={`absolute top-0 right-[2.5px] w-[10.5px] h-[10.5px] rounded-full border-2 border-white ${
                                is_active ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                            title={is_active ? 'Active' : 'Suspended'}
                        ></span>
                    </div>

                    {/* User Info */}
                    <div className=" flex flex-col gap-[3px]">
                        <span className="flex items-center justify-between gap-2">
                            <h4 className="text-md text-slate-600 font-[600] whitespace-nowrap">{`${first_name} ${last_name}`}</h4>
                            {is_admin && <p className="text-sm text-slate-600 font-[500]">(Admin)</p>}
                        </span>
                        <p className="text-sm text-slate-600 font-[500]">{title}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

interface AssetContProps {
    activities?: number;
    assets?: number;
    sub_tasks?: number;
}

export const AssetCont  = ({activities, assets, sub_tasks}:AssetContProps) => {

    return(
        <div className="flex items-center  justify-start gap-[10px] ">
            <span className="flex items-center gap-[3px]"> 
                <span className="h-[20px] w-[20px] "><BiMessageAltDetail size={'100%'} className={'text-slate-600'} /> </span> 
                <p className="text-sm text-slate-600 ">{activities || 0}</p>
            </span>
            <span className="flex items-center gap-[3px] "> 
                <span className="h-[20px] w-[20px] "><MdAttachFile size={'100%'} className={'text-slate-600'} /> </span> 
                <p className="text-sm text-slate-600 ">{assets || 0}</p>
            </span>
            
        </div>
    )
}

// ---------------DROPDOWN PROPS------------------

interface DropdownProps {
    id?: string; // Optional identifier for the dropdown
    options: string[];
    placeholder?: string;
    onSelect?: (selected: string, id?: string) => void; // Includes the id in the callback
}

export const Dropdown: React.FC<DropdownProps> = ({ id, options, placeholder = "Select an option", onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
        onSelect(option, id); // Passes id along with the selected option
    }
    };

    const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
    }
    };

    useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
    }, []);

    return (
    <div className="relative w-full" ref={dropdownRef}>
        <button
        className="w-full bg-white border border-slate-400 rounded-[3px] shadow-sm px-[10px] h-[40px] text-left text-sm focus:ring-blue-500"
        onClick={toggleDropdown}
        >
        {selectedOption || placeholder}
        <span className="float-right h-[20px] w-[20px] text-slate-700">
            {isOpen ? <FaCaretUp size="100%" /> : <FaCaretDown size="100%" />}
        </span>
        </button>
        {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white  rounded-[3px] shadow-md bg-white">
            {options.map((option) => (
            <li
                key={option}
                onClick={() => handleSelect(option)}
                className="px-[10px] h-[40px] flex items-center text-sm text-slate-700 hover:bg-blue-500 hover:text-white cursor-pointer"
            >
                {option}
            </li>
            ))}
        </ul>
        )}
    </div>
    );
};

export const Dropdownlg: React.FC<DropdownProps> = ({ id, options, placeholder = "Select an option", onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
        onSelect(option, id); // Passes id along with the selected option
    }
    };

    const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
    }
    };

    useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
    }, []);

    return (
    <div className="relative w-full" ref={dropdownRef}>
        <button
        className="w-full bg-white border border-slate-400 rounded-[3px] shadow-sm px-[10px] h-[45px] text-left text-sm focus:ring-blue-500"
        onClick={toggleDropdown}
        >
        {selectedOption || placeholder}
        <span className="float-right h-[20px] w-[20px] text-slate-700">
            {isOpen ? <FaCaretUp size="100%" /> : <FaCaretDown size="100%" />}
        </span>
        </button>
        {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white  rounded-[3px] shadow-md bg-white">
            {options.map((option) => (
            <li
                key={option}
                onClick={() => handleSelect(option)}
                className="px-[10px] h-[40px] flex items-center text-sm text-slate-700 hover:bg-blue-500 hover:text-white cursor-pointer"
            >
                {option}
            </li>
            ))}
        </ul>
        )}
    </div>
    );
};



// ---------------upload components----------------

interface FileUploadProps {
    id: string;
    maxFiles?: number;
    onFileChange?: (files: { name: string; url: string }[], id: string) => void;
    initialFiles?: { name: string; url: string }[]; // New optional prop
}

export const FileUpload: React.FC<FileUploadProps> = ({ id, maxFiles = 5, onFileChange, initialFiles = [] }) => {
    const [files, setFiles] = useState<{ name: string; url: string }[]>([]); // Initialize as empty array
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        // Sync initialFiles with the files state when the component mounts or initialFiles changes
        setFiles(initialFiles);
    }, [initialFiles]);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files);

            if (files.length + selectedFiles.length > maxFiles) {
                alert(`You can only upload up to ${maxFiles} files.`);
                return;
            }

            setIsUploading(true);

            const uploadedFiles: { name: string; url: string }[] = [];
            for (const file of selectedFiles) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'crm_images'); // Replace with your Cloudinary upload preset

                try {
                    const response = await axios.post(
                        'https://api.cloudinary.com/v1_1/iroegbu-cloud-1/image/upload',
                        formData
                    );
                    uploadedFiles.push({ name: file.name, url: response.data.secure_url });
                } catch (error) {
                    console.error('Error uploading file:', error);
                    alert(`Failed to upload ${file.name}.`);
                }
            }

            // Update the file list state
            const updatedFiles = [...files, ...uploadedFiles];
            setFiles(updatedFiles);

            // Pass the full file array to `onFileChange`
            if (onFileChange) {
                onFileChange(updatedFiles, id);
            }

            setIsUploading(false);
        }
    };

    const removeFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);

        // Pass the updated file array to `onFileChange`
        if (onFileChange) {
            onFileChange(updatedFiles, id);
        }
    };

    return (
        <div className="w-full flex items-center justify-end">
            <span className="flex-1 h-[45px] border border-slate-400 rounded-l-[3px] flex items-center gap-2 overflow-x-auto px-2">
                {files.map((file, index) => (
                    <span
                        key={index}
                        className="flex items-center gap-2 bg-gray-200 rounded-[3px] px-2 py-1 text-xs text-slate-700 whitespace-nowrap"
                    >
                        {file.name}
                        <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeFile(index)}
                        >
                            <FaTimes size={12} />
                        </button>
                    </span>
                ))}
                {isUploading && (
                    <span className="h-full flex items-center pt-[3px]">
                        <Loading />
                    </span>
                )}
            </span>
            <label className="w-[95px] rounded-r-[3px] h-[45px] bg-blue-500 hover:bg-blue-600 text-white text-sm flex items-center justify-center cursor-pointer">
                Browse
                <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileSelect}
                    disabled={isUploading}
                />
            </label>
        </div>
    );
};



interface FileDisplayProps {
    file: { name: string; url: string }; // Single file object
    onRemoveFile?: () => void; // Optional callback to remove the file
}

export const FileDisplay: React.FC<FileDisplayProps> = ({ file, onRemoveFile }) => {
    const isImage = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file.name);
    const isVideo = /\.(mp4|webm|ogg)$/i.test(file.name);
    const isPDF = /\.pdf$/i.test(file.name);

    const handle_preview = () => {
        window.open(file.url, '_blank');
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center rounded gap-[15px]">
            <div className="w-full text-center ">
                <h2 className="text-sm font-semibold text-slate-700 text-start">{file.name}</h2>
            </div>
            <div className="w-full h-full flex items-center justify-center bg-white border rounded shadow  " onClick={handle_preview}  >
                {isImage && (
                    <img
                        onClick={handle_preview}
                        src={file.url}
                        alt={file.name}
                        className="max-w-full max-h-full object-contain cursor-pointer"
                    />
                )}
                {isVideo && (
                    <video
                        onClick={handle_preview}
                        controls
                        src={file.url}
                        className="max-w-full max-h-full object-contain cursor-pointer"
                    />
                )}
                {isPDF && (
                    <iframe
                        onClick={handle_preview}
                        src={file.url}
                        title={file.name}
                        className="max-w-full max-h-full object-contain cursor-pointer"
                    />
                )}
                {!isImage && !isVideo && !isPDF && (
                    <div className="text-red-500 text-center">
                        <p>Preview not supported for this file type.</p>
                    </div>
                )}
            </div>
            <div className="w-full  flex items-center gap-4">
                
                {onRemoveFile && (
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={onRemoveFile}
                    >
                        Remove
                    </button>
                )}
            </div>
        </div>
    );
};


interface ImageUploadProps {
    id: string;
    onImageChange?: (file: { name: string; url: string } | null, id: string) => void;
    initialImage?: string; // Default URL for the placeholder image
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ id, onImageChange, initialImage }) => {
    const [image, setImage] = useState<{ name: string; url: string } | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        // Set initial image when the component mounts or `initialImage` changes
        if (initialImage) {
            setImage({ name: 'Default', url: initialImage });
        }
    }, [initialImage]);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type (image only)
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file.');
            return;
        }

        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'crm_images'); // Replace with your Cloudinary upload preset

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/iroegbu-cloud-1/image/upload',
                formData
            );
            const uploadedImage = { name: file.name, url: response.data.secure_url };
            setImage(uploadedImage);

            // Pass the uploaded image data to the parent
            if (onImageChange) {
                onImageChange(uploadedImage, id);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload the image.');
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = () => {
        setImage(null);

        // Pass null to the parent to indicate removal
        if (onImageChange) {
            onImageChange(null, id);
        }
    };

    return (
        <div
            className="relative w-full h-full flex items-center justify-center bg-gray-100 border-gray-300 rounded-[3px] cursor-pointer"
            onClick={() => document.getElementById(`file-input-${id}`)?.click()}
        >
            {image ? (
                <div className="relative w-full h-full">
                    <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover rounded-[3px]"
                    />
                    
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                    <FaCamera size={40} />
                    <p className="text-sm">Click to upload</p>
                </div>
            )}

            <input
                id={`file-input-${id}`}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={isUploading}
            />
        </div>
    );
};


// Project dropdown action section

interface ProjectActBtnInt {
    data: any;
    
}

export const TaskActionBtn:React.FC<ProjectActBtnInt> = ({data})=> {
    const [dropList, setDropList] = useState(false);
    const {setModalFor, setModalSource, setSelectedItem, setShowModal, showModal, setCurrent_project_nav, selectedItem} = useChat()
    const dropdownRef = useRef<HTMLDivElement>(null);

    async function handle_complete_task(data:any){
        try {
                
            const response = await patch_auth_request(`app/complete-task/${data.task_id}/${data.project_id}`, {})                
            console.log(response)
            if (response.status == 200 || response.status == 201){
                console.log(response.data)
                setDropList(!dropList)

            }
            else{
            }
        } catch (err:any) {
            console.error('Network or unexpected error:', err);
            // showAlert('An unexpected error occurred. Please try again later.', 'error');
        }
    }

    function handle_action(type: string){
        setDropList(false)
        if (type == 'edit'){
            setShowModal(!showModal)
            setModalFor('view')
            setModalSource('project-modal')
            setSelectedItem(data)
        }
        else if (type == 'completed'){
            console.log(data)
            handle_complete_task(data)
        }
        
    }

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropList(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className=" w-full relative flex item-center justify-end " ref={dropdownRef}>
            <span className="h-[17px] w-[17px] cursor-pointer text-slate-500 flex justify-end items-center " onClick={()=> setDropList(!dropList)}>
                <HiOutlineDotsVertical size={'100%'} />
            </span>

            {dropList && <div className="absolute right-[0px] top-[20px] z-10 bg-white w-[145px] h-auto rounded-[3px] shadow-md border border-slate-100 p-[10px] flex flex-col items-start gap-3 ">
                <p className="projct-action-list" onClick={()=> handle_action('edit')} >Edit</p>
                <p className="projct-action-list" onClick={()=> handle_action('completed')} >Completedd</p>
                <p className="projct-action-list" onClick={()=> handle_action('delete')} >Delete</p>
            </div>}
        </div>
    )
}

interface ProjectActBtnInt {
    data: any;
    
}

export const ProjectActionBtn:React.FC<ProjectActBtnInt> = ({data})=> {
    const [dropList, setDropList] = useState(false);
    const {setModalFor, setModalSource, setSelectedItem, setShowModal, showModal, setCurrent_project_nav} = useChat()
    const dropdownRef = useRef<HTMLDivElement>(null);


    function handle_action(type: string){
        setDropList(false)
        if (type == 'view'){
            setShowModal(!showModal)
            setModalFor('view')
            setModalSource('project-modal')
            setSelectedItem(data)
        }
        else if (type == 'edit'){
            setShowModal(!showModal)
            setModalFor('edit')
            setModalSource('project-modal')
            setSelectedItem(data)
        }
        else if (type == 'tasks'){
            setShowModal(!showModal)
            setModalFor('create-task')
            setModalSource('project-modal')
            setSelectedItem(data)
        }
        else if (type == 'activities'){
            setShowModal(!showModal)
            setModalFor('view')
            setCurrent_project_nav('activities')
            setModalSource('project-modal')
            setSelectedItem(data)
        }
        else if (type == 'payment-history'){
            setShowModal(!showModal)
            setModalFor('view')
            setCurrent_project_nav('payment-history')
            setModalSource('project-modal')
            setSelectedItem(data)
        }
        else if (type == 'delete'){
            setShowModal(!showModal)
            setModalFor('delete')
            setModalSource('project-modal')
            setSelectedItem(data)
        }
    }

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropList(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className=" w-full relative flex item-center justify-end " ref={dropdownRef}>
            <button className="h-[30px] mx-auto px-5 bg-blue-500 hover:bg-blue-600 text-white rounded-[3px] text-sm " onClick={()=> setDropList(!dropList)}>action</button>

            {dropList && <div className="absolute right-0 top-[35px] z-10 bg-white w-[175px] h-auto rounded-[3px] shadow-md border border-slate-100 p-[10px] flex flex-col items-start gap-3 ">
                <p className="projct-action-list" onClick={()=> handle_action('view')} >View</p>
                <p className="projct-action-list" onClick={()=> handle_action('edit')} >Edit</p>
                <p className="projct-action-list" onClick={()=> handle_action('tasks')} >Add Tasks</p>
                <p className="projct-action-list" onClick={()=> handle_action('activities')} >Activities / Timeline</p>
                <p className="projct-action-list" onClick={()=> handle_action('payment-history')} >Payment History</p>
                <p className="projct-action-list" onClick={()=> handle_action('delete')} >Delete</p>
            </div>}
        </div>
    )
}