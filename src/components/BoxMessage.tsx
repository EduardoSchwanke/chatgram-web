import { PaperPlaneTilt } from "phosphor-react"
import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"

export function BoxMessage() {

    const { conversation, userNow } = useContext(ChatContext)

    return (
        <div className={`w-3/4 h-screen bg-[url(../assets/bg.png)] relative`}>
            <div className="bg-blue-600 h-screen opacity-60">
            </div>
            <div className="absolute top-0 w-full h-full">
                {
                    conversation?.map((item, index) => {
                        console.log(userNow?.userUniqueName, item[0])
                        return (
                            <div key={index} className={`flex w-full ${(userNow?.userUniqueName != item[0]) ? 'justify-start' : 'justify-end'}`}>
                                <div className={`w-fit px-2 py-1 rounded-lg m-2 bg-white`}>{item[1]}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={`absolute bottom-4 w-[calc(100%-72px)] mx-9 ${conversation ? 'flex' : 'hidden'}`}>
                <input 
                    type="text" 
                    name="" 
                    id="" 
                    className="w-full bg-slate-100 rounded-full px-6 py-2 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white"
                    placeholder=""
                />
                <PaperPlaneTilt size={22} weight="fill" color="#0652cb" className="absolute top-[9px] right-3"/>
            </div>
        </div>
    )
}