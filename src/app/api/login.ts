// app/api/login.ts (Server Action - 最終版)
'use server'
import { redirect } from 'next/navigation'
import path from 'path'
import { promises as fs } from 'fs'
import { cookies } from 'next/headers'

export interface LoginResponse {
  errorMessage?: string
}

interface ReturnDataItem {
  success: boolean
  data?: {
    userId: number
    username: string
    token: string
    expiresIn: string
    roles: string[]
  }
}

type returnData = ReturnDataItem[]

export async function login() {
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
  const data: returnData = JSON.parse(fileContents) // JSONコンテンツをパース

  if (!data[0].success) {
    return {
      errorMessage: 'メールアドレスまたはパスワードが正しくありません。',
    } as LoginResponse
  }

  const { token, expiresIn } = data[0].data || {}

  if (!token || !expiresIn) {
    return {
      errorMessage: '認証情報が不足しています。',
    } as LoginResponse
  }

  // ログイン成功: クッキーを設定
  const cookieStore = await cookies()

  // expiresInはJSONで文字列なので数値に変換
  const maxAgeSeconds = parseInt(expiresIn, 10)

  cookieStore.set('token', token, {
    httpOnly: true, // JavaScriptからアクセス不可
    secure: process.env.NODE_ENV === 'production', // HTTPSでのみ送信
    maxAge: isNaN(maxAgeSeconds) ? 3600 : maxAgeSeconds, // expiresInを数値に変換して使用、無効な場合はデフォルト3600秒
    path: '/',
    sameSite: 'lax',
  })

  redirect('/') // ログイン成功後のリダイレクト

  // formData から値を取得し、string に変換してトリムする
  // const email = ((formData.get('email') as string) || '').trim()
  // const password = ((formData.get('password') as string) || '').trim()

  // // data配列の中から、emailとpasswordフィールドが存在し、かつ入力値に合致するユーザーを探す
  // const foundUser = data.find((user: UserData) => {
  //   // user.email と user.password が存在し、かつ入力値と一致するかをチェック
  //   return (
  //     user.email &&
  //     user.password &&
  //     user.email === email &&
  //     user.password === password
  //   )
  // })

  // if (!foundUser) {
  //   return {
  //     errorMessage: 'メールアドレスまたはパスワードが正しくありません。',
  //   } as LoginResponse
  // } else {
  //   redirect('/')
  // }
}
