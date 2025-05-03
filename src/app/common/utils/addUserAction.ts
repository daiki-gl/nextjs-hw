import { UserData } from '../types'
/**
 * setAddUserDataを更新する関数
 * @param userData 追加、削除するユーザーデータ
 * @param checked チェックがついているか確認するためのboolean
 * @param setAddUserData addUserDataを更新する関数
 */

export function handleSetAddUserData(
  userData: UserData,
  checked: boolean,
  setAddUserData: React.Dispatch<React.SetStateAction<UserData[]>>
) {
  setAddUserData((prev) => {
    if (checked) {
      return [...prev, userData]
    } else {
      return prev.filter((user) => user.id !== userData.id)
    }
  })
}

export function handleSetAddUserDataAll(
  checked: boolean,
  setAddUserData: React.Dispatch<React.SetStateAction<UserData[]>>,
  showUserData: UserData[]
) {
  if (checked) {
    setAddUserData(showUserData)
  } else {
    setAddUserData([])
  }
}
