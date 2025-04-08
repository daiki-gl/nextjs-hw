import { useState } from 'react'

export const useValidation = () => {
  const [nameErr, setNameErr] = useState<boolean>(false)
  const [phoneNumErr, setPhoneNumErr] = useState<boolean>(false)
  const [adrErr, setAdrErr] = useState<boolean>(false)
  const [paymentErr, setPaymentErr] = useState<boolean>(false)
  const [isFormErr, setIsFormErr] = useState(true)

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
