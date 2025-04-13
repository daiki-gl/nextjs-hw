'use server'

/* ユーザーデータを取得するAPI */
export async function getUsers() {
  const URL = process.env.NEXT_PUBLIC_API_URL

  const res =
    URL &&
    (await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }))
  if (res) {
    const data = await res.json()
    return data
  }
  return
}
