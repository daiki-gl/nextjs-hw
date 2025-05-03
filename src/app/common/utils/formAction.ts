import React, { SetStateAction } from 'react'
import { UserData } from '../types'

/*
 Formのsubmitに関わる関数が格納されている
 @param event formのevent
 @param userData APIで取得したユーザー情報一覧
 @param setShowUserData 表示用のユーザーをsetする関数
*/
export const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  userData: UserData[] | null,
  setShowUserData: (value: React.SetStateAction<UserData[]>) => void,
  setSearchResult: React.Dispatch<React.SetStateAction<UserData[]>>
) => {
  /*
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
      const filters = [
        { value: nameValue, match: user.name.includes(nameValue) },
        { value: phoneValue, match: user.phone.includes(phoneValue) },
        { value: addressValue, match: user.address.includes(addressValue) },
        { value: paymentValue, match: user.payment.includes(paymentValue) },
      ]

      // 入力されたフィールドがすべて一致するかどうかをチェック
      return filters
        .filter((f) => f.value) // 入力された値だけを対象にする
        .every((f) => f.match) // すべての条件が一致するか確認
    })
    setShowUserData(filteredData)
    setSearchResult(filteredData)

    // テスト用ローカルJSONデータ全て表示
    // テスト用でuserDataを全て追加するとcheckが更新されないため意図的に新しいデータとして追加
    const newUserData = userData.map((user) => ({
      ...user,
      id: Math.floor(Math.random() * 1000000), // ランダムな数値IDを生成
    }))
    setShowUserData(newUserData)
    setSearchResult(newUserData)

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
  const isValid = regex.test(inputData)
  setInputErr(!isValid) // 項目個別のエラー更新

  // フォーム全体のエラーを更新（※ここでは簡易的に）
  setIsFormErr(!isValid)
}
