'use server'
import { redirect } from 'next/navigation'
import path from 'path'
import { promises as fs } from 'fs'
import { cookies } from 'next/headers'

export interface LoginResponse {
  errorMessage?: string
}

interface UserData {
  id: number
  name: string
  phone: string
  address: string
  status: boolean
  payment: string
  email?: string
  password?: string
}

export async function login(login: LoginResponse, formData: FormData) {
  try {
    // publicディレクトリ内のJSONファイルの絶対パスを取得
    const filePath = path.join(
      process.cwd(),
      'public',
      'api',
      'stub',
      'IF0001.json'
    )

    // ファイルを読み込む
    const fileContents = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContents)

    const email = ((formData.get('email') as string) || '').trim()
    const password = ((formData.get('password') as string) || '').trim()

    const foundUser = data.find((user: UserData) => {
      // user.email と user.password が存在し、かつ入力値と一致するかをチェック
      return (
        user.email &&
        user.password &&
        user.email === email &&
        user.password === password
      )
    })

    if (!foundUser) {
      throw new Error('パスワードかメールアドレスが正しくありません。')
    }

    const cookieStore = await cookies()
    cookieStore.set('auth_token', 'token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    })

    redirect('/')
  } catch (error) {
    let errorMessage = 'パスワードかメールアドレスが正しくありません。'

    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    }

    return {
      errorMessage: errorMessage,
    } as LoginResponse
  }
}
