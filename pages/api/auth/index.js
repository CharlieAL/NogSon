import User from 'models/User'
import { dbConnection } from 'utils/db'

dbConnection()

export default async function handler(req, res) {
  const { method, body } = req
  if (method === 'POST') {
    try {
      const user = body
      console.log(user)
      const newUser = await User.create(user)
      newUser.save()
      res.status(200).json(newUser)
    } catch (error) {
      res.status(400).json({ error: 'Error al crear el usuario' })
    }
  } else if (method === 'GET') {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (error) {
      res
        .status(400)
        .json({ error: 'Error al obtener los usuarios', error2: error })
    }
  } else {
    res.status(400).json({ error: 'Method not allowed' })
  }
}
