import { Schema, model, models } from 'mongoose'

const proveedorSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
      maxlength: [40, 'Username max length must be at least 40 characters']
    },
    direccion: {
      type: String
    },
    telefono: {
      type: Number,
      trim: true
    },
    mail: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

proveedorSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
  }
})

export default models.Proveedor || model('Proveedor', proveedorSchema)
