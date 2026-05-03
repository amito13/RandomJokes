const BASE_URL =
  import.meta.env.VITE_RANDOM_USERS_API_URL

export async function fetchRandomJokes() {
  const response = await fetch(BASE_URL)

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`)
  }
  const json = await response.json()

  if (!json.success || json.statusCode !== 200) {
    throw new Error(json.message || 'Failed to load jokes')
  }
  return json
}