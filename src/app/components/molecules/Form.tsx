import { SetStateAction } from "react";
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
    return (
        <div className="mx-auto w-3/5">
            <form onSubmit={(event)=> handleSubmit(event,userData,setShowUserData)} className="flex justify-between flex-wrap" action='/search' method="get">
                <Input name={'name'} type={'text'} placeholder={'名前入力欄'} >名前</Input>
                <Input name={'phone'} type={'text'} placeholder={'電話番号入力欄'} >電話番号</Input>
                <Input name={'address'} type={'text'} placeholder={'郵便番号入力欄'} >郵便番号</Input>
                <div className="mt-10 flex-1/2">
                    <Button text="help" noDeco={true} onClick={(event) => {
                            event.preventDefault()
                            onOpen()
                        }} />
                    <Button text="検索" outline={true} />
                </div>
            </form>
        </div>
    )
}