export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.freeapi.app/api/v1/public/randomjokes")

    if (!response.ok) {
      return res.status(response.status).json({ error: "API failed" })
    }

    const data = await response.json()

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: "Server error" })
  }
}