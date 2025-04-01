'use client'

import { useState } from 'react'
import { UserData } from '../types'

export default function useShowData() {
  const [showUserData, setShowUserData] = useState<UserData[]>([])

  return {
    showUserData,
    setShowUserData,
  }
}
