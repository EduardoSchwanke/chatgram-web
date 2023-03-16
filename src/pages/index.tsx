import { parseCookies } from 'nookies'

function Home() {
    return <>home</>
}

export default Home

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
        redirect: {
            destination: '/room'
        }
    }
}