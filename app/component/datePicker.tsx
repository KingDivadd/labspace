'use client'
import { SelectDateProps } from '@/types';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyDatePicker = ({clickedDate, setClickedDate}: SelectDateProps) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
    if (clickedDate !== ''){
        setDate(new Date(clickedDate));
    }
    }, [clickedDate])

    const onChange = (newDate:any) => {
        setDate(newDate);
        setClickedDate(formatDate(newDate))
    };

    function formatDate(dateString:string) {
        const date = new Date(dateString);
        const options:any = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase();
        return formattedDate;
    }
        
    return (
        <div className=" h-full ">
            <Calendar
                value={date}
                onChange={onChange}
                // calendarType="US" 
                className={'custom-calendar h-full '}
            />
        </div>
    );
};

export default MyDatePicker;
