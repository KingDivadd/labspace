'use client'
import React, {useState, useEffect} from 'react'
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";
import { useChat } from '../context/ChatContext';


interface Drop_down_1_Prop {
    selected_item: string;
    setSelected_item: (selected_item: string) => void;
    dropArray: string[];
    setDropArray: (dropArray: string[]) => void;
    showAlert: (message: string, type: string) => void;
}

const Drop_down_1 = ({dropArray, setDropArray, selected_item, setSelected_item, showAlert}: Drop_down_1_Prop) => {
    const [drop_menu, setDrop_menu] = useState(false)
    const [drop_input, setDrop_input] = useState({search_input: '', list_add_input: ''})
    const [dropArrayClone, setDropArrayClone] = useState<string[]>([])

    useEffect(() => {
        setDropArrayClone(dropArray)
    }, [dropArray])

    function handle_drop_menu() {
        setDrop_menu(!drop_menu)
    }

    function handle_list_add() {
        const lowerCaseInput = drop_input.list_add_input.toLowerCase();
        if (dropArray.some((item) => item.toLowerCase() === lowerCaseInput)) {
            showAlert(`${drop_input.list_add_input} already exist in the dropdown`, 'warning')
        } else {
            setDropArray([...dropArray, drop_input.list_add_input]);
            setDrop_input({ ...drop_input, list_add_input: '' });
        }
    }

    function handle_select_drop_down(data:string) {
        setSelected_item(data)
        setDrop_menu(!drop_menu)
        
    }

    function handle_filter(e: any) {
        const value = e.target.value.toLowerCase();
        if (!value) {
            setDropArrayClone(dropArray);
        } else {
            const new_array = dropArray.filter((data) => data.toLowerCase().includes(value));
            setDropArrayClone(new_array);
            console.log(new_array);
        }
    }

    return (
        <div className='w-full relative z-[5]'>
            {/* the top or showing part where it will be clicked */}
            <span className="h-[45px] w-full border border-slate-400 rounded-[3px] px-[15px] flex items-center justify-between" onClick={handle_drop_menu} >
                <p className="text-sm "> {selected_item || 'Select'} </p>

                <span className="h-[20px] w-[20px] flex items-center justify-center text-slate-700">
                    {drop_menu ? <FaCaretUp size={'100%'} /> : <FaCaretDown size={'100%'} /> }
                </span>
            </span>

            {/* the dropdown box */}
            {drop_menu && 
            <div className="w-full bg-white min-h-[200px] border border-slate-400 absolute top-[50px] left-0 flex flex-col items-start justify-start p-[10px] rounded-[3px] gap-[10px]">
                    <span className="w-full "> <input type="text" placeholder='search' onChange={handle_filter} className="input-type-2" /> </span>

                <div className="w-full flex flex-col items-start gap-[5px] h-[150px] overflow-y-auto  ">
                    <div className="w-full flex flex-col gap-[]">

                        {
                            dropArrayClone.map((data, ind)=>{
                                return(
                                    <span key={ind} className="drop_down_menu_box_1" onClick={()=>handle_select_drop_down(data)} >
                                        <p className="text-sm">{data}</p>
                                        <span className="h-[20px] w-[20px] flex items-center justify-center text-blue-600">
                                            {selected_item == data &&  <IoCheckmark size={'100%'} /> }
                                        </span>

                                    </span>
                                )
                            })
                        }
                    </div>
                </div>

                <span className="h-[35px] w-full flex items-center gap-5">
                    <span className="flex-1 "> 
                        <input type="text" name='list_add_input' value={drop_input.list_add_input} onChange={(e:any)=> setDrop_input({...drop_input, list_add_input: e.target.value})}  placeholder='add item' className="input-type-2" /> 
                    </span>
                    <button className="h-[35px] rounded-[3px] px-5 bg-blue-600 hover:bg-blue-700 text-white" onClick={handle_list_add}>Add</button>
                </span>

            </div>}

        </div>
    )
}

export default Drop_down_1