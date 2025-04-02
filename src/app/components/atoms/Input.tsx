import { handleInputChange } from "@/app/common/utils/formAction";
import { SetStateAction } from "react";

export default function Input({name, type,children, placeholder, errMsg, setInput, inputValue, err}
    :{name:string, type: string, children: React.ReactNode, placeholder: string, errMsg:string, setInput:React.Dispatch<SetStateAction<string>>, inputValue: string | number,
    err: boolean
    }) {
    return (
        <div className="mt-10 flex-1/2">
            <label className="inline-block mr-7 w-20" htmlFor={name}>{children}</label>
            <input className="outline-1 mr-20 w-48" value={inputValue} onChange={(e) => handleInputChange(e, setInput)} type={type} id={name} name={name} placeholder={placeholder} />
           {err && <span className="text-red-600 text-sm block mt-3">{errMsg}</span> }
        </div>
    )
}