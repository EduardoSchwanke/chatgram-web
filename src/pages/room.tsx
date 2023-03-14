import { parseCookies } from "nookies"
import { useContext } from "react"
import { BoxMessage } from "../components/BoxMessage"
import { SideBar } from "../components/SideBar"
import { ChatContext } from "../context/ChatContext"

function Room() {

    const { conversation } = useContext(ChatContext)

    return (
        <div className="flex"> 
            <SideBar/>
            <div className={`flex w-full h-screen bg-[url(../assets/bg.png)] relative`}>
                <div className="bg-[rgba(56,67,228,.6)] w-full h-screen">
                {
                    (conversation !== undefined) && <BoxMessage /> 
                }
                </div>
                
            </div>
        </div>
    )
}

export default Room

export const getServerSideProps = async (ctx) => {
    const { ['auth.token']: token } = parseCookies(ctx)

    if(!token){
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}