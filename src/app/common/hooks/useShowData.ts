import { useState } from 'react'
import { UserData } from '../types'

export default function useShowData() {
  /* 
  画面に表示するためのユーザーを入れるstate
  @returns showUserData ここに入っているユーザーを表示
  @returns setShowUserData showUserDataを更新する際に使用する
  */
  const [showUserData, setShowUserData] = useState<UserData[]>([])

  return {
    showUserData,
    setShowUserData,
  }
}
