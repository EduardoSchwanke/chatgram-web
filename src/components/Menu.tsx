import Router from "next/router"
import { destroyCookie, parseCookies } from "nookies"
import { useEffect, useState } from "react"
import api from "../services/api"

interface OpenMenuProps {
    openMenu: boolean
}

export function Menu({ openMenu }: OpenMenuProps) {

    const [username, SetUsername] = useState({})
    const {['auth.token'] : id} = parseCookies()

    useEffect(() => {
        async function getUSer() {
            const user = await api.get(`/${id}`)
            SetUsername(user.data)
        }

        getUSer()
        
    }, [])

    console.log(username)

    return (
        <div className={`w-1/4 h-screen flex flex-col justify-between bg-white absolute top-0 z-20 ${!openMenu ? '-left-1/4' : 'left-0'}`}>
            <div className="w-full flex flex-col items-center mt-12">
                <div className="w-40 h-40 rounded-full bg-slate-400 mb-2"></div>
                <p className="text-2xl"></p>
                <p className="text-sm text-slate-700">@</p>
            </div>
            <div 
                className='px-5 py-6 cursor-pointer hover:bg-zinc-100'
                onClick={() => {
                    destroyCookie(undefined, 'auth.token')
                    Router.push('/')
                }}    
            >
                Sair
            </div>
        </div>
    )
}