import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const usePreventBrowserBack = () => {
  const router = useRouter()

  useEffect(() => {
    window.history.pushState(null, '', window.location.href)

    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href)

      router.replace(window.location.href)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [router])
}
