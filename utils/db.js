import { connect, connection } from 'mongoose'

const conn = {
  isConnected: false
}

export async function dbConnection () {
  if (conn.isConnected) return
  const db = await connect(process.env.MONGOOSE_URL)
  conn.isConnected = db.connections[0].readyState
  console.log(db.connection.db.databaseName)
}

connection.on('connected', () => {
  console.log('Mongo is connected')
})

connection.on('error', (err) => {
  console.log(err)
})
