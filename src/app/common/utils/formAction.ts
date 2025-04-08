import { SetStateAction } from 'react'
import { UserData } from '../types'

export const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  userData: UserData[] | null,
  setShowUserData: (value: React.SetStateAction<UserData[]>) => void
) => {
  event.preventDefault()
  const form = event.currentTarget
  const nameInput = form.elements.namedItem('name') as HTMLInputElement
  const phoneInput = form.elements.namedItem('phone') as HTMLInputElement
  const addressInput = form.elements.namedItem('address') as HTMLInputElement
  const paymentInput = form.elements.namedItem('payment') as HTMLInputElement
  const nameValue = nameInput.value
  const phoneValue = phoneInput.value
  const addressValue = addressInput?.value
  const paymentValue = paymentInput?.value

  if (userData) {
    const filteredData = userData.filter((user: UserData) => {
      const nameMatch = user.name.includes(nameValue)
      const phoneMatch = user.phone.includes(phoneValue)
      if (addressValue) {
        const addressMatch = user.address.includes(addressValue)
        return nameMatch && phoneMatch && addressMatch
      }
      if (paymentValue) {
        const paymentMatch = user.payment === Number(paymentValue)
        return nameMatch && phoneMatch && paymentMatch
      }
    })
    setShowUserData(filteredData)
    return
  }
}

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setInput:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<number>>
) => {
  if (typeof e.target.value === 'string') {
    ;(setInput as React.Dispatch<React.SetStateAction<string>>)(e.target.value)
  }
  if (typeof e.target.value === 'number') {
    ;(setInput as React.Dispatch<React.SetStateAction<number>>)(e.target.value)
  }
}

export const handleErrCheck = (
  regex: RegExp,
  inputData: string,
  setInputErr: React.Dispatch<SetStateAction<boolean>>,
  setIsFormErr: React.Dispatch<SetStateAction<boolean>>
) => {
  if (inputData.match(regex)) {
    setInputErr(false)
  } else if (inputData === '') {
    setInputErr(false)
    setIsFormErr(true)
  } else {
    setInputErr(true)
    setIsFormErr(true)
  }
}
