'use client'
import TextField from '../atoms/TextField';
import { login } from '@/app/api/login';
import { useActionState } from 'react';

const LoginForm = () => {
    const [state,formActions] = useActionState(login,{errorMessage: ''});
  return (
    <form action={formActions}>
        {state.errorMessage && (
            <div className="rounded px-4 py-2 ring-1 ring-red-500 mb-3">
                <p className="text-sm font-normal text-red-500">
                    {state.errorMessage}
                </p>
            </div>
        )}
        <TextField
            label='メールアドレス'
            description='50文字以内で入力して下さい。'
            maxlength={50}
            name='email'
            type='email'
            required={true}
            placeholder='sample@example.com'
        />
        <TextField
            label='パスワード'
            description='50文字以内で入力してください'
            name='password'
            type='password'
            required={true}
        />
        <button className='w-full mt-3 bg-blue-500 text-white rounded px-4 py-2 cursor-pointer' type="submit">ログイン</button>
    </form>
  )
}

export default LoginForm