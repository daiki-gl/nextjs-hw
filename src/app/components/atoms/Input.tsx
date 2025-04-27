import { handleErrCheck, handleInputChange } from "@/app/common/utils/formAction";
import { SetStateAction } from "react";


export default function Input({children,inputData:{name, type, placeholder}, setInput, inputValue,errs, regex, min = 0, max = 9999999999, validation}
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
    validation: () => void
    }) {
    return (
        <>
        <div className="mt-10 basis-1/2 flex-1/2">
            <label className="inline-block w-30" htmlFor={name}>{children}</label>
            <input className="outline-1 mr-14 w-48" value={inputValue} onChange={(e) => handleInputChange(e, setInput)} min={min} max={max} type={type} id={name} name={name} placeholder={placeholder} onBlur={() => {
                handleErrCheck(regex,String(inputValue),errs.setInputErr,errs.setIsFormErr)
                validation();
                }} />
            <div>
                <label className="mr-[104px]"></label>
                {errs.inputErr && <span className="text-red-600 text-sm inline-block mt-3 ml-3">{errs.errMsg}</span> }
            </div>
        </div>
        </>
    )
}