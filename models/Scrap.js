import { Schema, model, models } from 'mongoose'

const scrapSchema = new Schema(
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
    area: {
      type: Number
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

scrapSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
  }
})

export default models.Scrap || model('Scrap', scrapSchema)
