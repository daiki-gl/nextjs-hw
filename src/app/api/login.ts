// app/api/login.ts (Server Action - 最終版)
'use server'
import { redirect } from 'next/navigation'
import path from 'path'
import { promises as fs } from 'fs'

export interface LoginResponse {
  errorMessage?: string
}

interface UserData {
  id: number
  email?: string
  password?: string
}

export async function login(prevState: LoginResponse, formData: FormData) {
  // publicディレクトリ内のJSONファイルの絶対パスを取得
  const filePath = path.join(
    process.cwd(),
    'public',
    'api',
    'stub',
    'IF0002.json' // 使用するJSONファイル名を確認
  )

  // ファイルを読み込む
  const fileContents = await fs.readFile(filePath, 'utf8')
  const data: UserData[] = JSON.parse(fileContents) // JSONコンテンツをパース

  // formData から値を取得し、string に変換してトリムする
  const email = ((formData.get('email') as string) || '').trim()
  const password = ((formData.get('password') as string) || '').trim()

  // data配列の中から、emailとpasswordフィールドが存在し、かつ入力値に合致するユーザーを探す
  const foundUser = data.find((user: UserData) => {
    // user.email と user.password が存在し、かつ入力値と一致するかをチェック
    return (
      user.email &&
      user.password &&
      user.email === email &&
      user.password === password
    )
  })

  // デバッグログ
  console.log('Found User:', foundUser ? 'User found!' : 'User NOT found.')

  if (!foundUser) {
    return {
      errorMessage: 'メールアドレスまたはパスワードが正しくありません。',
    } as LoginResponse
  } else {
    redirect('/')
  }
}
