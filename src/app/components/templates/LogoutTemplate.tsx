'use client'
import useNotBrowserBack from "@/app/common/hooks/useNotBrowserBack"
import Link from "next/link"

const LogoutTemplate = () => {
useNotBrowserBack('/logout');

  return (
    <div className='h-screen flex flex-col justify-center items-center -mb-[56px]'>
    <p className='text-center py-4'>ログアウトしました。</p>
    <Link href="/login" className="text-gray-800 hover:text-gray-800 dark:hover:text-gray-200 block text-center mb-10">
      ログイン画面へ
    </Link>
    </div>
  )
}

export default LogoutTemplate