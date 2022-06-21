import { Schema, model, models } from 'mongoose'
const uniqueValidator = require('mongoose-unique-validator')

const productSchema = new Schema(
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
    piezas: [
      {
        nombre: { type: String, ref: 'Pieza' },
        cantidad: { type: Number },
        minStock: { type: Number }
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

productSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
  }
})

productSchema.plugin(uniqueValidator)

export default models.Product || model('Product', productSchema)
