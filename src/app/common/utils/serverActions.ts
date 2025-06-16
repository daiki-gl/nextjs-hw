'use server'

/* ユーザーデータを取得するAPI */
export async function getUsers() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  // IF0001.jsonから値取得
  const res = await fetch(`${BASE_URL}/api/stub/IF0001.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  const data = (await res).json()
  return data
}
