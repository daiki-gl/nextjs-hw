'use server'

export async function getUsers() {
  const res = await fetch(
    'https://gist.githubusercontent.com/daiki-gl/4fcf6cb5f0080ed487b254f4fd6eec35/raw/24a4b492b7a7e5860c5cc00dd8ee3ac3a3ac0442/user.json',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  )
  const data = await res.json()

  return data
}
