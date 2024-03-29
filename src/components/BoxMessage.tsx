import { PaperPlaneTilt } from "phosphor-react"

export function BoxMessage() {

    return (
        <div className="">
            <div className="absolute top-0 w-full h-full">
                
            </div>
            <div className={`absolute bottom-4 w-[calc(100%-72px)] mx-9`}>
                <form 
                    className={`absolute bottom-4 w-[calc(100%-72px)] mx-9 `}   
                >
                    <input 
                        type="text" 
                        name="" 
                        id="" 
                        className="w-full bg-slate-100 rounded-full px-6 py-2 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white"
                        placeholder=""
                    />
                    <PaperPlaneTilt size={22} weight="fill" color="#0652cb" className="absolute top-[9px] right-3"/>
                </form>
            </div>
        </div>
    )
}