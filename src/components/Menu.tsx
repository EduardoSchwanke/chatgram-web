import Router from "next/router"
import { destroyCookie, parseCookies } from "nookies"
import { CaretDown, CaretUp } from "phosphor-react"
import { useEffect, useState } from "react"
import api from "../services/api"

interface OpenMenuProps {
    openMenu: boolean
}

interface UserProps {
    password: string,
    userUniqueName: string,
    username: string,
    __v: number,
    _id: string
}


export function Menu({ openMenu }: OpenMenuProps) {

    const [userNow, SetUserNow] = useState<UserProps>()
    const {['auth.token'] : id} = parseCookies()
    
    const [editUSer, setEditUser] = useState(false)
    const [deleteUSer, setDeleteUser] = useState(false)
    const [deletar, setDeletar] = useState('')

    const [username, setUser] = useState('') 
    const [userUniqueName, setUserUniqueName] = useState('') 
    const [password, setPassword] = useState('') 

    useEffect(() => {

        async function getUSer() {
            const user = await api.get(`/${id}`)
            SetUserNow(user.data)
            setUser(user.data.username)
            setUserUniqueName(user.data.userUniqueName)
            setPassword(user.data.password)
        }

        getUSer()
       
    }, [])

    async function deleteSubmit(e) {
        e.preventDefault()

        if(deletar !== 'Deletar'){
            alert('você escreveu "Deletar" errado.')
        }

        await api.delete(`/${id}`)
        destroyCookie(undefined, 'auth.token')
        Router.push('/')
    }

    async function updateSubmit(e) {
        e.preventDefault()
        if(password.length < 3 || password.length > 18){
            return alert('error')
        }
        if(username.length < 3 || username.length > 18){
            return alert('error')
        }
        if(userUniqueName.length < 3 || userUniqueName.length > 18){
            return alert('error')
        }
        alert('Usruario atualizado com sucesso!')
        await api.put(`/${id}`, { username, userUniqueName, password })
    }

    return (
        <div className={`w-1/4 h-screen flex flex-col justify-between bg-white absolute top-0 z-20 ${!openMenu ? '-left-1/4' : 'left-0'} overflow-y-auto`}>
            <div className="w-full flex flex-col items-center mt-12">
                <div className="w-40 h-40 rounded-full bg-[url('/imgDefault.png')] bg-no-repeat bg-cover mb-2"></div>
                <p className="text-2xl">{userNow?.username}</p>
                <p className="text-sm text-slate-700">@{userNow?.userUniqueName}</p>

                <div className='w-full mt-5 cursor-pointer hover:bg-zinc-100 text-left'>
                    <div 
                        className="flex mx-3 px-5 py-4 justify-between"
                        onClick={() => setEditUser(!editUSer)}
                    >
                        <p>Editar Usuário</p>

                        {
                            !editUSer ? <CaretDown size={22} /> : <CaretUp size={22} />
                        }
                        
                    </div>
                    <div className={`w-full h-full bg-white py-3 ${!editUSer ? 'hidden' : 'flex'}`}>
                        <form className="w-full h-full flex flex-col items-center" onSubmit={(e) => updateSubmit(e)}>
                            <input 
                                type="text" 
                                placeholder="Username" 
                                defaultValue={userNow?.username} 
                                className="placeholder:text-slate-700 w-3/5 bg-blue-200 rounded-md px-3 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                                onChange={(e) => setUser(e.target.value)}
                            />

                            <div className="w-3/5 relative flex items-center justify-center">
                                <input 
                                    type="text" 
                                    placeholder="Arroba" 
                                    defaultValue={userNow?.userUniqueName} 
                                    className="placeholder:text-slate-700 w-full pl-6 bg-blue-200 rounded-md px-3 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                                    onChange={(e) => setUserUniqueName(e.target.value)}    
                                />
                                <p className="absolute top-2 left-2">@</p>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Password" 
                                defaultValue={userNow?.password} 
                                className="placeholder:text-slate-700 w-3/5 bg-blue-200 rounded-md px-3 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                                onChange={(e) => setPassword(e.target.value)}    
                            />
                            <button type="submit" className="bg-green-700 w-3/5 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">Atualizar</button>
                        </form>
                    </div>
                </div>

                <div className='w-full cursor-pointer hover:bg-zinc-100 text-left'>
                    <div 
                        className="flex mx-3 px-5 py-4 justify-between"
                        onClick={() => setDeleteUser(!deleteUSer)}
                    >
                        <p>Deletar Usuário</p>
                        {
                            !deleteUSer ? <CaretDown size={22} /> : <CaretUp size={22} />
                        }
                    </div>
                    <div className={`w-full h-full bg-white py-3 ${!deleteUSer ? 'hidden' : 'flex'}`}>
                        <form className="w-full flex flex-col items-center" onSubmit={(e) => deleteSubmit(e)}>
                            <p className="w-3/5 text-sm text-zinc-600 mb-2">Para deletar escreva na caixa abaixo "Deletar"</p>
                            <input 
                                type="text" 
                                placeholder="Deletar" 
                                className="placeholder:text-slate-700 w-3/5 bg-blue-200 rounded-md px-3 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                                onChange={(e) => setDeletar(e.target.value)}
                            />
                            <button type="submit" className="bg-red-700 w-3/5 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">Deletar</button>
                        </form>
                    </div>
                </div>
            </div>
            <div 
                className='px-5 py-6 cursor-pointer hover:bg-zinc-100 border-t-2'
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