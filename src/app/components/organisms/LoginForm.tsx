'use client'
import TextField from '../atoms/TextField';
import { login } from '@/app/api/login';
import { useActionState, useState } from 'react';

const LoginForm = () => {
    const [state,formActions] = useActionState(login,{errorMessage: ''});
    const [isValid, setIsValid] = useState(true);
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
            maxlength={20}
            name='email'
            type='email'
            required={true}
            placeholder='sample@example.com'
            setIsValid={setIsValid}
        />
        <TextField
            label='パスワード'
            maxlength={20}
            name='password'
            type='password'
            required={true}
            setIsValid={setIsValid}
        />
        <button disabled={!isValid} className={`w-full mt-3 bg-blue-500 text-white rounded px-4 py-2 ${isValid ? 'opacity-100 cursor-pointer' : 'cursor-not-allowed bg-gray-400'}`} type="submit">ログイン</button>
    </form>
  )
}

export default LoginForm
