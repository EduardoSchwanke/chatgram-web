import { PaperPlaneTilt } from "phosphor-react"
import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../context/ChatContext"
import api from "../services/api"

interface ConversationProps {
    map(arg0: (item: any, index: any) => JSX.Element): import("react").ReactNode;
    UserTwo: string
    chatRoom: []
    userOne: string
}

export function BoxMessage() {

    const { conversation, userNow, id } = useContext(ChatContext)
    const [message, setMessage] = useState('')
    const [two, setTwo] = useState('')

    useEffect(() => {
        async function getConversations() {
            const user = await api.post(`/chatConversation`, {one: id})
            if(user?.data[0].userOne === id){
                setTwo(user?.data[0].UserTwo)
            }else{
                setTwo(user?.data[0].userOne)
            }
        }

        getConversations()
    }, [])

    return (
        <div className={`w-3/4 h-screen bg-[url(../assets/bg.png)] relative`}>
            <div className="bg-blue-600 h-screen opacity-60">
            </div>
            <div className="absolute top-0 w-full h-full">
                {
                    conversation?.map((item, index) => {
                        return (
                            <div key={index} className={`flex w-full ${(userNow?._id !== item[0]) ? 'justify-start' : 'justify-end'}`}>
                                <div className={`w-fit px-2 py-1 rounded-lg m-2 ${(userNow?._id !== item[0]) ? 'bg-white' : 'bg-[#78E378]'}`}>{item[1]}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={`absolute bottom-4 w-[calc(100%-72px)] mx-9 ${conversation ? 'flex' : 'hidden'}`}>
                <form 
                    className={`absolute bottom-4 w-[calc(100%-72px)] mx-9 ${conversation ? 'flex' : 'hidden'}`}
                    onSubmit={async (e) => {
                        e.preventDefault()
                        await api.post('/chat', {
                            "one":id,
                            "two":two,
                            "chatRoom":[id, message]
                        })
                    }}    
                >
                    <input 
                        type="text" 
                        name="" 
                        id="" 
                        className="w-full bg-slate-100 rounded-full px-6 py-2 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white"
                        placeholder=""
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }}
                    />
                    <PaperPlaneTilt size={22} weight="fill" color="#0652cb" className="absolute top-[9px] right-3"/>
                </form>
            </div>
        </div>
    )
}