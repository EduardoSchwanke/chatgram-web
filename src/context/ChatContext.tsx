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
    const [userNow, SetUserNow] = useState<UserProps>()
    const [conversation, SetConversation] = useState()

    function getConversation(props) {
        SetConversation(props)
    }

    useEffect(() => {
        async function getUserById() {
            const user = await api.get(`/${id}`)
            SetUserNow(user.data)
        }

        getUserById()
    }, [id, conversation])

    return (
        <ChatContext.Provider value={{userNow, id, getConversation, conversation}}>
            {children}
        </ChatContext.Provider>
    )
}