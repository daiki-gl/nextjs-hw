'use server'

export async function getUsers() {
  const res = await fetch(
    'https://gist.githubusercontent.com/daiki-gl/4fcf6cb5f0080ed487b254f4fd6eec35/raw/96d41ce03ab312c3289874e8cb62777288f4a5df/user.json',
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
