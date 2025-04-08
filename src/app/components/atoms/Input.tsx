import { handleErrCheck, handleInputChange } from "@/app/common/utils/formAction";
import { SetStateAction } from "react";


export default function Input({children,inputData:{name, type, placeholder}, setInput, inputValue,errs, regex, min = 0, max = 9999999999}
    :{
    inputData: {
        name:string, 
        type: string, 
        placeholder: string, 
    }
    children: React.ReactNode, 
    setInput:React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<number>>,
    inputValue: string | number,
    errs: {
        inputErr: boolean
        setInputErr: React.Dispatch<SetStateAction<boolean>>,
        setIsFormErr: React.Dispatch<SetStateAction<boolean>>,
        errMsg:string, 
    },
    regex:RegExp,
    min?: number,
    max?: number,
    }) {
    return (
        <div className="mt-10 flex-1/2">
            <label className="inline-block mr-7 w-20" htmlFor={name}>{children}</label>
            <input className="outline-1 mr-20 w-48" value={inputValue} onChange={(e) => handleInputChange(e, setInput)} min={min} max={max} type={type} id={name} name={name} placeholder={placeholder} onBlur={() => handleErrCheck(regex,String(inputValue),errs.setInputErr,errs.setIsFormErr)} />
           {errs.inputErr && <span className="text-red-600 text-sm block mt-3">{errs.errMsg}</span> }
        </div>
    )
}