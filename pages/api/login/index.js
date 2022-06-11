import { dbConnection } from 'utils/db'
import User from 'models/User'
import Cors from 'cors'

const cors = Cors({
  methods: ['POST', 'HEAD']
})

dbConnection()

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
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
      res.status(401).json({
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
