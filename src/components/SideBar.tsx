import { List, MagnifyingGlass, X } from "phosphor-react";
import {  useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import api from "../services/api";
import { Menu } from "./Menu";


export function SideBar() {

    const [menuOpen, setMenuOpen] = useState(false)
    const { id, conversations } = useContext(ChatContext)

    return (
        <div className="w-1/4 h-screen flex flex-col bg-white">
            <div className="flex gap-5 px-6 py-4 items-center relative">
                {
                    !menuOpen ? (
                        <List 
                            size={26} 
                            color="#3d3d3d" 
                            className="cursor-pointer z-40" 
                            onClick={() => setMenuOpen(!menuOpen)}
                        />
                    ) : (
                        <X 
                            size={26} 
                            color="#3d3d3d" 
                            className={`cursor-pointer z-40 absolute ${(menuOpen === true) ? 'right-4' : 'left-5'} transition-all`} 
                            onClick={() => setMenuOpen(!menuOpen)}
                        />
                    )
                }

                <div className="relative">
                    <input 
                        type="text" 
                        name="" 
                        id="" 
                        className="w-full bg-slate-100 rounded-full pl-10 py-1 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white"
                        placeholder="Search"
                    />
                    <MagnifyingGlass size={18} color="#3d3d3d" className="absolute top-[7px] left-3"/>
                </div>
            </div>
  
            <Menu openMenu={menuOpen}/>

            <div>
                {
                    conversations?.map((item, index) => {
                        return (
                            <div 
                                key={index}
                                className="flex justify-between px-4 py-5 cursor-pointer hover:bg-slate-100 transition-colors"   
                            >
                                <div className="flex gap-3">
                                    <div className="bg-slate-300 w-11 h-11 rounded-full bg-[url('/imgDefault.png')] bg-no-repeat bg-cover"></div>
                                    <div className="flex flex-col items-start">
                                        <p className="font-bold font-sans">
                                            {
                                                (id !== item.userOne[0]) ? item.userOne[1] : item.userTwo[1]
                                            }
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {
                                                item.chatRoom[item.chatRoom.length-1][1]
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-3">
                                    <p className="text-xs text-slate-500">19:43</p>
                                    <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center text-white text-ms">!</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}