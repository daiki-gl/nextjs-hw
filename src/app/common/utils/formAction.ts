import React, { SetStateAction } from 'react'
import { UserData } from '../types'
import { getUsers } from './serverActions'

/*
 Formのsubmitに関わる関数が格納されている
 @param event formのevent
 @param userData APIで取得したユーザー情報一覧
 @param setShowUserData 表示用のユーザーをsetする関数
*/
const startIndex = 0 // 1ページ目の開始インデックス
const endIndex = startIndex + 10 // 1ページ目の終了インデックスs

export const handleSubmit = async (
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
  const form = event.currentTarget

  const users = await getUsers().then((data) => {
    return data
  })

  /* 各インプット要素を取得 */
  // const form = event.currentTarget
  const nameInput = form.elements.namedItem('name') as HTMLInputElement
  const phoneInput = form.elements.namedItem('phone') as HTMLInputElement
  const addressInput = form.elements.namedItem('address') as HTMLInputElement
  const paymentFromInput = form.elements.namedItem(
    'payment-from'
  ) as HTMLInputElement
  const paymentToInput = form.elements.namedItem(
    'payment-to'
  ) as HTMLInputElement

  /* 各入力値取得 */
  const nameValue = nameInput.value
  const phoneValue = phoneInput.value
  const addressValue = addressInput?.value
  const paymentFromValue = paymentFromInput?.value
  const paymentToValue = paymentToInput?.value

  // ユーザーデータが存在する場合フィルタリング
  if (userData) {
    // const filteredData = userData.filter((user: UserData) => {
    //   const filters = [
    //     { value: nameValue, match: user.name.includes(nameValue) },
    //     { value: phoneValue, match: user.phone.includes(phoneValue) },
    //     { value: addressValue, match: user.address.includes(addressValue) },
    //     {
    //       value: paymentFromValue,
    //       match: user.payment.includes(paymentFromValue),
    //     },
    //     {
    //       value: paymentToInput,
    //       match: user.payment.includes(paymentToValue),
    //     },
    //   ]

    //   // 入力されたフィールドがすべて一致するかどうかをチェック
    //   return filters
    //     .filter((f) => f.value) // 入力された値だけを対象にする
    //     .every((f) => f.match) // すべての条件が一致するか確認
    // })

    localStorage.setItem(
      'searchValue',
      JSON.stringify({
        name: nameValue,
        phone: phoneValue,
        address: addressValue,
        paymentFrom: paymentFromValue,
        paymentTo: paymentToValue,
      })
    )

    // 1ページ目に表示するデータをセット
    setShowUserData(users.slice(startIndex, endIndex))
    // setShowUserData(filteredData.slice(startIndex, endIndex))
    setSearchResult(users)
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

export const handleSubmitted = (
  setShowUserData: (value: React.SetStateAction<UserData[]>) => void,
  setSearchResult: React.Dispatch<React.SetStateAction<UserData[]>>,
  searchResult: UserData[]
) => {
  let usersToAdd: UserData[] = []
  if (typeof window !== 'undefined') {
    const storedUsersToAdd = localStorage.getItem('usersToAdd')
    if (storedUsersToAdd) {
      try {
        usersToAdd = JSON.parse(storedUsersToAdd)
      } catch (e) {
        console.error("Failed to parse 'usersToAdd' from localStorage:", e)
        localStorage.removeItem('usersToAdd') // パースエラーの場合は削除
      }
    }
  }

  // 除外するユーザーのIDをSetに格納
  const usersToAddIds = new Set(usersToAdd.map((user) => user.id))
  const filteredUsers = searchResult.filter(
    (user) => !usersToAddIds.has(user.id)
  )
  // フォーム送信後の処理
  setShowUserData(filteredUsers.slice(startIndex, endIndex))
  setSearchResult(filteredUsers)
}
