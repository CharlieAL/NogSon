import { Schema, model, models } from 'mongoose'

const materialSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
      maxlength: [40, 'Username max length must be at least 40 characters']
    },
    precio: {
      type: String
    },
    descripcion: {
      type: String,
      trim: true
    },
    cantidad: {
      type: Number
    },
    minStock: {
      type: Number,
      default: 10
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

materialSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
  }
})

export default models.Material || model('Material', materialSchema)
