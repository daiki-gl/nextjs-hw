'use client'
import { SetStateAction, useEffect, useState } from "react";
import { UserData } from "../../common/types";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { handleSubmit } from "@/app/common/utils/formAction";
import { regexAdr, regexName, regexPayment, regexPhoneNum } from "@/app/common/utils/regex";
import { useValidation } from "@/app/common/hooks/useValidation";
import { useSearchResultContext } from "@/app/components/context/SearchResultContext";
import { useIsFormErrContext } from "@/app/components/context/IsFormErrContext";


export default function Form({userData, setShowUserData, onOpen, type}: {
    userData: UserData[] | null, 
    showUserData: UserData[] | null,
    setShowUserData: React.Dispatch<SetStateAction<UserData[]>>,
    onOpen: () => void,
    type: string | null
}) {
    /*
     フォーム全体のstateを管理する関数
     useValidation バリデーションチェックで使用するカスタムhook
    */
    const [inputName,setInputName] = useState("");
    const [inputPhoneNum,setInputPhoneNum] = useState("");
    const [inputAdr,setInputAdr] = useState("");
    const [inputPaymentFrom, setInputPaymentFrom] = useState("");
    const [inputPaymentTo, setInputPaymentTo] = useState("");
    const [paymentRangeError, setPaymentRangeError] = useState(false);

    const {checkVal, nameErr,setNameErr,phoneNumErr,setPhoneNumErr,adrErr,setAdrErr,paymentToErr,paymentFromErr,setPaymentToErr,setPaymentFromErr} = useValidation();
    const {setSearchResult} = useSearchResultContext();
    const {isFormErr,setIsFormErr} = useIsFormErrContext();


    /*
     各入力値をバリデーションチェックし、
     検索タイプに応じてフォーム全体のエラー状態を更新
    */
const validateForm = (
    inputName: string,
    inputPhoneNum: string,
    inputAdr: string,
    inputPaymentFrom: string,
    inputPaymentTo: string,
    type: string | null,
    setIsFormErr: React.Dispatch<React.SetStateAction<boolean>>,
    checkVal: (inputVal: string, regex: RegExp, max: number) => boolean
  ) => {
    const nameValid = checkVal(inputName, regexName, 40);
    const phoneValid = checkVal(inputPhoneNum, regexPhoneNum, 15);
    const adrValid = checkVal(inputAdr, regexAdr, 9);
    const paymentFromValid = checkVal(inputPaymentFrom, regexPayment, 9);
    const paymentToValid = checkVal(inputPaymentTo, regexPayment, 9);
  
    if (type === "list") {
        if(inputName === "" && inputPhoneNum === "" && inputAdr === "") {
            setIsFormErr(true);
        } else if(nameValid && phoneValid && adrValid) {
            setIsFormErr(false);
        }
        else {
            setIsFormErr(true);
        }
    } else {
        if(inputName === "" && inputPhoneNum === "" && inputPaymentFrom === "" && inputPaymentTo === "") {
            setIsFormErr(true);
            setPaymentRangeError(false);
            return 
        } else if (inputPaymentFrom !== '' && inputPaymentTo !== '' && inputPaymentFrom.match(regexPayment) && inputPaymentTo.match(regexPayment) && inputPaymentFrom > inputPaymentTo) {
            setIsFormErr(true);
            setPaymentRangeError(true);
            return
        } else if(nameValid && phoneValid && paymentFromValid && paymentToValid) {
            setIsFormErr(false);
            setPaymentRangeError(false);
            return
       } else {
           setPaymentRangeError(false);
            setIsFormErr(true);
            return
        }
  }}

  useEffect(() => {
    const storedSearchValue = localStorage.getItem("searchValue");

    if(storedSearchValue) {
        const searchValue = JSON.parse(storedSearchValue);
        setInputName(searchValue.name || "");
        setInputPhoneNum(searchValue.phone || "");
        setInputAdr(searchValue.address || "");
        setInputPaymentFrom(searchValue.paymentFrom || "");
        setInputPaymentTo(searchValue.paymentTo || "");
    }
  },[])

    return (
        <div className="mx-auto w-3/5">
            <form 
            onSubmit={(event)=> handleSubmit(event,userData,setShowUserData,setSearchResult)} 
            className="flex justify-between flex-wrap" action='/search' method="get" aria-label="form">
                <Input 
                    inputData={{name:'name',type:'text',placeholder:'名前入力欄'}}
                    inputValue={inputName} 
                    setInput={setInputName} 
                    errs={{inputErr:nameErr,setInputErr: setNameErr,setIsFormErr: setIsFormErr,errMsg:'2文字以上、40文字以下の全角英数字で入力してください。'}}
                    regex={regexName}
                    validation={() => validateForm(inputName, inputPhoneNum, inputAdr, inputPaymentFrom, inputPaymentTo, type, setIsFormErr, checkVal)}
                >名前</Input>
                <Input 
                    inputData={{name:'phone',type:'text',placeholder:'電話番号入力欄',}}
                    inputValue={inputPhoneNum} 
                    setInput={setInputPhoneNum} 
                    errs={{inputErr: phoneNumErr,setInputErr: setPhoneNumErr,setIsFormErr: setIsFormErr,errMsg:'3桁以上、15桁以下の半角数字で入力してください。'}}
                    regex={regexPhoneNum}
                    validation={() => validateForm(inputName, inputPhoneNum, inputAdr, inputPaymentFrom, inputPaymentTo, type, setIsFormErr, checkVal)}
                 >電話番号</Input>
                 {/* typeで表示するフォームを変更 */}
                 {type === "list" ? (
                     <Input 
                         inputData={{name:'address',type:'text',placeholder:'郵便番号入力欄'}}
                         inputValue={inputAdr} 
                         setInput={setInputAdr} 
                         errs={{inputErr: adrErr,setInputErr: setAdrErr,setIsFormErr: setIsFormErr,errMsg:'1桁以上、9桁以下の半角数字で入力してください。'}} 
                         regex={regexAdr}
                         validation={() => validateForm(inputName, inputPhoneNum, inputAdr, inputPaymentFrom, inputPaymentTo, type, setIsFormErr, checkVal)}
                     >郵便番号</Input>
                 ) : (
                    <>
                     <div className="shrink-0 w-[785px] pt-2 -mb-3">支払い金額</div>
                    <Input
                        inputData={{name:'payment-from', type:'text', placeholder: '金額入力欄'}}
                        inputValue={inputPaymentFrom}
                        setInput={setInputPaymentFrom}
                        errs={{inputErr: paymentRangeError || paymentFromErr,setInputErr: setPaymentFromErr,setIsFormErr: setIsFormErr,errMsg: paymentRangeError
            ? 'FromはToより小さい値を入力してください。'
            : '0以上、999999999以下の半角数字で入力してください。'
        }}                  
                        regex={regexPayment}
                        validation={() => validateForm(inputName, inputPhoneNum, inputAdr, inputPaymentFrom, inputPaymentTo, type, setIsFormErr, checkVal)}
                    >From</Input>
                    <Input
                        inputData={{name:'payment-to', type:'text', placeholder: '金額入力欄'}}
                        inputValue={inputPaymentTo}
                        setInput={setInputPaymentTo}
                        errs={{inputErr: paymentToErr,setInputErr: setPaymentToErr,setIsFormErr: setIsFormErr,errMsg:'0以上、999999999以下の半角数字で入力してください。'}}
                        regex={regexPayment}
                        validation={() => validateForm(inputName, inputPhoneNum, inputAdr, inputPaymentFrom, inputPaymentTo, type, setIsFormErr, checkVal)}
                    >To</Input>
                    </>
                 )}

                <div className={`mt-10 ${type === "list" ? "flex-1/2" : "mx-auto"} `}>
                {/* helpのモーダル表示 */}
                    <Button text="help" noDeco={true} onClick={(event) => {
                            event.preventDefault()
                            onOpen()
                        }} />
                    {/* 検索ボタン */}
                    <Button type={"submit"} text="検索" outline={true} disabled={isFormErr} />
                </div>
            </form>
        </div>
    )
}