import { SetStateAction } from 'react'
import { UserData } from '../types'

export const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  userData: UserData[] | null,
  setShowUserData: (value: React.SetStateAction<UserData[]>) => void
) => {
  /**
  フォーム送信時のユーザー検索処理
  入力された名前・電話番号・住所・支払い情報で userData をフィルタリングして setShowUserData に反映。
  */
  event.preventDefault()

  /* 各インプット要素を取得 */
  const form = event.currentTarget
  const nameInput = form.elements.namedItem('name') as HTMLInputElement
  const phoneInput = form.elements.namedItem('phone') as HTMLInputElement
  const addressInput = form.elements.namedItem('address') as HTMLInputElement
  const paymentInput = form.elements.namedItem('payment') as HTMLInputElement

  /* 各入力値取得 */
  const nameValue = nameInput.value
  const phoneValue = phoneInput.value
  const addressValue = addressInput?.value
  const paymentValue = paymentInput?.value

  // ユーザーデータが存在する場合フィルタリング
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

/*
 フォームの入力変更時に、状態を更新する。
 数値と文字列の型に応じて適切な setState を使い分ける。
 */
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

/*
 入力値の正規表現チェック。
 - 正しい形式 → エラー解除
 - 空文字 → 入力エラーなし・フォームエラーあり
 - 不正な形式 → 入力エラーあり・フォームエラーあり
 */
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
