import { useState } from 'react'

export const useValidation = () => {
  /* フォーム、各インプット要素のエラーのstate */
  const [nameErr, setNameErr] = useState<boolean>(false)
  const [phoneNumErr, setPhoneNumErr] = useState<boolean>(false)
  const [adrErr, setAdrErr] = useState<boolean>(false)
  const [paymentFromErr, setPaymentFromErr] = useState<boolean>(false)
  const [paymentToErr, setPaymentToErr] = useState<boolean>(false)
  const [isFormErr, setIsFormErr] = useState(true)

  /* 
  バリデーションチェック用の関数
  @param inputVal チェック対象のフォームの入力値
  @pram regex チェック用の正規表現
  @param min, max 最小値、最大値
  @returns バリデーションチェックの結果 true/false
  */
  const checkVal = (inputVal: string, regex: RegExp, max: number = 40) => {
    if (max < inputVal.length) {
      return false
    }
    return regex.test(inputVal)
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
    paymentFromErr,
    setPaymentFromErr,
    paymentToErr,
    setPaymentToErr,
  }
}
