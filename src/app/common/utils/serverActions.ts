'use server'

/* ユーザーデータを取得するAPI */
export async function getUsers() {
  // const URL = process.env.NEXT_PUBLIC_API_URL

  // IF0001.jsonから値取得
  const res = await fetch(`http://localhost:3000/api/stub/IF0001.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  const data = (await res).json()
  return data

  // const res =
  //   URL &&
  //   (await fetch(URL, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //   }))
  // if (res) {
  //   const data = await res.json()
  //   return data
  // }
  // return
}
