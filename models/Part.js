import { Schema, model, models } from 'mongoose'

const partSchema = new Schema(
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
    materiales: [{ type: Schema.Types.ObjectId, ref: 'Material' }]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

partSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
  }
})

export default models.Part || model('Part', partSchema)
