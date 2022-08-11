import { Schema, model, models } from 'mongoose'

const materialSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    nombreOrg: {
      type: String,
      required: true
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
    proveedor: {
      type: String,
      ref: 'Proveedor'
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
