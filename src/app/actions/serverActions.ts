'use server'

export async function getUsers() {
  const res = await fetch(
    'https://gist.githubusercontent.com/daiki-gl/4fcf6cb5f0080ed487b254f4fd6eec35/raw/48956c1c83b6d1618e3ed65feddad5ad97b4008d/user.json',
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
