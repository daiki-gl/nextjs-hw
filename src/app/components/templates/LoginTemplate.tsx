'use client'
import useNotBrowserBack from '@/app/common/hooks/useNotBrowserBack';
import LoginForm from '../organisms/LoginForm'

const LoginTemplate = () => {
  useNotBrowserBack('/login');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">ログイン</h1>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginTemplate