import { parseCookies } from "nookies"
import { BoxMessage } from "../components/BoxMessage"
import { SideBar } from "../components/SideBar"

function Room() {
    return (
        <div className="flex">
            <SideBar/>
            <BoxMessage />
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