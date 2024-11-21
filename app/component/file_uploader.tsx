'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { RiFileDownloadFill } from 'react-icons/ri';

interface Uploader_props {
    id: string;
    title: string;
    url: string;
    onFileUpload?: (fileUrl: string) => void;
    type?: string;

}

export const FileUploaderNew = ({ id, title, url, onFileUpload }: Uploader_props) => {
    const [filePreview, setFilePreview] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (url) {
            setFilePreview(url);
        }
    }, [url]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const previewUrl = URL.createObjectURL(selectedFile);
            setFilePreview(previewUrl);

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('upload_preset', 'crm_images');

            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/iroegbu-cloud-1/upload', formData);
                const uploadedFileUrl = response.data.secure_url;

                // Invoke the callback to send the URL back to the parent component
                if (onFileUpload) {
                    onFileUpload(uploadedFileUrl);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            setFilePreview('');
            setFile(null);
            alert('Please select a valid file.');
        }
    };

    const renderPreview = () => {

        
        if (!filePreview) return null; // Return null if there's no file preview
        
        const fileType = file?.type;
    
        if (fileType?.startsWith('image/')) {
            return (
                <span className="relative w-full h-[340px] rounded-[3px] overflow-hidden">
                    <Image
                        src={filePreview}
                        alt="File Preview"
                        layout="fill"
                        objectFit="cover"
                    />
                </span>
            );
        } else if (fileType === 'application/pdf') {
            return (
                <iframe
                    src={filePreview}
                    title="PDF Preview"
                    className="w-full h-[340px] rounded-[3px]"
                />
            );
        } else if (fileType === 'application/acad' || fileType === 'application/dwg') {
            return (
                <div className="w-full h-full flex justify-center items-center h-[340px] rounded-[3px] ">
                    <p className="text-gray-500">DWG File Uploaded</p>
                </div>
            );
        } else {
            return (
                <div className="w-full h-full flex justify-center items-center h-[340px] rounded-[3px] ">
                    <p className="text-gray-500">File Uploaded</p>
                </div>
            );
        }
    };
    

    return (
        <div className="w-full flex flex-col justify-start items-start gap-2 h-full">
            <span className="w-full flex flex-col items-start justify-start ">
                <input 
                    type="file" 
                    name={`file-${id}`} 
                    accept="image/*,application/pdf,application/acad,application/dwg" 
                    onChange={handleFileChange}
                    id={`fileInput-${id}`}
                    style={{ display: 'none' }}
                />
                <button 
                    type="button" 
                    className="w-full h-[50px] rounded-[3px] text-sm flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700" 
                    onClick={() => document.getElementById(`fileInput-${id}`)?.click()}
                >
                    Select File
                </button>
            </span>
            {filePreview ? renderPreview() : <div className="w-full h-[340px]  "></div> }
        </div>
    );
};

export const FileUploader = ({ id, title, url, onFileUpload, type }: Uploader_props) => {
    const [filePreview, setFilePreview] = useState('');
    const [isImage, setIsImage] = useState(false);
    
        useEffect(() => {
        if (url) {
            // Determine if the passed URL is an image
            const fileType = url.split('.').pop()?.toLowerCase();
            if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(fileType || '')) {
            setIsImage(true);
            } else {
            setIsImage(false);
            }
            setFilePreview(url);
        }
        }, [url]);
    
        const handleFileChange = async (e: any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileType = selectedFile.type;
    
            if (fileType.startsWith('image/')) {
            setIsImage(true);
            const previewUrl = URL.createObjectURL(selectedFile);
            setFilePreview(previewUrl);
            } else if (fileType === 'application/pdf') {
            setIsImage(false);
            setFilePreview(URL.createObjectURL(selectedFile));
            } else {
            setIsImage(false);
            setFilePreview('');
            alert('Unsupported file type. Please select an image or PDF.');
            return;
            }
    
            // Upload the file to Cloudinary
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('upload_preset', 'crm_images'); // Replace with your Cloudinary upload preset
    
            try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/iroegbu-cloud-1/image/upload', formData);
            const fileUrl = response.data.secure_url;
    
            // Invoke the callback to send the URL back to the parent component
            if (onFileUpload) {
                const nam = type || ''
                onFileUpload(fileUrl);
            }
            } catch (error) {
            console.error('Error uploading file:', error);
            }
        } else {
            setFilePreview('');
        }
        };
    
        return (
        <div className="w-full flex flex-col justify-start items-start gap-[15px]">
            <span className="w-full flex flex-col items-start justify-start gap-[15px]">
                <h4 className="text-sm text-slate-200 ">{title}</h4>
                <input 
                    type="file" 
                    name={`file-${id}`} 
                    accept="image/*,application/pdf" // Accept both images and PDFs
                    onChange={handleFileChange}
                    id={`fileInput-${id}`}
                    style={{ display: 'none' }} // Hide the default file input
                />
                <button 
                    type="button" 
                    className="image-custom-button" 
                    onClick={() => document.getElementById(`fileInput-${id}`)?.click()}
                >
                    Select File
                </button>
            </span>
    
            {filePreview && (
            isImage ? (
                <span className="relative w-full flex jusitify-center h-[330px] rounded-[5px] overflow-hidden">
                <Image 
                    src={filePreview} 
                    alt="Image Preview" 
                    layout="fill" 
                    objectFit="cover" 
                />
                </span>
            ) : (
                <span className="w-full mx-auto flex flex-col items-center justify-start gap-[10px]">
                    <embed
                        src={filePreview}
                        type="application/pdf"
                        width="100%"
                        height="330px"
                    />
                    {/* <a href={filePreview} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-[10px] w-full text-white hover:text-blue-600 cursor-pointer hover:underline text-[15px] ">
                        <RiFileDownloadFill size={19} /> Download File
                    </a> */}
                </span>
            )
            )}
        </div>
        );
};

// interface UploaderProps {
//     id: string;
//     title: string;
//     url: string;
//     onFileUpload: (url: string) => void;
//     type?: string;
//   }

export const ImgUploader = ({ id, title, url, onFileUpload, type }: Uploader_props) => {
    const [filePreview, setFilePreview] = useState<string>('');
    const [isImage, setIsImage] = useState<boolean>(false);

    useEffect(() => {
        if (url) {
            const fileType = url.split('.').pop()?.toLowerCase();
            if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(fileType || '')) {
            setIsImage(true);
            } else {
            setIsImage(false);
            }
            setFilePreview(url);
        }
    }, [url]);

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
    const fileType = selectedFile.type;

    if (fileType.startsWith('image/')) {
        setIsImage(true);
        const previewUrl = URL.createObjectURL(selectedFile);
        setFilePreview(previewUrl);
    } else {
        alert('Unsupported file type. Please select an image.');
        return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'crm_images'); // Replace with your Cloudinary upload preset

    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/iroegbu-cloud-1/image/upload', formData);
        const fileUrl = response.data.secure_url;

        // Invoke the callback to send the URL back to the parent component
        if (onFileUpload) {
        onFileUpload(fileUrl);
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
    }
};

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-[15px]">
            <h4 className="text-sm text-slate-200">{title}</h4>

            <div
                className="relative w-full h-full rounded-full overflow-hidden cursor-pointer flex justify-center items-center border border-gray-300"
                onClick={() => document.getElementById(`fileInput-${id}`)?.click()}
                style={{ backgroundColor: '#f0f0f0' }} // Optional: You can replace this with a default background color or image.
            >
                {filePreview ? (
                <Image
                    src={filePreview}
                    alt="Profile Picture"
                    layout="fill"
                    objectFit="cover"
                />
                ) : (
                <Image
                    src="/default-profile.png" // Path to your default profile image
                    alt="Default Profile"
                    layout="fill"
                    objectFit="cover"
                />
                )}
            </div>

            <input
                type="file"
                id={`fileInput-${id}`}
                accept="image/*" // Accept only image files
                style={{ display: 'none' }} // Hide the input
                onChange={handleFileChange}
            />
        </div>
    );
};  