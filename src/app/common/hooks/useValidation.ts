import { useState } from 'react'

export const useValidation = () => {
  /* フォーム、各インプット要素のエラーのstate */
  const [nameErr, setNameErr] = useState<boolean>(false)
  const [phoneNumErr, setPhoneNumErr] = useState<boolean>(false)
  const [adrErr, setAdrErr] = useState<boolean>(false)
  const [paymentErr, setPaymentErr] = useState<boolean>(false)
  const [isFormErr, setIsFormErr] = useState(true)

  /* 
  バリデーションチェック用の関数
  @param inputVal チェック対象のフォームの入力値
  @pram regex チェック用の正規表現
  @param min, max 最小値、最大値
  @returns バリデーションチェックの結果 true/false
  */
  const checkVal = (
    inputVal: string | number,
    regex: RegExp,
    min: number = 0,
    max: number = 40
  ) => {
    if (typeof inputVal === 'string') {
      return (
        !(inputVal === '' || min > inputVal.length || max < inputVal.length) &&
        regex.test(inputVal)
      )
    } else {
      return inputVal > 0 && inputVal <= 999999999
    }
  }

  return {
    checkVal,
    nameErr,
    setNameErr,
    phoneNumErr,
    setPhoneNumErr,
    adrErr,
    setAdrErr,
    isFormErr,
    setIsFormErr,
    paymentErr,
    setPaymentErr,
  }
}
