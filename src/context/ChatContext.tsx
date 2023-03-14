import { parseCookies } from "nookies";
import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const ChatContext = createContext(null)

interface UserProps {
    password: string,
    userUniqueName: string,
    username: string,
    __v: number,
    _id: string
}

export function ChatContextProvider({ children }) {

    const {['auth.token'] : id} = parseCookies()
    const [userNow, SetUserNow] = useState()
    const [conversations, setConversations] = useState<UserProps | undefined>()

    useEffect(() => {
        async function getUserById() {
            const user = await api.get(`/${id}`)
            SetUserNow(user.data)
        }

        getUserById()
    }, [id])

    useEffect(() => {
        async function getConversations() {
            const conversations = await api.post('/chatConversationAll', {userOne:[id, userNow?.userUniqueName]})
            setConversations(conversations.data)
        }

        getConversations()
    }, [userNow])
    
    return (
        <ChatContext.Provider value={{id, userNow, conversations}}>
            {children}
        </ChatContext.Provider>
    ) 
}