import { parseCookies } from "nookies";
import { createContext, useEffect, useState } from "react";
import api from "../services/api";

interface UserProps {
    password: String,
    userUniqueName: String,
    username: String,
    __v: Number,
    _id: String
}

interface ConversationsProps {
    [x: string]: any;
    chatRoom: [],
    userOne: [],
    userTwo: [],
    __v: number,
    _id: string
}

 
export const ChatContext = createContext(null)

export function ChatContextProvider({ children }) {

    const {['auth.token'] : id} = parseCookies()
    const [userNow, SetUserNow] = useState<UserProps>()
    const [conversations, setConversations] = useState<ConversationsProps>()
    const [usersNames, setUsersNames] = useState([])

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

    useEffect(() => {
        conversations?.map(async (item, index) => {
            if(item.userOne[0] !== id){
                const name = await api.get(`/${item.userOne[0]}`)
                
            }else{
                const name = await api.get(`/${item.userTwo[0]}`)
                
            }
        })
    }, [conversations])

    return (
        <ChatContext.Provider value={{id, userNow, conversations, usersNames}}>
            {children}
        </ChatContext.Provider>
    ) 
}