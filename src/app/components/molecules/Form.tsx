'use client'
import { SetStateAction, useEffect, useState } from "react";
import { UserData } from "../../common/types";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { handleSubmit } from "@/app/common/utils/formAction";

export default function Form({userData, setShowUserData, onOpen}: {
    userData: UserData[] | null, 
    showUserData: UserData[] | null,
    setShowUserData: React.Dispatch<SetStateAction<UserData[]>>,
    onOpen: () => void,
}) {

    const [inputName,setInputName] = useState("");
    const [nameErr, setNameErr] = useState<boolean>(false);

    const [inputPhoneNum,setInputPhoneNum] = useState("");
    const [phoneNumErr, setPhoneNumErr] = useState<boolean>(false);

    const [inputAdr,setInputAdr] = useState("");
    const [adrErr, setAdrErr] = useState<boolean>(false);

    const regexName = /^[Ａ-Ｚａ-ｚあ-んァ-ヶ一-龠]{2,40}$/
    const regexPhoneNum = /^\d{3,15}$/;
    const regexAdr = /^\d{3,9}$/;

    const [isErr, setIsErr] = useState(true)
    
   useEffect(() => {
    if (inputName !== "") {
        setNameErr(!inputName.match(regexName));
        setIsErr(!inputName.match(regexName))
    }
},[inputName])

useEffect(() => {
    if(inputPhoneNum !== "") {
        setPhoneNumErr(!inputPhoneNum.match(regexPhoneNum))
        setIsErr(!inputPhoneNum.match(regexPhoneNum))
    }
},[inputPhoneNum])

useEffect(() => {
    if(inputAdr !== "") {
        setAdrErr(!inputAdr.match(regexAdr));
        setIsErr(!inputAdr.match(regexAdr))
    }
   },[inputAdr])

    return (
        <div className="mx-auto w-3/5">
            <form onSubmit={(event)=> handleSubmit(event,userData,setShowUserData)} className="flex justify-between flex-wrap" action='/search' method="get">
                <Input name={'name'} type={'text'} placeholder={'名前入力欄'} errMsg={'2文字以上、40文字以下の全角英数字で入力してください。'} inputValue={inputName} setInput={setInputName} err={nameErr}>名前</Input>

                <Input name={'phone'} type={'text'} placeholder={'電話番号入力欄'} errMsg={'3桁以上、15桁以下の半角数字で入力してください。'} inputValue={inputPhoneNum} setInput={setInputPhoneNum} err={phoneNumErr}>電話番号</Input>
                <Input name={'address'} type={'text'} placeholder={'郵便番号入力欄'} errMsg={'3桁以上、9桁以下の半角数字で入力してください。'} inputValue={inputAdr} setInput={setInputAdr} err={adrErr}>郵便番号</Input>

                <div className="mt-10 flex-1/2">
                    <Button text="help" noDeco={true} onClick={(event) => {
                            event.preventDefault()
                            onOpen()
                        }} />
                    <Button text="検索" outline={true} disabled={isErr} />
                </div>
            </form>
        </div>
    )
}