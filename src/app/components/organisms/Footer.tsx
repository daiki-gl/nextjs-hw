import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-center py-4 h-[56px]">
       <Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mr-5">
            ログイン
          </Link>
          <Link href="/logout" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
            ログアウト
          </Link>
</footer>
  )
}

export default Footer