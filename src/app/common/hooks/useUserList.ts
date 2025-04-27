import { useState } from 'react'
import { getUsers } from '../utils/serverActions'

/* 
  画面に表示するためのユーザーを入れるstate
  @returns users APIで取得したユーザーの配列
  @returns showUserData ここに入っているユーザーを表示
  @returns setShowUserData showUserDataを更新する際に使用する
  */
export default function useUserList() {
  const [users, setUsers] = useState([])
  /* 
  APIでユーザーを取得する関数を実行
  usersに結果を保存
   */
  async function getUsersFunction() {
    const result = await getUsers()
    setUsers(result)
  }

  return { users, setUsers, getUsersFunction }
}
