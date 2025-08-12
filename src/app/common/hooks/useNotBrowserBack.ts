// import { useCallback, useEffect } from 'react'

// const useNotBrowserBack = () => {
//   const blockBrowserBack = useCallback(() => {
//     window.history.go(1)
//   }, [])

//   useEffect(() => {
//     // 直前の履歴に現在のページを追加
//     window.history.pushState(null, '', window.location.pathname)

//     // 直前の履歴と現在のページのループ
//     window.addEventListener('popstate', blockBrowserBack)

//     // クリーンアップは忘れない
//     return () => {
//       window.removeEventListener('popstate', blockBrowserBack)
//     }
//   }, [blockBrowserBack])

//   return blockBrowserBack
// }

// export default useNotBrowserBack

'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const useNotBrowserBack = (redirectTo: string) => {
  const router = useRouter()

  useEffect(() => {
    const block = () => {
      router.replace(redirectTo)
    }

    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', block)

    return () => {
      window.removeEventListener('popstate', block)
    }
  }, [router, redirectTo])
}

export default useNotBrowserBack
