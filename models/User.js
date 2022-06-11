import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    maxlength: [40, 'Username max length must be at least 40 characters']
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required']
  },
  level: {
    type: String,
    required: [true, 'Level is required'],
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
})

userSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
    delete returnObject.passwordHash
  }
})

export default models.User || model('User', userSchema)
