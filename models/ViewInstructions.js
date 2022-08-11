import { Schema, model, models } from 'mongoose'

const ViewInstructionsSchema = new Schema(
  {
    nombre: {
      type: String
    },
    imageURL: {
      type: String
    },
    descripcion: {
      type: String
    },
    piezas: [
      {
        nombre: {
          type: String
        },
        cantidad: {
          type: Number
        },
        imageURL: {
          type: String
        },
        descripcion: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

ViewInstructionsSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
  }
})

export default models.ViewInstructions ||
  model('ViewInstructions', ViewInstructionsSchema)
