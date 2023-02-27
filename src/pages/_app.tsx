import '../styles/global.css'
import { ChatContextProvider } from '../context/ChatContext'

export default function MyApp({ Component, pageProps }) {
  return (
    <ChatContextProvider>
      <Component {...pageProps} />
    </ChatContextProvider>
  )
}