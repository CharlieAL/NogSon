import { Schema, model, models } from 'mongoose'

const minStockSchema = new Schema(
  {
    productos: {
      type: Number,
      default: 10
    },
    piezas: {
      type: Number,
      default: 10
    },
    materiales: {
      type: Number,
      default: 10
    }
  },
  {
    versionKey: false
  }
)

minStockSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
  }
})

export default models.MinStock || model('MinStock', minStockSchema)
