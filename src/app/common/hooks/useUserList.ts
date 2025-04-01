import { useState } from 'react'
import { getUsers } from '../utils/serverActions'

export default function useUserList() {
  const [users, setUsers] = useState([])

  async function getUsersFunction() {
    const result = await getUsers()
    setUsers(result)
  }

  return { users, setUsers, getUsersFunction }
}
