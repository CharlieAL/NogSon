import { dbConnection } from 'utils/db'
import User from 'models/User'

dbConnection()

export default async function handler(req, res) {
  const { method, body } = req
  if (method === 'POST') {
    const { name, password } = body
    if (!name || !password) {
      return res.status(400).json({ error: 'name and password are required' })
    }
    const user = await User.findOne({ name })

    const passwordCorrect =
      user === null ? false : password === user.passwordHash

    if (!passwordCorrect) {
      return res.status(401).json({
        error: 'Incorrect username or password'
      })
    } else {
      res.status(200).json({
        user: {
          name: user.name,
          level: user.level
        }
      })
    }
  }
}
