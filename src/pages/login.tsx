import Link from "next/link"
import Router from "next/router"
import { parseCookies, setCookie } from "nookies"
import { Eye, EyeSlash } from "phosphor-react"
import React, { useState } from "react"
import { ErrorLogin } from "../components/ErrorLogin"
import api from "../services/api"

function Login() {

    const [name, setUser] = useState('') 
    const [password, setPassword] = useState('') 
    const [showPassword, setShowPassword] = useState('password') 
    const [errorLogin, seTerrorLogin] = useState('') 

    const login = async (e) => {
        e.preventDefault()
        if(password.length < 3 || password.length > 18){
            return seTerrorLogin('Senha precisa ter entre 3 a 18 caracteres')
        }
        if(name.length < 3 || name.length > 18){
            return seTerrorLogin('Name precisa ter entre 3 a 18 caracteres')
        }
        
        try{
            const user = await api.post('login', {name, password})
            setCookie(undefined, 'auth.token', user.data._id, {
                maxAge: 60 * 60 * 24 // 24 hours
            })

            Router.push('/room')
        }catch(err){
            seTerrorLogin('Usesrname ou Senha incorretos.')
        }
    }

    return (
        <div className={`w-screen h-screen bg-[url(../assets/bg.png)] flex items-center justify-center`}>
            <div className="bg-blue-600 w-screen h-screen opacity-60 absolute top-0 left-0 z-30"></div>
            <div className="w-96 bg-white opacity-1 z-50 absolute p-5 rounded-lg shadow-md shadow-slate-600">
                    <h1 className="text-center text-3xl mb-7 mt-2">Welcome chatgram</h1>
                    {
                        errorLogin && <ErrorLogin mensagem={errorLogin}/>
                    }
                    <form className="flex flex-col" onSubmit={(e) => login(e)}>
                        <input 
                            type="text" 
                            placeholder="Username or @" 
                            className="placeholder:text-slate-700 bg-blue-200 rounded-md px-3 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <div className="w-full relative">
                            <input 
                                type={showPassword}
                                name="" 
                                id="" 
                                placeholder="Password"
                                className="placeholder:text-slate-700 w-full bg-blue-200 rounded-md select-none px-3 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"    
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            
                            {
                                (showPassword === 'password') ? (
                                    <Eye 
                                        size={24} 
                                        className="absolute top-[10px] right-2 cursor-pointer"
                                        onClick={() => {
                                            if(showPassword === 'password'){
                                                setShowPassword("text")
                                            }else{
                                                setShowPassword("password")
                                            }
                                        }}
                                    />
                                ) : (
                                    <EyeSlash 
                                        size={24} 
                                        className="absolute top-[10px] right-2 cursor-pointer"
                                        onClick={() => {
                                            if(showPassword === 'password'){
                                                setShowPassword("text")
                                            }else{
                                                setShowPassword("password")
                                            }
                                        }}
                                    />
                                )
                            }
                            
                        </div>
                        <button 
                            type="submit"
                            className="bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Sing in
                        </button>
                    </form> 
                    <div className="absolute text-center text-white -bottom-20 left-0 rounded-lg w-full py-4 bg-[rgba(0,0,0,0.7)]">
                        <p className="">Não tem uma conta? <Link href="/signup"><span className="text-blue-400 underline cursor-pointer hover:text-blue-300 transition-colors">Crie aqui!</span></Link></p>
                    </div>
            </div>
        </div>
    )
}

export default Login

export const getServerSideProps = async (ctx) => {
    const { ['auth.token']: token } = parseCookies(ctx)

    if(token){
        return {
            redirect: {
                destination: '/room'
            }
        }
    }

    return {
        props: {}
    }
}