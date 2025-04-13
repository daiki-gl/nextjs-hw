'use client'
import { SetStateAction, useEffect, useState } from "react";
import { UserData } from "../../common/types";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { handleSubmit } from "@/app/common/utils/formAction";
import { regexAdr, regexName, regexPayment, regexPhoneNum } from "@/app/common/utils/regex";
import { useValidation } from "@/app/common/hooks/useValidation";

export default function Form({userData, setShowUserData, onOpen}: {
    userData: UserData[] | null, 
    showUserData: UserData[] | null,
    setShowUserData: React.Dispatch<SetStateAction<UserData[]>>,
    onOpen: () => void,
}) {
    const [inputName,setInputName] = useState("");
    const [inputPhoneNum,setInputPhoneNum] = useState("");
    const [inputAdr,setInputAdr] = useState("");
    const [inputPayment, setInputPayment] = useState(0);
    const {checkVal,isFormErr,setIsFormErr, nameErr,setNameErr,phoneNumErr,setPhoneNumErr,adrErr,setAdrErr,paymentErr,setPaymentErr} = useValidation();

    const [type, setType] = useState<string | null>(null);
    useEffect(() => {
        const storedType = sessionStorage.getItem("searchType");
        setType(storedType);
    }, []);

    useEffect(() => {
        const nameValid = checkVal(inputName, regexName, 2, 40);
        const phoneValid = checkVal(inputPhoneNum, regexPhoneNum, 1, 15);
        const adrValid = checkVal(inputAdr, regexAdr, 1, 9);
        const paymentValid = checkVal(inputPayment, regexPayment, 1, 9);
      
        if (type === "list") {
          setIsFormErr(!(nameValid && phoneValid && adrValid));
        } else {
          setIsFormErr(!(nameValid && phoneValid && paymentValid));
        }
      }, [inputName, inputPhoneNum, inputAdr, inputPayment, type]);

    return (
        <div className="mx-auto w-3/5">
            <form 
            onSubmit={(event)=> handleSubmit(event,userData,setShowUserData)} 
            className="flex justify-between flex-wrap" action='/search' method="get">
                <Input 
                    inputData={{name:'name',type:'text',placeholder:'名前入力欄'}}
                    inputValue={inputName} 
                    setInput={setInputName} 
                    errs={{inputErr:nameErr,setInputErr: setNameErr,setIsFormErr: setIsFormErr,errMsg:'2文字以上、40文字以下の全角英数字で入力してください。'}}
                    regex={regexName}
                >名前</Input>
                <Input 
                    inputData={{name:'phone',type:'text',placeholder:'電話番号入力欄',}}
                    inputValue={inputPhoneNum} 
                    setInput={setInputPhoneNum} 
                    errs={{inputErr: phoneNumErr,setInputErr: setPhoneNumErr,setIsFormErr: setIsFormErr,errMsg:'3桁以上、15桁以下の半角数字で入力してください。'}}
                    regex={regexPhoneNum}
                 >電話番号</Input>
                 {type === "list" ? (
                     <Input 
                         inputData={{name:'address',type:'text',placeholder:'郵便番号入力欄'}}
                         inputValue={inputAdr} 
                         setInput={setInputAdr} 
                         errs={{inputErr: adrErr,setInputErr: setAdrErr,setIsFormErr: setIsFormErr,errMsg:'1桁以上、9桁以下の半角数字で入力してください。'}} 
                         regex={regexAdr}
                     >郵便番号</Input>
                 ) : (
                    <Input
                        inputData={{name:'payment', type:'number', placeholder: '金額入力欄'}}
                        inputValue={inputPayment}
                        setInput={setInputPayment}
                        errs={{inputErr: paymentErr,setInputErr: setPaymentErr,setIsFormErr: setIsFormErr,errMsg:'0以上、999999999以下の半角数字で入力してください。'}}
                        regex={/^[0-9]{1,9}$/}
                    >支払い金額</Input>
                 )}

                <div className="mt-10 flex-1/2">
                    <Button text="help" noDeco={true} onClick={(event) => {
                            event.preventDefault()
                            onOpen()
                        }} />
                    <Button type={"submit"} text="検索" outline={true} disabled={isFormErr} />
                </div>
            </form>
        </div>
    )
}

// validationの修正