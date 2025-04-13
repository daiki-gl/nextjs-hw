import { useState } from 'react'
import { UserData } from '../types'

/* 
  画面に表示するためのユーザーを入れるstate
  @returns showUserData ここに入っているユーザーを表示
  @returns setShowUserData showUserDataを更新する際に使用する
  */
export default function useShowData() {
  const [showUserData, setShowUserData] = useState<UserData[]>([])

  return {
    showUserData,
    setShowUserData,
  }
}
