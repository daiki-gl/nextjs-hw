import { useState } from 'react'
import { getUsers } from '../utils/serverActions'

export default function useUserList() {
  /* APIで取得したユーザーを入れる */
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
