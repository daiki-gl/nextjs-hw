'use client'
import Link from 'next/link'
import { useCallback, useEffect } from 'react'

const Page = () => {

const blockBrowserBack = useCallback(() => {
    window.history.go(1)
}, [])

useEffect(() => {
    // 直前の履歴に現在のページを追加
    window.history.pushState(null, '', '/logout')

    // 直前の履歴と現在のページのループ
    window.addEventListener('popstate', blockBrowserBack)

    // クリーンアップは忘れない
    return () => {
        window.removeEventListener('popstate', blockBrowserBack)
    }
}, [blockBrowserBack])

  return (
    <div className='h-screen flex flex-col justify-center items-center -mb-[56px]'>
    <p className='text-center py-4'>ログアウトしました。</p>
    <Link href="/login" className="text-gray-800 hover:text-gray-800 dark:hover:text-gray-200 block text-center mb-10">
      ログイン画面へ
    </Link>
    </div>
  )
}

export default Page