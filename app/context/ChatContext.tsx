'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';


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
    user_role: string; 
    setUser_role: (user_role: string) => void; 
    
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
    

    return (
        <ChatContext.Provider value={{
            header_nav, setHeader_nav, 
            pricing_plan, setPricing_plan,
            route_nav, setRoute_nav,
            close_welcome_nav, setClose_welcome_nav,
            user_role, setUser_role,
            trigger_notification, setTrigger_notification
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
